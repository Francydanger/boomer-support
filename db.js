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
