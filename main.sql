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







