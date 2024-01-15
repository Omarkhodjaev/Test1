CREATE DATABASE test;

\c test;

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";


CREATE TABLE files
(
    id uuid DEFAULT uuid_generate_v4 (),
    original_name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 (),
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    role VARCHAR(50) NOT NULL,
    file_id uuid NOT NULL,
    CONSTRAINT fk_file
    FOREIGN KEY
    (file_id)
    REFERENCES files
    (id),
    PRIMARY KEY
    (id)
);












