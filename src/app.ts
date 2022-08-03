import express, {Request, Response} from'express'
import { AppDataSource } from './config/config'
import { api } from './routes/systemRoutes'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("successfully connected to db")
    })
    .catch((error) => console.log(error))

app.use('/api/v1', api)

app.listen(port, () => {
    console.log(`server is connected to port: ${port}`)
})