require('dotenv').config()

const express = require('express')
const app = express()
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')

app.use(express.json())
app.use(express.static("./public"))
app.use('/api/v1/tasks', tasksRouter)
app.use(notFound)
app.use(errorHandler)

const port = 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, ()=>{
            console.log("Server is listening on port 3000");
        })
    } catch (error) {
      console.log(error);  
    }
}

start()