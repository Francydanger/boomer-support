const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080"
}); //origins to prevent csrf attacks, its a whitelist of hostes it accepts requests from, also dont forget to put heroku here when you heroku it blblabl.herokuapp.com:*

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.use(compression());
app.use(express.static("./public"));

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}
const cookieSessionMiddleware = cookieSession({
    secret: secrets.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.json());
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.post("/register", (req, res) => {
    console.log("req.body:", req.body);
    let password = req.body.password;
    bcrypt
        .hash(password)
        .then(hashedPass => {
            let first = req.body.first;
            let last = req.body.last;
            let email = req.body.email;
            let category = req.body.category;
            db.addUsers(first, last, email, hashedPass, category)
                .then(({ rows }) => {
                    console.log(rows); // rows returns:[ anonymous { id: 45 } ]
                    req.session.userId = rows[0].id;
                    req.session.email = email;
                    req.session.first = first;
                    req.session.last = last;
                    req.session.category = category;
                    console.log("req.session after addusers: ", req.session);
                    res.json(rows);
                })
                .catch(error => {
                    console.log("Error in register post: ", error);
                    res.json({ error: true });
                });
        })
        .catch(error => {
            console.log("Error in db.addusers: ", error);
            res.json({ error: true });
        });
});

app.post("/login", (req, res) => {
    db.getUsers(req.body.email)
        .then(results => {
            bcrypt
                .compare(req.body.password, results[0].password)
                .then(function(comparison) {
                    if (comparison == true) {
                        req.session.userId = results[0].id;
                        req.session.email = req.body.email;
                        req.session.first = req.body.first;
                        req.session.last = req.body.last;
                        req.session.category = req.body.category;
                        console.log("results: ", results);
                        res.json(results);
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch(error => {
                    console.log("Error in compare POST login", error);
                    res.json({ error: true });
                });
        })
        .catch(error => {
            console.log("Error in POST login", error);
            res.json({ error: true });
        });
});

app.post("/reset/start", (req, res) => {
    db.getUsers(req.body.email).then(function(data) {
        if (data.length > 0) {
            const secretCode = cryptoRandomString({
                length: 6
            });
            ses.sendEmail(
                "franziska.vesely@gmail.com",
                `Hello this is your resetcode: please enter the following code into the prepared input field: ${secretCode}, if you care to see a short video of what is the easiest way to copy  this code from this email to your browser: clicke here (links follows....) `,
                "Password Reset"
            );
            db.addCodesUpsert(req.body.email, secretCode)
                .then(function() {
                    // console.log("Data from addCodes: ", data);
                    res.json({ success: true });
                })
                .catch(error => {
                    console.log("Error in POST reset/start", error);
                    res.json({ error: true });
                });
        } else {
            res.json({ error: true });
        }
    });
});

app.post("/reset/verify", (req, res) => {
    console.log("hello verify speaking");
    console.log("Req.body in post reset verify", req.body);
    db.checkCode(req.body.email)
        .then(data => {
            // console.log("Data from reset checkcode", data);
            if (req.body.code == data.rows[0].secretcode) {
                console.log("Resetcode correct");
                let password = req.body.newpassword;
                bcrypt
                    .hash(password)
                    .then(hashedPass => {
                        console.log(
                            "Req.body shortly before passing to updatepassword: ",
                            req.body
                        );
                        db.updatePassword(hashedPass, req.body.email)
                            .then(() => {
                                // console.log("rows after hash pass etc", data);
                                res.json({ success: true });
                            })
                            .catch(error => {
                                console.log(
                                    "Error in POST reset/verify",
                                    error
                                );
                                res.json({ error: true });
                            });
                    })
                    .catch(error => {
                        console.log("Error in POST reset/verify", error);
                        res.json({ error: true });
                    });
            } else {
                console.log("No match between the codes");
                res.json({ error: true });
            }
        })
        .catch(error => {
            console.log("Error in POST reset/verify", error);
            res.json({ error: true });
        });
});

app.get("/user.json", (req, res) => {
    console.log("in get user req.body: ", req.body);
    console.log("in get user req.session.email", req.session.email);
    db.getUsers(req.session.email)
        .then(rows => {
            console.log("hello these are the rows from getusers", rows);
            res.json({
                last: rows[0].last,
                first: rows[0].first,
                id: rows[0].id,
                category: rows[0].category
            });
        })
        .catch(error => {
            console.log(
                "Error in get user, which was very likely to happen",
                error
            );
            res.json({ error: true });
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/"); //for now
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// app.get("/logout", function(req, res) {
//     req.session = null;
//     res.redirect("/login");
// });

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

////SOCKET SERVER////

let onlineUsers = {};
let socketListForPrivateChat = {};
io.on("connection", function(socket) {
    console.log(socket.request.session);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    console.log(userId);
    io.sockets.emit("LoggedInId", userId);
    console.log(
        `socket with the id ${socket.id} is now connected to the userId: ${userId}`
    );
    onlineUsers[socket.id] = userId;
    socketListForPrivateChat[userId] = socket.id;
    console.log("OnlineUsers: ", onlineUsers);
    console.log("socketListForPrivateChat: ", socketListForPrivateChat);

    socket.on("disconnect", function() {
        console.log(
            `socket with the id ${socket.id} is now disconnected with userId: ${userId} `
        );
        delete onlineUsers[socket.id];
    });
    var arrayOfOnlineUserIds = [...new Set(Object.values(onlineUsers))];
    console.log(Object.values(onlineUsers));
    console.log(arrayOfOnlineUserIds);

    db.getUserDataByArray(arrayOfOnlineUserIds).then(data => {
        console.log("Data form data usersby id in socket thingee: ", data);

        io.sockets.emit("Online Users", data);
    });

    db.getLastTenChatMessages()
        .then(data => {
            // console.log("Data from last ten chat messageas", data);
            io.sockets.emit(
                "get 10 Messages from back to front",
                data.reverse()
            );
        })
        .catch(err => console.log(err));

    socket.on("chatMessage", msg => {
        console.log("msg on the server and userId: ", msg, userId);
        db.addChatMessages(userId, msg).then(chatData => {
            console.log("chatdata", chatData);
            db.getUsersById(userId).then(data => {
                data[0].message = msg;
                data[0].user_id = userId;
                data[0].id = chatData.rows[0].id;

                console.log(
                    "Data from getuser id within socket on chatmessage",
                    data
                );
                io.sockets.emit("get one Message from back to front", data);
            });
        });
    });

    var socketIdOfChatee;
    var socketIdOfChater;
    socket.on("showPrivateChat", id => {
        console.log("INFO: ", id);
        console.log(
            "socketListForPrivateChat.id: ",
            socketListForPrivateChat[id]
        );
        socketIdOfChatee = socketListForPrivateChat[id];
        socketIdOfChater = socketListForPrivateChat[userId];
        db.addChatOverviewUpsert(userId, id)
            .then(chatId => {
                db.getUsersById(id)
                    .then(data => {
                        data[0].chatter = userId;
                        data[0].chattee = id;
                        data[0].chatId = chatId.rows[0].id;
                        db.getLastTenPrivateChatMessages(
                            chatId.rows[0].id
                        ).then(lastdata => {
                            console.log("lastdata: ", lastdata);
                            console.log("chattee data by id: ", data);
                            console.log("chatid: ", chatId);
                            io.to(socketIdOfChatee)
                                .to(socketIdOfChater)
                                .emit("showPrivateChat", data[0], lastdata);
                        });
                    })
                    .catch(err =>
                        console.log(
                            "err private overview get users by id: ",
                            err
                        )
                    );
            })
            .catch(err => console.log("err private overview upsert: ", err));

        // io.to(onlineUsers[socket.id]).emit("private message", info); //something like that later
    });

    socket.on("privateChatMessage", (msg, chatId) => {
        console.log("private message: ", msg, chatId);
        // io.sockets.emit("private message", msg);
        console.log("userId, msg, chatId: ", userId, msg, chatId);
        db.addPrivateChatMessage(userId, msg, chatId).then(() => {
            var messageInfo = [
                {
                    user_id: userId,
                    message: msg,
                    first: "testname",
                    chat_overview_id: chatId
                }
            ];
            // data[0].message = msg;
            // data[0].sender_id = userId;
            // data[0].chatId = chatId;

            console.log("socketIdOfChatee: ", socketIdOfChatee);
            console.log("socketIdOfChater: ", socketIdOfChater);
            io.to(socketIdOfChatee)
                .to(socketIdOfChater)
                .emit("add private message", messageInfo);
            // io.to(onlineUsers[socket.id]).emit("private message", info); //something like that later
        });
    });
});
