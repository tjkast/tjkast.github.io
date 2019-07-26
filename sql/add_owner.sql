# drop existing procedure
DROP PROCEDURE IF EXISTS add_owner; 
 
# change delimiter to $$ --> i.e. the statement terminator is changed to $$
DELIMITER $$ 
 
CREATE PROCEDURE add_owner(IN idCur VARCHAR(100), IN passwordCur VARCHAR(100), IN emailCur VARCHAR(100), IN fullnameCur VARCHAR(100))
BEGIN
    IF NOT EXISTS (SELECT 1 FROM owners WHERE id=idCur) THEN
        INSERT INTO owners(id, password, email, fullname) VALUE (idCur, passwordCur , emailCur, fullnameCur);
        SELECT id FROM owners WHERE id=idCur;
    END IF;
    # statement (therefore, procedure) is over
END$$ 

# change the delimiter back to normal
DELIMITER ; 

DROP PROCEDURE IF EXISTS add_pet; 
 
# change delimiter to $$ --> i.e. the statement terminator is changed to $$
DELIMITER $$ 
 
CREATE PROCEDURE add_pet(IN imagelinks VARCHAR(300), IN idCur VARCHAR(100), IN hobby VARCHAR(100), IN locations VARCHAR(100), IN petType VARCHAR(100), IN bios VARCHAR(100))
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets WHERE id = idCur) THEN
        INSERT INTO pets(id, imagelink, animal, hobbies, location, bio) VALUE (idCur,imagelinks, petType , hobby, locations,bios);
        SELECT id FROM pets WHERE id =idCur;
    END IF;
    # statement (therefore, procedure) is over
END$$ 

# change the delimiter back to normal
DELIMITER ; 

DROP PROCEDURE IF EXISTS check_pass; 
# change delimiter to $$ --> i.e. the statement terminator is changed to $$
DELIMITER $$ 
 
# name the procedure; this one will have no arguments
CREATE PROCEDURE check_pass(IN idCur VARCHAR(100), IN passwordCur VARCHAR(100))
BEGIN
    IF EXISTS (SELECT 1 FROM owners WHERE id=idCur AND password = passwordCur) THEN
        SELECT id FROM owners WHERE id=idCur; 
    END IF;
    # statement (therefore, procedure) is over
END$$ 

# change the delimiter back to normal
DELIMITER ;