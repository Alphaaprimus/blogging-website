import pg from "pg";

export const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"blog",
    password:"yattharth@123",
    port: 5432
});

db.connect();