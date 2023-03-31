-- Users
INSERT INTO users (name, email, password) VALUES
  ('Alice', 'alice@example.com', 'password1'),
  ('Bob', 'bob@example.com', 'password2'),
  ('Charlie', 'charlie@example.com', 'password3');

-- Groups
INSERT INTO groups (name, description, creator_id) VALUES
  ('Group 1', 'This is group 1', 1),
  ('Group 2', 'This is group 2', 2),
  ('Group 3', 'This is group 3', 3);

-- Group Members
INSERT INTO group_members (group_id, user_id) VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 1),
  (3, 3);

-- Posts
INSERT INTO posts (title, content, author_id, group_id) VALUES
  ('Post 1', 'This is post 1', 1, 1),
  ('Post 2', 'This is post 2', 2, 2),
  ('Post 3', 'This is post 3', 1, 3),
  ('Post 4', 'This is post 4', 3, 3);

-- Comments
INSERT INTO comments (content, author_id, post_id) VALUES
  ('This is comment 1', 2, 1),
  ('This is comment 2', 1, 1),
  ('This is comment 3', 3, 2),
  ('This is comment 4', 2, 3),
  ('This is comment 5', 1, 4);

-- Likes
INSERT INTO likes (user_id, post_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 2),
  (3, 3),
  (3, 4);
