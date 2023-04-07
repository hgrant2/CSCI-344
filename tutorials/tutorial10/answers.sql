-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
SELECT id, first_name, last_name
FROM users ORDER BY last_name;



-- Exercise 4: Filtering
SELECT id, user_id, image_url
FROM posts WHERE user_id=26;



-- Exercise 5: Filtering with logical operators
SELECT id, user_id, image_url
FROM posts WHERE user_id=26 OR user_id=12;



-- Exercise 6: Using functions in a select statement
SELECT COUNT(*)
FROM posts;



-- Exercise 7: Aggregating data
SELECT user_id, COUNT(id)
FROM posts GROUP BY user_id;



-- Exercise 8: Joining: two tables
SELECT posts.id, posts.image_url, posts.user_id, users.username, 
users.first_name, users.last_name
FROM posts
INNER JOIN users ON 
	posts.user_id = users.id
WHERE user_id = 26 OR user_id = 12;



-- Exercise 9: More joining practice: two tables
SELECT posts.id, posts.pub_date, following.id
FROM posts
INNER JOIN following ON 
	posts.user_id = following.following_id
WHERE following.user_id = 26;



-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records
INSERT INTO bookmarks(user_id, post_id,timestamp)
VALUES(26,219, now());
VALUES(26,220, now());
VALUES(26,221, now());


-- Exercise 12: Deleting records
DELETE FROM bookmarks
WHERE user_id=26 AND post_id = 219;

DELETE FROM bookmarks
WHERE user_id=26 AND post_id = 220;

DELETE FROM bookmarks
WHERE user_id=26 AND post_id = 221;



-- Exercise 13: Updating records
UPDATE users
SET email = 'knick2022@gmail.com'
WHERE id=26;



-- Exercise 14: More Querying Practice (Optional)
