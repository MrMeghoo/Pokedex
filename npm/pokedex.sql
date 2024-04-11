CREATE TABLE pokedex_project(
id SERIAL PRIMARY KEY,
name VARCHAR (100),
type VARCHAR (25),
region VARCHAR (25),
abilities VARCHAR(50)
);


INSERT INTO pokedex_project (name, type, abilities, region)
VALUES
    ('Charmander', 'Fire', 'Blaze', 'Kanto'),
    ('Machop', 'Fighting', 'Guts', 'Kanto'),
    ('Squirtle', 'Water', 'Torrent', 'Kanto'),
    ('Bulbasaur', 'Grass', 'Overgrow', 'Kanto');
