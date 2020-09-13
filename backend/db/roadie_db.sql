-- DROP DATABASE IF EXISTS roadie_db;
-- CREATE DATABASE roadie_db;
-- \c roadie_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients
CASCADE;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS lineup;
DROP TABLE IF EXISTS events
CASCADE;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS artists
CASCADE;
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
    title VARCHAR,
    source VARCHAR,
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
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    artist_id VARCHAR REFERENCES artists(id) ON DELETE CASCADE
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
    ('ql6WtbVGsAexmqeBWnJLksB3uSv2', 'Marvin', 'https://bloximages.chicago2.vip.townnews.com/wacotrib.com/content/tncms/assets/v3/editorial/d/7b/d7b29b15-a844-58e6-83bc-cdbe834498b5/5c2a0a5967610.image.jpg', 'this is a bio', '$$$', 'Gospel', 'New York', '1 (718) 234-5678'),
    ('9kHLaS95q4XBMnRKDR73sbj5olk1', 'Kevin', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hart-gettyimages-1062194608mod-1544461779.jpg?crop=1xw:1xh;center,top&resize=480:*', 'I am hilarious! I make this up!', '$$$', 'Comedy', 'New York', '1 (347) 393-4448'),
    ('eH9ygwiTOAUApNs9JwEATz4Ldzb2', 'Victoria', 'https://finearts.uvic.ca/music/calendar/wp-content/uploads/2019/08/B-Ferguson-sq.jpg', 'I love slaying on the flute! This is what I live and breathe for!', '$$$', 'Jazz', 'Washington', '1 (202) 587-4398'),
    ('1', 'Rihanna', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSx8QVkCNqI0rLKuH3q3C_xxuMHFSFh2kj4hw&usqp=CAU', 'Stay tuned for R9! Remember, we are #blackgirlmagic!', '$$$', 'Pop', 'Saint Michael', '1 (246) 789-1234'),
    ('2', 'Beyoncé', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_Dmxb2tBNG0Dhtisr5nlsuS4LfcAS48LGBw&usqp=CAU', '"Black Is King" is out now!', '$$$', 'R&B', 'Houston', '1 (281) 456-7890'),
    ('3', 'Ari Lennox', 'https://d.newsweek.com/en/full/1418156/who-ari-lennox.jpg?w=1600&h=1600&q=88&f=b479af524f907cbe77773e072ce27409', 'Your favorite shea butter baby!', '$$$', 'R&B', 'Washington', '1 (202) 987-6543'),
    ('4', 'Snoh Aalegra', 'https://static.billboard.com/files/media/a-Snoh-Aalegra-press-photo-2016-billboard-650-compressed.jpg', 'Just a girl from Stockholm, Sweden, loving to sing. If you are a follower of my music, I am truly honored. Thank you for your support!', '$$$', 'Soul', 'Los Angeles', '1 (213) 456-7890'),
    ('5', 'Musiq Soulchild', 'https://secureservercdn.net/198.71.233.138/f1u.a8d.myftpupload.com/wp-content/uploads/2017/09/Musiq-Soulchild-southafrica-yomzansi.jpg?time=1597864674', 'I am a singer and songwriter whose style blends R&B, funk, blues, jazz, gospel influences with hip hop. I love my craft and I love what I do. My hope is to continue to share love and prosperity through my music. Enjoy!', '$$$', 'Neo-soul', 'Philadelphia', '1 (215) 567-8901'),
    ('6', 'SG Lewis', 'https://images.squarespace-cdn.com/content/v1/5926f98b725e25f7efef5841/1569376867857-IPHBO4YDYXIBAL3ZTGK6/ke17ZwdGBToddI8pDm48kGkRYVSApdd5QYs0T7uLtNhZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIUJ5IIfNpoTUbWBPX7v6OhnwgKcRoXKN56tN7YRk2WZQKMshLAGzx4R3EDFOm1kBS/SG_Lewis_Shot_4_1308v2-1024x1024.jpg', 'I am from Reading, England though I live in LA now. I guess you can say I am pretty good at singing and songwriting, but I do love to produce music as well. Some other artists I have worked with are Bruno Mars, JP Cooper, LANY, Clairo and many more. I hope you tune into my sound and let it carry you to otherworldly places!', '$$$', 'Deep House', 'Los Angeles', '1 (213) 509-8769'),
    ('7', 'Cardi B', 'https://www.nme.com/wp-content/uploads/2019/01/Cardi-B.jpg', 'Awwww, yall really love me out here! I am so blessed and highly favored for the amount of support and love that I have been receiving. Thank you so much Bardi Gang!', '$$$', 'Hip Hop', 'Bronx, New York', '1 (718) 345-6789'),
    ('8', 'Mumford & Sons', 'https://www.frontview-magazine.be/sites/default/files/news/142304-mumford-sons-share-brand-new-song-blind-leading-the-blind-1285059.jpg', 'New single "Blind Leading The Blind" is out now!', '$$$', 'Folk/Alternative Rock', 'London', '1 (020) 456-3233'),
    ('9', 'Paramore', 'https://static.billboard.com/files/media/04-paramore-press-photo-Lindsey-Byrnes-billboard-1548-1024x677.jpg', 'Listen to After Laughter now at paramore.net/spotify and watch all the music videos from it at youtube.com/paramore!', '$$$', 'Alternative Rock', 'Franklin, TN', '1 (423) 675-9432'),
    ('10', 'Billie Eilish', 'https://i.redd.it/m72xjapcdmz41.jpg', 'New to the game and I am killing it. I thought I told yall Im the bad guy...', '$$$', 'Electropop', 'Los Angeles', '1 (213) 675-9387'),
    ('11', 'JYNX', 'https://www.therockpit.net/wp-content/uploads/2017/12/news-jynx.jpg', 'Jynx was born out of frustration with a world in which people refuse to be their true selves. Every day, they wear a mask of insincere niceness to avoid offending others. They want to be liked by everyone, but in return, are loved by no one. Jynx is not for everyone. Jynx is for the fearless, those who arent afraid to take off their masks.', '$$$', 'Metal', 'New York', '1 (718) 557-4448'),
    ('12', 'Moonfall', 'https://i0.wp.com/rockrevoltmagazine.com/wp-content/uploads/2017/12/moonfall.png?fit=980%2C652', '"Imagination" out now', '$$$', 'Rock', 'New York', '1(718) 345-9990'),
    ('13', ' MARS', 'https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-9/44626070_2184185451855046_3321093649294426112_o.jpg?_nc_cat=100&_nc_sid=174925&_nc_ohc=kbbjb2tCAWoAX_yDBhl&_nc_ht=scontent-lga3-2.xx&oh=24fc394fa4401a066a955d50d656d0fe&oe=5F80F404', 'alt-r&b/sadcore artist based in nyc #OBE', '$$$', 'Rap', 'New York', '1 (718) 345-5991'),
    ('14', 'Second Nature', 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/78926358_642134916528000_1115936273765962996_n.jpg?_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=SdXaf4ANh9YAX_Ow5eQ&oh=6770b380a2a93c64174d3f35a26ffb2f&oe=5F883BFD', 'Dark Days will be out everywhere Jan 17th on all streaming services.', '$$$', 'Metal', 'New York', '1 (718) 345-5991'),
    ('15', 'Divergence', 'https://images.squarespace-cdn.com/content/v1/5b590d2f12b13fee672f75ba/1570558077248-91PD1GWI6GNGRWYTS3QE/ke17ZwdGBToddI8pDm48kPgv0ZItuOPhOZ1JEt0uc617gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UdZuMiofIYA1YNg-cpohaGgSn53-I2sbAQSHhq9SgyQCm_c7z1K7QovUjPUprEAi5Q/LRG_DSC06223.JPG', 'Progressive Death Metal band from NYC', '$$$', 'Metal', 'New York', '1 (718) 345-5771'),
    ('16', 'Charleston Swing', 'https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-9/65205181_812850242434869_6110409122585247744_o.jpg?_nc_cat=104&_nc_sid=e3f864&_nc_ohc=Q577-d1xcUUAX-Tpl5q&_nc_oc=AQnahkKOz60UOFd9WAwSgz3BMeVck8HONDK2jMCBaTR9Z4N6fMgnOl5zQxRf_tu9aH4&_nc_ht=scontent-lga3-2.xx&oh=f352fbd51aeedbfc35f5d372613e9455&oe=5F83B3FF', 'Hello we are Charleston Swing. We are just a ragtag group of gentlemen striving to crank out smooth tunes. Follow us on Instagram! @thecharlestonswing Vox - Alex Drums - Mack Guitars - Matt Bass - Jimmy', '$$$', 'Metal', 'New York', '1 (718) 344-4771'),
    ('17', 'The Hearkening', 'https://f4.bcbits.com/img/0013833698_10.jpg', '"Lightyears Ago" out now!', '$$$', 'Metal', 'New York', '1 (718) 344-4071'),
    ('18', 'Gorillaz', 'https://happymag.tv/wp-content/uploads/2018/07/gorillaz-large.jpg', 'Season One is streaming worldwide. Follow your nearest Song Machine now!', '$$$', 'Hip hop', 'London', '1 (718) 007-4448'),
    ('19', 'Frank Ocean', 'https://dazedimg-dazedgroup.netdna-ssl.com/1600/azure/dazed-prod/1260/8/1268843.jpg', 'I got two versions. I got twoooo versions. #ISSUE1 #ALBUM3 #JULY2015 #BOYSDONTCRY', '$$$', 'R&B', 'New Orleans', '1 (718) 007-4888');


INSERT INTO skills
    (name, artist_id)
VALUES
    ('Skill', '1');

INSERT INTO clients
    (id, name, profile_pic_url, bio, city, contact_info )
VALUES
    ('AlvUvv7b4AeyKtqRUCOyPPfEnAi2', 'Henry', 'https://media.pitchfork.com/photos/5e6e1e81969cde000892958c/16:9/w_3776,h_2124,c_limit/Childish-Gambino.jpg', 'Master of Creations!', 'New York', '1 (718) 258-3962'),
    ('VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', 'Ashya', 'https://i1.wp.com/diandrareviewsitall.com/wp-content/uploads/2020/01/81728762_2866881789999304_8007239054716305408_n.jpg?resize=663%2C663&ssl=1', 'Maker of unordinary things!', 'Brooklyn', '1 (347) 917-0957'),
    ('Hg9tTgZPTDW2Pjt5T3gKQtnEZbo1', 'Thomas', 'https://i2.wp.com/shoppeblack.us/wp-content/uploads/2018/07/14732368_899909576812636_7779257940878229641_n.jpg?resize=640%2C960&ssl=1', 'Proud restaurant owner of Sazon Nunez!', 'Brooklyn', '1 (347) 750-7894'),
    ('1', 'Jay-Z', 'https://www.biography.com/.image/t_share/MTU0MTU0MTcyMTU2MDI4MzE1/jay-z-attends-2017-roc-nation-pre-grammy-brunch-at-owlwood-estate-on-february-11-2017-in-los-angeles-california-photo-by-ari-perilsteingetty-images-for-roc-nation-500.jpg', 'Hov Nation! Step into The 40/40 Club with style and grace!', 'Brooklyn', '1 (347) 393-4448'),
    ('2', 'Sugar Hill Restaurant & Supper Club', 'https://www.sugarhillsupperclub.com/image/125454940.png', 'Here is where the old timers get down! If you think you can hang, come on out and party with a bang!', 'Brooklyn', '1 (347) 723-5693'),
    ('3', 'E-40', 'https://lh3.googleusercontent.com/proxy/7EhxXfaeiQFPSnOsGU_wUoCsYTm0ZU74VEE9ws5uGVGbhx9TKefXamW4mXej_wy2sgrQMytjq3pAUGxayDHR_Zf3_3I92vG6nGwl16MW8ITlXOcM2yM6OWoXjtJWbmo3srSktp2ZvZ6N', 'Sick Wid It Records! Stay tuned!', 'Vallejo', '1 (707) 210-3458'),
    ('4', 'Metro Boomin', 'https://media.gq.com/photos/5a5f936eab6df56bfd56d048/3:2/w_4484,h_2989,c_limit/Metro_Boomin_02.jpg', 'Just a young songwriter, producer, record exec and dj trying to make something of himself and lift his community!', 'Atlanta', '1 (770) 340-2094'),
    ('5', 'Dr. Dre', 'https://www.hdwallpaper.nu/wp-content/uploads/2015/10/rappers_king_dr._dre.jpg', 'A rapper, record producer, audio engineer, record executive, entrepreneur, and actor. The founder and CEO of Aftermath Entertainment and Beats Electronics, and previously the co-owner of Death Row Records. Talk to me.', 'Compton', '1 (323) 987-6543'),
    ('6', 'DJ Khaled', 'https://hauteliving.com/wp-content/uploads/2019/12/1-234.jpg', 'We the BEST!!', 'New Orleans', '1 (504) 254-3894'),
    ('7', 'Pharrell', 'https://www.biography.com/.image/t_share/MTQ3NjM5NjAyMDAwMTc2MjAy/pharrell_williams_photo_by_brian_bowen_nbcuniversal_getty_462041114.jpg', 'Singer, rapper, songwriter, record producer, fashion designer, entrepreneur and the smoothest thing to hit your screen!', 'Virginia Beach', '1 (757) 827-1430'),
    ('8', 'Timbaland', 'https://thesource.com/wp-content/uploads/2020/03/Timbaland-scaled.jpg', 'Well-rounded. Ask me about it!', 'Norfolk', '1 (757) 102-3978'),
    ('9', 'Swizz Beatz', 'https://hauteliving.com/wp-content/uploads/2018/11/Screen-Shot-2018-11-30-at-1.08.21-PM.jpg', 'Did you know my career began as a disc jockey?', 'Bronx, New York', '1 (718) 987-6897'),
    ('10', 'The Bowery Electric', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQr4MfP-4MeVceUnohjEtpdoHWwIrzyzQbnVA&usqp=CAU', 'Live music venue and dance club in NYC. We offer event space rentals and party space rentals in NYC', 'New York', '1 (212) 228-0228'),
    ('11', 'James Spooner & Matthew Morgan', 'https://images.squarespace-cdn.com/content/v1/5ef7dfde5852131ace4af039/1593699153469-S5Q586HM6HDYXGS9QSZD/ke17ZwdGBToddI8pDm48kF2gysURjU9CqYyx1IC0Vn5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGs3viAW4q2ORhZt6eoADr8MMxJJftF4XCqIfKkHmDwkGO8epA7BgzGJECDiUQ7yuY/LOGO_Afropunk.jpg', 'The original creators of AfroPunk!', 'Brooklyn', '1 (718) 858-8322');
INSERT INTO events
    (name, venue, date, address, city, client_id)
VALUES
    ('MVP RUN', 'Zoom', '2020-07-29', '47-10 Austell Pl', 'Long Island City', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1'),
    ('SHOCK HOUSE', 'Webster Hall', '2020-08-31', '125 E 11th St', 'New York', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2'),
    ('COMEDY SHOW', 'Apollo Theater', '2020-08-12', '253 W 125th St', 'New York', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1'),
    ('THE ROCKETTES', 'Carnegie Hall', '2020-12-25', '881 Seventh Avenue', 'New York', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1'),
    ('BLACKLIGHT SLIDE', 'Aviator Sports and Events Center', '2020-08-15', '3159 Flatbush Avenue', 'Brooklyn', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2'),
    ('DRUMLINE', 'Betsy Head Park', '2020-09-10', 'Dumont Avenue', 'Brooklyn', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1'),
    ('HALLOWEEN MAZE', 'Blood Manor', '2020-10-31', '359 Broadway Avenue', 'New York', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2'),
    ('Grand Reopening', 'Sazon Nunez', '2020-09-15', '96 Wyckoff Ave', 'Brooklyn', 'Hg9tTgZPTDW2Pjt5T3gKQtnEZbo1'),
    ('Jazz Night', 'Sazon Nunez', '2020-09-19', '96 Wyckoff Ave', 'Brooklyn', 'Hg9tTgZPTDW2Pjt5T3gKQtnEZbo1'),
    ('Smooth Jazz Night', 'Sazon Nunez', '2020-09-26', '96 Wyckoff Ave', 'Brooklyn', 'Hg9tTgZPTDW2Pjt5T3gKQtnEZbo1'),
    ('Night Owls Party', 'Sazon Nunez', '2020-10-03', '96 Wyckoff Ave', 'Brooklyn', 'Hg9tTgZPTDW2Pjt5T3gKQtnEZbo1');

INSERT INTO bookings
    (id, artist_id, client_id, event_id, bio, contact_info)
VALUES
    ('1', '1', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '1', 'This is my first booking!', '1 (347) 917-0957'),
    ('2', '2', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2', '2', 'Ready for the tour now!', '1 (718) 258-3962'),
    ('3', '1', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '3', 'Yall didnt know I had jokes too, did you?', '1 (347) 917-0957'),
    ('4', '1', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '4', 'This has to be my biggest event to play yet!', '1 (347) 917-0957'),
    ('5', '2', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2', '5', 'Excited to rock the house!', '1 (718) 258-3962'),
    ('6', '2', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '6', 'I gets BUSY with the drums baby!', '1 (718) 258-3962'),
    ('7', '1', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2', '7', 'BOO!', '1 (347) 917-0957'),
    ('8', '2', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2', '7', 'I cant wait to scare the little kids.', '1 (718) 258-3962'),
    ('9', '2', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '4', 'Oh, this is going to be epic!', '1 (718) 258-3962'),
    ('10', 'eH9ygwiTOAUApNs9JwEATz4Ldzb2', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '6', 'This is going to feel like the band days!', '1 (347) 917-0957'),
    ('11', 'eH9ygwiTOAUApNs9JwEATz4Ldzb2', 'VJPYkMzc1kMmZ85Sy3tesvSm6Eu1', '4', 'Carnegie Hall. At Christmas! Are you kidding me?!', '1 (347) 917-0957'),
    ('12', 'eH9ygwiTOAUApNs9JwEATz4Ldzb2', 'AlvUvv7b4AeyKtqRUCOyPPfEnAi2', '7', 'This will be eerily interesting!', '1 (718) 258-3962');

