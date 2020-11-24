use actix_web::{get, post, web, Responder};
use serde::Deserialize;
use crate::connection::DbPool;
use crate::models::bookmark::Bookmark;
use crate::views::response::Response;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BookmarkJsonBody {
    id: i32,
    start_time: i32,
    end_time: i32,
    title: String,
    notes: String,
    tag_id_list: Vec<i32>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewBookmarkJsonBody {
    video_id: String,
    start_time: i32,
    end_time: i32,
    title: String,
    notes: String,
    tag_id_list: Vec<i32>,
}

#[post("/create/bookmark")]
pub async fn create_bookmark(
    pool: web::Data<DbPool>, info: web::Json<NewBookmarkJsonBody>
) -> impl Responder {
    let user_id = String::from("0");

    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");
    let result = Bookmark::insert(
        &conn,
        user_id,
        info.video_id.clone(),
        info.start_time.clone(),
        info.end_time.clone(),
        info.title.clone(),
        info.notes.clone(),
        info.tag_id_list.clone()
    );

    match result {
        Ok(_) => web::Json(Response { result: true }),
        Err(_) => web::Json(Response { result: false }),
    }
}

#[post("/update/bookmark")]
pub async fn update_bookmark(
    pool: web::Data<DbPool>, info: web::Json<BookmarkJsonBody>
) -> impl Responder {
    let user_id = String::from("0");

    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");
    let result = Bookmark::update(
        &conn,
        info.id.clone(),
        user_id,
        info.start_time.clone(),
        info.end_time.clone(),
        info.title.clone(),
        info.notes.clone(),
        info.tag_id_list.clone()
    );

    match result {
        Ok(_) => web::Json(Response { result: true }),
        Err(_) => web::Json(Response { result: false }),
    }
}

#[get("/tag/{tag_id_list}")]
pub async fn get_bookmarks_from_tags(
    pool: web::Data<DbPool>, web::Path(tag_id_list): web::Path<String>
) -> impl Responder {
    let user_id = String::from("0");
    
    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");
    
    let tag_id: Vec<i32> = tag_id_list.split_whitespace()
        .into_iter()
        .filter_map(
            |tag_id_str| tag_id_str.parse::<i32>().ok()
        ).collect();

    let result = if tag_id.len() != 0 {
        Bookmark::retrieve_from_tags(&conn, user_id, tag_id)
    } else {
        Bookmark::retrieve_all(&conn, user_id)
    };

    match result {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Failed"),
    }
}
