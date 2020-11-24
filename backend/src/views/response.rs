use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Response {
    pub result: bool,
}
