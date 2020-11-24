table! {
    bookmarks (id) {
        id -> Int4,
        user_id -> Varchar,
        video_id -> Varchar,
        start_time -> Int4,
        end_time -> Int4,
        title -> Varchar,
        notes -> Varchar,
        tag_id_list -> Array<Int4>,
    }
}

table! {
    tags (id) {
        id -> Int4,
        user_id -> Varchar,
        tag_name -> Varchar,
        color -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    bookmarks,
    tags,
);
