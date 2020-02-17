DROP TABLE IF EXISTS resetcodes;

CREATE TABLE resetcodes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    secretcode VARCHAR NOT NULL UNIQUE CHECK (secretcode != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
