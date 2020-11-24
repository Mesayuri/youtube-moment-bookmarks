use backend::views::*;
use backend::connection::make_pool;
use actix_web::{web, App, HttpServer, http::header};
use actix_cors::Cors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = make_pool();

    let app = move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://192.168.11.18:3000")
                    .allowed_origin("http://localhost:3000")
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_header(header::CONTENT_TYPE)
                    .supports_credentials()
            )
            .service(
                web::scope("/")
                    .data(pool.clone())
            )
    };

    HttpServer::new(app)
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
