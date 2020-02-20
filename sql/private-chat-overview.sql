DROP TABLE IF EXISTS private_chats_overview;

CREATE TABLE private_chats_overview(
      id SERIAL PRIMARY KEY,
      chatter1_id INT REFERENCES users(id) NOT NULL,
      chatter2_id INT REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      unique (chatter1_id, chatter2_id)
    );
