use diesel::Queryable;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use serde::Serialize;
use crate::schema::{tags};

#[derive(Queryable, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: i32,
    pub user_id: String,
    pub tag_name: String,
    pub color: String,
}

#[derive(Insertable)]
#[table_name="tags"]
pub struct NewTag {
    pub user_id: String,
    pub tag_name: String,
    pub color: String,
}

impl Tag {
    pub fn insert(
        conn: &PgConnection,
        user_id: String,
        tag_name: String,
        color: String
    ) -> QueryResult<usize> {
        let new_tag = NewTag {
            user_id,
            tag_name,
            color
        };

        diesel::insert_into(tags::table)
            .values(&new_tag)
            .execute(conn)
    }

    pub fn update(
        conn: &PgConnection,
        id: i32,
        user_id: String,
        tag_name: String,
        color: String
    ) -> QueryResult<usize> {
        diesel::update(
            tags::table
                .filter(tags::id.eq(id))
                .filter(tags::user_id.eq(user_id))
        ).set((
            tags::tag_name.eq(tag_name),
            tags::color.eq(color),
        )).execute(conn)
    }

    pub fn delete(
        conn: &PgConnection,
        user_id: String,
        name: String
    ) -> QueryResult<usize> {
        diesel::delete(
            tags::table
                .filter(tags::user_id.eq(user_id))
                .filter(tags::tag_name.eq(name))
        ).execute(conn)
    }

    pub fn retrieve(
        conn: &PgConnection,
        user_id: String
    ) -> QueryResult<Vec<Self>> {
        tags::table
            .into_boxed()
            .filter(tags::user_id.eq(user_id))
            .order(tags::id.asc())
            .limit(1000)
            .load::<Self>(conn)
    }
}
