use actix_web::{get, post, web, Responder};
use serde::Deserialize;
use crate::connection::DbPool;
use crate::models::tag::Tag;
use crate::views::response::Response;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TagJsonBody {
    id: i32,
    tag_name: String,
    color: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewTagJsonBody {
    tag_name: String,
    color: String,
}

#[post("/create/tag")]
pub async fn create_tag(
    pool: web::Data<DbPool>, info: web::Json<NewTagJsonBody>
) -> impl Responder {
    let user_id = String::from("0");

    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");
    let result = Tag::insert(
        &conn,
        user_id,
        info.tag_name.clone(),
        info.color.clone()
    );

    match result {
        Ok(_) => web::Json(Response { result: true }),
        Err(_) => web::Json(Response { result: false }),
    }
}

#[post("/update/tag")]
pub async fn update_tag(
    pool: web::Data<DbPool>, info: web::Json<TagJsonBody>
) -> impl Responder {
    let user_id = String::from("0");

    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");
    let result = Tag::update(
        &conn,
        info.id.clone(),
        user_id,
        info.tag_name.clone(),
        info.color.clone()
    );

    match result {
        Ok(_) => web::Json(Response { result: true }),
        Err(_) => web::Json(Response { result: false }),
    }
}

#[get("/list/tag")]
pub async fn get_tags(
    pool: web::Data<DbPool>
) -> impl Responder {
    let user_id = String::from("0");

    let conn = pool.get()
        .expect("Failed to get DB connection from pool.");

    let result = Tag::retrieve(&conn, user_id);

    match result {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Failed"),
    }
}
