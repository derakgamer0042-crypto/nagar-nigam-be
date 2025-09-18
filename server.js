import dotenv from "dotenv"
dotenv.config({path : ".env"})
import cors from "cors"
import express from "express"
import { connectDB } from "./utils/connectDB.js"
import { adminRouter } from "./routes/adminRoutes.js"

import {sessionMiddleware} from "./middlewares/sessionMiddleware.js"


// importing all the woutes
import {router as adminDashboardRoutes} from "./routes/adminDashboardRoutes.js"

const PORT = process.env.PORT || 4000

const app = express();


app.use(cors())

app.use(sessionMiddleware(process.env.MONGO_URI));

// Admin routes - session middleware must be configured before this
app.use("/admin", adminRouter)

// setting up the body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes 
app.get("/", (_ , res) => {
	return res.status(200).send('<h1>Server Running.....</h1>')
})

app.use("/admin-info" , adminDashboardRoutes)


const startServer = async()=>{
	try{

		// connecting the DB
		await connectDB()

		// setting up the code on which our server listens to
		app.listen(PORT)
		.on('error' , err => console.log("[Server Error]" , err.message))
		.on('listening' , ()=> console.log(`[Info] Server running on port ${PORT}`) )

	}catch(err){
		console.log("[Error] while starting the server " , err.message)
	}
}


startServer()



