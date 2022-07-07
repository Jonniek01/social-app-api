USE socialapi
/*
SELECT * FROM users
SELECT * FROM posts
SELECT * FROM comments
SELECT * FROM replies

--
CREATE PROCEDURE patchuser
    @new_email VARCHAR(255),
    @new_name  VARCHAR(255),
    @uid VARCHAR(255)
    
AS
BEGIN
UPDATE users
SET
name=@new_name,
email=@new_email
WHERE
id=@uid
END

EXEC patchuser 'john@gmail.com', 'jonniu','u1'

--
--CREATE TRIGERS FOR THIS ENDPOINT TO WORK
CREATE PROCEDURE deleteuser
    @uid VARCHAR(255)
    
AS
BEGIN
DELETE FROM replies WHERE id=@uid;
DELETE FROM comments WHERE  id=@uid;
DELETE FROM posts WHERE id=@uid;

DELETE FROM users WHERE id=@uid

END
EXEC deleteuser 'u1'

*/