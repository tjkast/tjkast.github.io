DROP PROCEDURE IF EXISTS new_pet;

DELIMITER $$

CREATE PROCEDURE new_pet(IN h_name VARCHAR(100), IN name VARCHAR(100), IN pet_type VARCHAR(100), IN loc INT(100), IN hobby VARCHAR(100), IN prefs VARCHAR(100))

BEGIN
    -- IF NOT EXISTS (SELECT 1 FROM pets WHERE p_name = name) THEN
    INSERT INTO pets(human_name, p_name, p_type, p_location, p_hobby, p_aniPref) VALUES (h_name, name, pet_type, loc, hobby, prefs);
    -- END IF;
END$$

DELIMITER ;