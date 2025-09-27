import dotenv from "dotenv"
dotenv.config()
import express from "express"
import session from "express-session"
import { connectDB } from "./utils/connectDB.js"
import MongoStore from 'connect-mongo';
// // importing the adminRoutes
import { adminRouter } from "./routes/adminRoutes.js"

const PORT = process.env.PORT || 4000

const app = express();



// console.log("testing server")



await connectDB()



// configuration of sessions and storing the session data in mongodb via connect-mongo
export const sessionMiddleware = session({
	name: "user-cookie", // name of the cookie that is stored in client's side(browser)
	secret: process.env.SECRET_KEY, // used to sign the session ID cookie
	resave: false,           // don't resave unchanged sessions
	saveUninitialized: false,// don't save empty sessions
	store: MongoStore.create({
		mongoUrl: process.env.MONGO_URI,
		collectionName: 'sessions'
	}),
	cookie: {
		maxAge: 1000 * 60 * 60, // 1 hour
		httpOnly: true,          // prevent JS access to cookie
		secure: false
	}
})

app.use(sessionMiddleware);


// Admin routes - session middleware must be configured before this
app.use("/admin", adminRouter)

// setting up the body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	return res.status(200).send('<h1>Server Running.....</h1>')
})

app.listen(PORT, () => {
	console.log(`server running on port : ${PORT}`)
})