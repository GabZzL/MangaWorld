import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATEBASE_PORT),
});

export default pool;
