-- Creating the favorites table:
CREATE DATABASE favorite_gifs;
CREATE TABLE favorites (
	id SERIAL PRIMARY KEY,
	comment VARCHAR(255),
	url TEXT
);
