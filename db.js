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

exports.getUsersById = function(id) {
    return db
        .query(
            `SELECT first, last, email, category, id  FROM users WHERE id = $1;`,
            [id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getLastTenChatMessages = function() {
    return db
        .query(
            `SELECT chats.id, users.id as user_id, first, last, category, message, created_at FROM users JOIN chats ON users.id = chats.sender_id ORDER BY id DESC LIMIT 10;`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addChatMessages = function(sender_id, message) {
    return db.query(
        `INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING id;`,
        [sender_id, message]
    );
};

exports.getUserDataByArray = function(array) {
    return db
        .query(
            `SELECT first, last, email, category, id FROM users WHERE id = ANY($1)`,
            [array]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addChatOverviewUpsert = function(chatter1_id, chatter2_id) {
    return db.query(
        `INSERT INTO private_chats_overview(chatter1_id, chatter2_id) VALUES ($1, $2) ON CONFLICT (chatter1_id, chatter2_id) DO UPDATE SET last_updated_at = now() RETURNING id;`,
        [chatter1_id, chatter2_id]
    );
};

exports.addPrivateChatMessage = function(sender_id, message, chat_overview_id) {
    return db.query(
        `INSERT INTO private_chats (sender_id, message, chat_overview_id) VALUES ($1, $2, $3) RETURNING id;`,
        [sender_id, message, chat_overview_id]
    );
};

exports.getLastTenPrivateChatMessages = function(chat_overview_id) {
    return db
        .query(
            `SELECT sender_id, message, chat_overview_id, private_chats.id, users.id as user_id, first, last, category, chatter1_id, chatter2_id FROM users JOIN private_chats ON users.id = private_chats.sender_id
            JOIN private_chats_overview ON chat_overview_id = private_chats_overview.id WHERE chat_overview_id = $1 ORDER BY id DESC LIMIT 10;`,
            [chat_overview_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};
