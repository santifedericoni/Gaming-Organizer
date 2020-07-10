DROP TABLE IF EXISTS games
CASCADE;
CREATE TABLE games
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  api_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  description VARCHAR(MAX) NOT NULL
);
