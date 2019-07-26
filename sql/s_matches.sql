DROP TABLE IF EXISTS pets;
CREATE TABLE pets(id VARCHAR(100), imagelink VARCHAR(300), animal VARCHAR(100), hobbies VARCHAR(1000), location VARCHAR(100), bio VARCHAR(100));
INSERT INTO pets(id, imagelink, animal, hobbies, location, bio) VALUE ('skip', 'https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg', 'dog', 'running', 'a', 'hi');

-- DROP PROCEDURE IF EXISTS find_match;
-- DELIMITER $$

-- CREATE PROCEDURE find_match(IN hobbies VARCHAR(100), IN aniPref VARCHAR(100))