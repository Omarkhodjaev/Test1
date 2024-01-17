CREATE DATABASE test;

\c test;

create schema test;

SET search_path TO test;


select current_schema(); 

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


CREATE TABLE questions
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    variants
        TEXT
    []
);


CREATE VIEW userview AS
SELECT
  u.id,
  u.login AS name,
  u.full_name,
  u.birthdate AS birthdate,
  u.role,
  f.path AS file,
  f.size AS file_size
FROM
  users u
INNER JOIN
  files f ON u.file_id = f.id;

SELECT * FROM userview;




     


 "id": 1,
    "login": "test",
    "password": "ok",
    "full_name": "ok",
    "birthdate": "2000-10-10",
    "role": "user",
    "file": {
      "id": 1,
      "original_name": "ok",
      "path": "http://localhost:7777/file/69a5f046-2b18-48d2-952d-ef375884ab4b.png",
      "size": 10,
      "mime_type": "audio/mp3",
      "date": "2023-10-10 12:12:12"






















