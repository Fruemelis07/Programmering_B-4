CREATE DATABASE IF NOT EXISTS redvelvet;
USE redvelvet;

-- ARTISTS
CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_name VARCHAR(100) NOT NULL
);

INSERT INTO artists (artist_name) VALUES ('Red Velvet');

-- ALBUM TYPES
CREATE TABLE album_types (
    album_type_id INT AUTO_INCREMENT PRIMARY KEY,
    album_type VARCHAR(50) NOT NULL
);

INSERT INTO album_types (album_type) VALUES
('Single'),
('Mini Album'),
('Full Album'),
('Repackage'),
('Special'),
('Remix');

-- CONCEPT TYPES
CREATE TABLE concept_types (
    concept_id INT AUTO_INCREMENT PRIMARY KEY,
    concept_name VARCHAR(50) NOT NULL
);

INSERT INTO concept_types (concept_name) VALUES
('Red'),
('Velvet'),
('In Between');

-- GENRES
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50)
);

INSERT INTO genres (genre_name) VALUES
('Pop'),
('Dance'),
('Ballad'),
('R&B'),
('Electronic'),
('K-Pop');

-- ALBUMS
CREATE TABLE albums (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    album_name VARCHAR(200) NOT NULL,
    artist_id INT NOT NULL,
    album_type_id INT NOT NULL,
    release_year YEAR,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (album_type_id) REFERENCES album_types(album_type_id)
);

INSERT INTO albums (album_name, artist_id, album_type_id, release_year)
VALUES
('Happiness', 1, 1, 2014),
('Be Natural', 1, 1, 2014),
('Ice Cream Cake', 1, 2, 2015),
('The Red', 1, 3, 2015),
('Wish Tree', 1, 1, 2015),
('The Velvet', 1, 2, 2016),
('Russian Roulette', 1, 2, 2016),
('Rookie', 1, 2, 2017),
('Would U', 1, 1, 2017),
('The Red Summer', 1, 2, 2017),
('Rebirth', 1, 1, 2017),
('Perfect Velvet', 1, 3, 2017);
('Perfect Velvet - The Repackage', 1, 4, 2018),
('Power Up', 1, 1, 2018)
('Reaaly Bad Boy', 1, 1, 2018)
('The ReVe Festival: Day 1', 1, 2, 2019)
()
-- SONGS
CREATE TABLE songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(200) NOT NULL,
    album_id INT,
    track_type VARCHAR(50),
    genre_id INT,
    concept_id INT,
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    FOREIGN KEY (concept_id) REFERENCES concept_types(concept_id)
);

INSERT INTO songs (song_name, album_id, track_type, genre_id, concept_id) VALUES
('Happiness', 1, 'Title Track', 1, 1),

('Be Natural', 2, 'Title Track', 4, 2),

('Ice Cream Cake', 3, 'Title Track', 1, 1),
('Automatic', 3, 'Pre-release', 4, 2),
('Somethin Kinda Crazy', 3, 'B-side', 1, 1),
('Stupid Cupid', 3, 'B-side', 1, 1),
('Take It Slow', 3, 'B-side', 4, 2),
('Candy', 3, 'B-side', 1, 1),

('Dumb Dumb', 4, 'Title Track', 1, 1),
('Huff n Puff', 4, 'B-side', 1, 1),
('Campfire', 4, 'B-side', 4, 2),
('Red Dress', 4, 'B-side', 1, 1),
('Oh Boy', 4, 'B-side', 4, 2),
('Ladys Room', 4, 'B-side', 4, 2),
('Time Slip', 4, 'B-side', 1, 1),
('Dont U Wait No More', 4, 'B-side', 4, 2),
('Day 1', 4, 'B-side', 4, 2),
('Cool World', 4, 'B-side', 1, 3),

('Wish Tree', 5, 'Title Track', 4, 2),

('One of These Nights', 6, 'Title Track', 4, 2),
('Cool Hot Sweet Love', 6, 'B-side', 4, 2),
('Light Me Up', 6, 'B-side', 4, 2),
('First Time', 6, 'B-side', 1, 1),
('Rose Scent Breeze', 6, 'B-side', 4, 2),
('One of These Nights (De-Capo Ver.)', 6, 'Remix', 4, 2),
('One of These Nights (Joe Millionaire Ver.)', 6, 'Remix', 4, 2),
('One of These Nights (Piano Ver.)', 6, 'Remix', 4, 2),

