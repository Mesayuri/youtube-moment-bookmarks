CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL UNIQUE,
    video_id VARCHAR NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    title VARCHAR (128) NOT NULL,
    notes VARCHAR (256) NOT NULL,
    tag_id_list INT[] NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    tag_name VARCHAR (128) NOT NULL,
    color VARCHAR (64) NOT NULL
);
