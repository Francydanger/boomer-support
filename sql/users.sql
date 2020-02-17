DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK(first !=''),
    last VARCHAR NOT NULL CHECK (last != ''),
    category VARCHAR NOT NULL CHECK (category != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR NOT NULL CHECK (password != '')
);