DROP DATABASE IF EXISTS roadie_db;
CREATE DATABASE roadie_db;
\c roadie_db;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS lineup;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS bookings;
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

CREATE TABLE events
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    venue VARCHAR,
    date DATE,
    address VARCHAR,
    city VARCHAR,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE lineup
(
    id VARCHAR PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE bookings
(
    id SERIAL PRIMARY KEY,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE,
    client_id VARCHAR REFERENCES clients(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    bio VARCHAR,
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
INSERT INTO events
    (id, name, venue, date, address, city, client_id)
VALUES
    ('1', 'MVP RUN', 'Zoom', '2020-07-29', '47-10 Austell Pl', 'Long Island City', '2');

INSERT INTO bookings
    (id, artist_id, client_id, event_id, bio, contact_info)
VALUES
    ('1', '1', '2', '1', 'This is my first booking!', '6318820223');