('Russian Roulette', 7, 'Title Track', 1, 1),
('Lucky Girl', 7, 'B-side', 1, 1),
('Bad Dracula', 7, 'B-side', 1, 1),
('Fool', 7, 'B-side', 4, 2),
('Some Love', 7, 'B-side', 1, 1),
('My Dear', 7, 'B-side', 4, 2),

('Rookie', 8, 'Title Track', 1, 1),
('Little Little', 8, 'B-side', 4, 2),
('Happily Ever After', 8, 'B-side', 1, 3),
('Talk To Me', 8, 'B-side', 4, 2),
('Body Talk', 8, 'B-side', 4, 2),
('Last Love', 8, 'B-side', 4, 2),

('Would U', 9, 'Title Track', 4, 2),

('Red Flavor', 10, 'Title Track', 1, 1),
('You Better Know', 10, 'B-side', 1, 1),
('Zoo', 10, 'B-side', 1, 1),
('Mojito', 10, 'B-side', 1, 1),
('Hear the Sea', 10, 'B-side', 4, 2),

('Rebirth', 11, 'Title Track', 4, 2),
('Rebirth (Instrumental)', 11, 'Instrumental', 4, 2),

('Peek-a-boo', 12, 'Title Track', 1, 1),
('Look', 12, 'B-side', 4, 2),
('I Just', 12, 'B-side', 1, 1),
('Kingdom Come', 12, 'B-side', 4, 2),
('My Second Date', 12, 'B-side', 1, 1),
('Attaboy', 12, 'B-side', 1, 1),
('Perfect 10', 12, 'B-side', 4, 2),
('About Love', 12, 'B-side', 4, 2),
('Moonlight Melody', 12, 'B-side', 4, 2);

('Bad Boy', 12.5, 'Repackage Title Track', 4, 2)
('All Right', 12.5, 'Repackage B-side', 1, 1)
('Peek-a-boo', 12.5, 'Repackage B-side', 1, 1)
('Look', 12.5, 'Repackage B-side', 4, 2)
('I Just', 12.5, 'Repackage B-side', 1, 1)
('Kingdom Come', 12.5, 'Repackage B-side', 4, 2)
('Time To Love', 12.5, 'Repackage B-side', 1, 1)
('My Second Date', 12.5, 'Repackage B-side', 1, 1)
('Attaboy', 12.5, 'Repackage B-side', 1, 1)
('Perfect 10', 12.5, 'Repackage B-side', 4, 2)
('About Love', 12.5, 'Repackage B-side', 4, 2)
('Moonlight Melody', 12.5, 'Repackage B-side', 4, 2)

('Power Up', 13, 'Title Track', 1, 1)
('With You', 13, 'B-side', 1, 1)
('Mr.E', 13, 'B-side', 4, 2)
('Mosquito', 13, 'B-side', 1, 1)
('Hit That Drum', 13, 'B-side', 1, 1)
('Blue Lemonade', 13, 'B-side', 4, 2)
('Bad Boy (English Ver.)', 13, 'B-side', 4, 2)

('Really Bad Boy (RBB)', 14, 'Title Track', 4, 2)
('Butterflies', 14, 'B-side', 4, 2)
('So Good', 14, 'B-side', 1, 1)
('Sassy Me', 14, 'B-side', 1, 1)
('Taste', 14, 'B-side', 4, 2)
('RBB (English Ver.)' , 14, 'B-side', 4, 2)


('Zimzalabim', 15, 'Title Track',1, 1)
('Sunny Side Up!', 15, 'B-side', 4, 2 )
('Milkshake', 15, 'B-side', 1, 1)
('Bing Bing', 15, 'B-side', 1, 1)
('Paradise', 15, 'B-side', 4, 2)
('LP', 15, 'B-side', 4, 2)

('Umpah Umpah', 16, 'Title Track', 1, 1)
('Carpool', 16, 'B-side', 4, 2)
('Love Is The Way', 16, 'B-side', 4, 2)
('Eyes Locked, Hands Locked', 16, 'B-side', 1, 1)
('Jumpin', 16, 'B-side', 1, 1)


