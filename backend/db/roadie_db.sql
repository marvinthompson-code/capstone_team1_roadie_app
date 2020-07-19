DROP DATABASE IF EXISTS roadie_db;

CREATE DATABASE roadie_db;

\c roadie_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS lineup;
DROP TABLE IF EXISTS skills;
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
    name VARCHAR,
    profile_pic_url VARCHAR,
    bio VARCHAR,
    city VARCHAR,
    contact_info VARCHAR
);

CREATE TABLE pictures
(
    id SERIAL PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE,
    caption VARCHAR,
    url VARCHAR
);

CREATE TABLE videos
(
    id SERIAL PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE,
    caption VARCHAR,
    url VARCHAR
);


CREATE TABLE users
(
    id VARCHAR PRIMARY KEY,
    type VARCHAR
);

CREATE TABLE lineup
(
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
    id SERIAL INTEGER PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    client_name VARCHAR REFERENCES clients(name),
    venue VARCHAR,
    date DATE,
    cause_for_event VARCHAR,
    contact_info VARCHAR
);
 
CREATE TABLE skills
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE
);

INSERT INTO artists
    (id, name, profile_pic_url, bio, pricing, genre, city, contact_info )
VALUES
    ('1', 'Marvin', NULL, 'this is a bio', '$$$', 'METALCORE', 'New York', '8773934448'),
    ('2', 'Kevin', NULL, 'I make F', '$$$', 'METALCORE', 'New York', '8773934448');

INSERT INTO skills
    (name, artist_id)
VALUES
    ('Skill', '1');


INSERT INTO clients
    (id, name, profile_pic_url, bio, city, contact_info )
VALUES
    ('1', 'Henry', NULL, 'this is a bio', 'New York', '8773934448'),
    ('2', 'Ashya', NULL, 'I make F', 'New York', '8773934448');
