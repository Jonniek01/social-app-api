
USE socialapi

/*
--
SELECT 
 *
FROM
information_schema.tables;

--

SELECT * FROM users
SELECT * FROM posts
SELECT * FROM comments
SELECT * FROM replies

DELETE  FROM replies WHERE comment_id='c3'
DELETE  FROM comments WHERE id='c8'

--

INSERT INTO users(id, name, email, password)
 VALUES
('u2','Peter','peter@gmail.com','p123'),
('u3','Mary','mary@gmail.com','m123')

--

INSERT INTO posts(id, creator_id, content)
VALUES
('p1','u1','Whatever the inside joke was, he wasnt about to share it and she didnt ask.'),

('p2','u1','She willed herself not to laugh at his joke, but it was hard.'),
('p3','u1','Right now, he was too frazzled to know what else to do aside from make a joke to ease some of the tension.'),
('p4','u2','She willed herself not to laugh at his joke, but it was hard.'),
('p5','u2','He tried, but failed, to find some joke with which to reply to Dolokhovs words.'),
('p6','u3','What for a long while specially surprised and delighted him were the women, young and healthy, without a dozen officers making up to each of them; women, too, who were pleased and flattered that a passing officer should joke with them.'),
('p7','u3','An old joke is about the city slicker who finds himself lost in the country.'),
('p8','u3','Pretoria through Boer sources, and when first received there was laughed at by the garrison and inhabitants as a Boer joke.')

--

INSERT INTO comments(id, creator_id, post_id, content )
VALUES
('c1','u1','p1','Now Im pretty sure this is all a huge joke.'),
('c2','u2','p1','He wasnt expecting Fate to crack a joke.'),
('c3','u2','p1','If this was meant as a joke, Dean did-nt find it very funny.'),
('c4','u1','p2','Dear Ish, Heres a joke - A little boy opened his big family Bible.'),
('c5','u3','p2','John Robson is seen here enjoying a joke with his Joint Master Jimmy Edwards at a Meet in 1979.'),
('c6','u3','p3','This really could be the genesis of the fat mother-in-law joke, " one of the team breathlessly asserted.'),
('c7','u2','p3','Ronnie Scotts How do you get a jazz musician to make a million quid, the joke goes.'),
('c8','u3','p3','Seeing Cherry-throated tanager is, however, a very expensive joke.')

--




INSERT INTO replies(id, creator_id,comment_id, content)
VALUES
('r1','u1','c1','What nonsense! she said, hoping it was a joke.'),
('r2','u1','c2','Seeing Cherry-throated Tanager is, however, a very expensive joke.'),
('r3','u2','c2','Now I think I need a rather vulgar joke at this point.'),
('r4','u3','c2','Being whacked in the face by a branch is no joke.'),
('r5','u2','c3','Likewise, the lucky recipient will feel good because shell know its an authentic note from you and not some practical joke.')

*/