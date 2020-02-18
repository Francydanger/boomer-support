DROP TABLE IF EXISTS chats;

CREATE TABLE chats(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      message VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
