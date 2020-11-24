use diesel::Queryable;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use serde::Serialize;
use crate::schema::{bookmarks};

#[derive(Queryable, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Bookmark {
    pub id: i32,
    pub user_id: String,
    pub video_id: String,
    pub start_time: i32,
    pub end_time: i32,
    pub title: String,
    pub notes: String,
    pub tag_id_list: Vec<i32>,
}

#[derive(Insertable)]
#[table_name="bookmarks"]
pub struct NewBookmark {
    pub user_id: String,
    pub video_id: String,
    pub start_time: i32,
    pub end_time: i32,
    pub title: String,
    pub notes: String,
    pub tag_id_list: Vec<i32>,
}

impl Bookmark {
    pub fn insert(
        conn: &PgConnection,
        user_id: String,
        video_id: String,
        start_time: i32,
        end_time: i32,
        title: String,
        notes: String,
        tag_id_list: Vec<i32>
    ) -> QueryResult<usize> {
        let new_moment = NewBookmark {
            user_id,
            video_id,
            start_time,
            end_time,
            title,
            notes,
            tag_id_list
        };

        diesel::insert_into(bookmarks::table)
            .values(&new_moment)
            .execute(conn)
    }

    pub fn update(
        conn: &PgConnection,
        id: i32,
        user_id: String,
        start_time: i32,
        end_time: i32,
        title: String,
        notes: String,
        tag_id_list: Vec<i32>
    ) -> QueryResult<usize> {
        diesel::update(
            bookmarks::table
                .filter(bookmarks::id.eq(id))
                .filter(bookmarks::user_id.eq(user_id))
        ).set((
            bookmarks::start_time.eq(start_time),
            bookmarks::end_time.eq(end_time),
            bookmarks::title.eq(title),
            bookmarks::notes.eq(notes),
            bookmarks::tag_id_list.eq(tag_id_list)
        )).execute(conn)
    }

    pub fn delete(
        conn: &PgConnection,
        id: i32,
        user_id: String
    ) -> QueryResult<usize> {
        diesel::delete(
            bookmarks::table
                .filter(bookmarks::id.eq(id))
                .filter(bookmarks::user_id.eq(user_id))
        ).execute(conn)
    }

    // pub fn retrieve_from_title(
    //     conn: &PgConnection,
    //     user_id: String,
    //     title: String
    // ) -> QueryResult<Vec<Self>> {
    //     bookmarks::table
    //         .into_boxed()
    //         .filter(bookmarks::user_id.eq(user_id))
    //         .filter(bookmarks::title.eq(title))
    //         .load::<Self>(conn)
    // }

    pub fn retrieve_all(
        conn: &PgConnection,
        user_id: String,
    ) -> QueryResult<Vec<Self>> {
        bookmarks::table
            .into_boxed()
            .filter(bookmarks::user_id.eq(user_id))
            .order((bookmarks::video_id.asc(), bookmarks::start_time.asc()))
            .limit(1000)
            .load::<Self>(conn)
    }

    pub fn retrieve_from_tags(
        conn: &PgConnection,
        user_id: String,
        tag_id_list: Vec<i32>
    ) -> QueryResult<Vec<Self>> {
        bookmarks::table
            .into_boxed()
            .filter(bookmarks::user_id.eq(user_id))
            .filter(bookmarks::tag_id_list.contains(tag_id_list))
            .order((bookmarks::video_id.asc(), bookmarks::start_time.asc()))
            .limit(1000)
            .load::<Self>(conn)
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//     use dotenv::dotenv;
//     use std::env;

//     fn establish_connection() -> PgConnection {
//         dotenv().ok();

//         let database_url = env::var("TEST_DATABASE_URL")
//             .expect("TEST_DATABASE_URL must be set");
//         PgConnection::establish(&database_url)
//             .expect(&format!("Error connecting to {}", database_url))
//     }
// }
