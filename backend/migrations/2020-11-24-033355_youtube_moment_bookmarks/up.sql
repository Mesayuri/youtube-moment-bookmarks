CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    video_id VARCHAR NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    title VARCHAR NOT NULL,
    notes TEXT NOT NULL,
    tag_id_list INT[] NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    tag_name VARCHAR NOT NULL,
    color VARCHAR NOT NULL
);
