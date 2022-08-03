import { Todo } from "../entity/todo";
import { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { User } from "../entity/user";
import { default as bcrypt } from "bcrypt"
import dotenv from 'dotenv'
import { generateToken } from "../handler/tokenHandler";
dotenv.config()

export class System{

    static async RegistUser(req: Request, res: Response){
        try {
           const { username, password } = req.body
           if(username.includes(" ") || password.includes(" ")) return res.status(400).json({message: "Please input valid username or password"}) 
           const userExist : any = await AppDataSource.getRepository(User).findOneBy({username: username})
           if(userExist) return res.status(400).json({message: "user already existed"})
           const hashedPass = await bcrypt.hash(password, Number(process.env.SALT))
           const newuser = new User()
           newuser.username = username
           newuser.password = hashedPass
           newuser.CreatedAt = new Date()
           newuser.UpdatedAt = new Date()
           await AppDataSource.getRepository(User).save(newuser)
           return res.status(200).json({message: "user successfully created"})
        } catch (error) {
            res.status(500).json({message: "Network error"})
        }
    }

    static async LoginUser(req: Request, res: Response){
        try {
            const { username } = req.body
            if(username.includes(" ") || req.body.password.includes(" ")) return res.status(400).json({message: "Please input valid username or password"}) 
            const userExist : any = await AppDataSource.getRepository(User).findOneBy({username: username})
            if(!userExist) return res.status(400).json({message: "user not existed"})
            const {password, ...payload} = userExist
            const checkPass = await bcrypt.compare(req.body.password, password)
            if(!checkPass) return res.status(400).json({message: "wrong password"})
            const token = generateToken(payload)
            return res.status(200).json({message: "user successfully login", token: token})
        } catch (error) {
            res.status(500).json({message: "Network error"})
        }
    }

    static async postData(req: any, res: Response){
        try {
            const { id } = req.data
            const { todo } = req.body
            if(todo.trim().length == 0) return res.status(400).json({message:"Please input valid data"})
            const todos = new Todo()
            todos.todo = todo 
            todos.users = id
            todos.CreatedAt = new Date()
            todos.UpdatedAt = new Date()   
            await AppDataSource.getRepository(Todo).save(todos)
            return res.status(200).json({message: "Success adding data"})
        } catch (error) {
            res.status(500).json({message: "Network error"})
        }
    }

    static async lookTodo(req: any, res: Response) {
        try {
            const { id } = req.data
            const todoById : any = await AppDataSource
                .getRepository(User)
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.todos", "todo")
                .where("user.id = :id", { id : id})
                .getMany()
            const tds = todoById[0]["todos"].map((e : any) => e["todo"])
            return res.status(200).json({ data : tds })
        } catch (error) {
            res.status(400).json({messsage: "Error"})
            console.log(error)
        }
    }
}