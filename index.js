const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
