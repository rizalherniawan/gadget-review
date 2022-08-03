import "reflect-metadata"
import { DataSource } from "typeorm"
import { Todo } from "../entity/todo"
import dotenv from 'dotenv'
import { User } from "../entity/user"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: "todo_list",
    entities: [Todo, User],
    synchronize: true,
    logging: false,
})