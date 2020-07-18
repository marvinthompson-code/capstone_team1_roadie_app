-- DROP DATABASE IF EXISTS roadie_db;

-- CREATE DATABASE roadie_db;

-- \c roadie_db;

DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS artists;


CREATE TABLE artists
(
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    profile_pic_url VARCHAR,
    bio VARCHAR,
    pricing VARCHAR,
    genre VARCHAR,
    city VARCHAR,
    contact_info VARCHAR
);

CREATE TABLE clients
(
    id VARCHAR PRIMARY KEY,
    profile_pic_url VARCHAR,
    bio VARCHAR,
    city VARCHAR,
    contact_info VARCHAR
);

CREATE TABLE portfolio(
    id SERIAL PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    picture VARCHAR,
    video VARCHAR,
    caption VARCHAR
);

CREATE TABLE users
(
    id VARCHAR PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE
);



INSERT INTO artists (id, name, profile_pic_url, bio, pricing, genre, city, contact_info )
VALUES 
    ('1', 'Marvin', NULL, 'this is a bio', '$$$', 'METALCORE', 'New York', '8773934448'),
    ('2', 'Kevin', NULL, 'I make F', '$$$', 'METALCORE', 'New York', '8773934448');

INSERT INTO portfolio ( artist_id, picture, video, caption) 
VALUES('1', 'this is a picture', 'this is a video', 'this is a caption');