DROP PROCEDURE IF EXISTS new_requests;

DELIMITER $$

CREATE PROCEDURE new_requests(IN name VARCHAR(100))

BEGIN
    UPDATE pet_requests
    SET 
    WHERE pet_name == name;
END$$

DELIMITER ;