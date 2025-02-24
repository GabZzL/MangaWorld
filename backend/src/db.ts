import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.DATABASE_PASSWORD;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: password,
  database: "inventory",
  port: 5432,
});

export default pool;
