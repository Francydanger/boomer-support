DROP TABLE IF EXISTS private_chats;

CREATE TABLE private_chats(
      id SERIAL PRIMARY KEY,
      chat_overview_id INT REFERENCES private_chats_overview(id) NOT NULL,
      message VARCHAR,
      sender_id INT REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
