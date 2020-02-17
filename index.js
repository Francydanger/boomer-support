const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");

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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
