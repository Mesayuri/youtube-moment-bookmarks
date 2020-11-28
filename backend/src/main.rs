use actix_web::{web, App, HttpServer, http::header};
use actix_cors::Cors;
use dotenv::dotenv;
use std::env;
use backend::views::{bookmark::*, tag::*};
use backend::connection::make_pool;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = make_pool();

    dotenv().ok();

    let app = move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin(
                        env::var("FRONTEND_URL")
                        .expect("FRONTEND_URL must be set")
                        .as_str()
                    )
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_header(header::CONTENT_TYPE)
                    .supports_credentials()
            )
            .service(
                web::scope("/")
                    .data(pool.clone())
                    .service(create_bookmark)
                    .service(create_tag)
                    .service(update_bookmark)
                    .service(update_tag)
                    .service(delete_bookmark)
                    .service(get_tags)
                    .service(get_bookmarks_from_tags)
                    .service(get_all_bookmarks)
            )
    };

    HttpServer::new(app)
    .bind(
        env::var("BACKEND_URL")
        .expect("BACKEND_URL must be set")
    )?
    .run()
    .await
}
