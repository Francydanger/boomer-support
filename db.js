const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:francy_danger:francy@localhost:5432/boomers"
);

exports.addUsers = function(first, last, email, password, category) {
    return db.query(
        `INSERT INTO users(first, last, email, password, category) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [first, last, email, password, category]
    );
};

exports.getUsers = function(email) {
    return db
        .query(
            `SELECT first, last, password, id, category  FROM users WHERE email = $1;`,
            [email]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addCodesUpsert = function(email, secretcode) {
    return db.query(
        `INSERT INTO resetcodes(email, secretcode) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET secretcode = $2, created_at = now() RETURNING id`,
        [email, secretcode]
    );
};

exports.checkCode = function(email) {
    return db.query(
        `SELECT * FROM resetcodes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1;`,
        [email]
    );
};

exports.updatePassword = function(password, email) {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2;`, [
        password,
        email
    ]);
};
