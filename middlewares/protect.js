import jwt from "jsonwebtoken"
import {handleError} from "../utils/ErrorHandler.js"

export const protect = async (req, res, next) => {
	try {
		
		// 1. Getting token from cookie
		const token = req.cookies?.token

		if (!token) {
			return res.status(401).json({ message: "Unauthorized: No token provided" })
		}

		// 2. Verify token
		const user = jwt.verify(token, process.env.SECRET_KEY)

		console.log("after decoding user token is : " , user)

		// 3. Attach decoded user data to req for later use
		req.user = user

		// 4. Continue
		next()

	} catch (err) {
		handleError(err , res)
	}
}

export const adminOnly = async()=>{
	try{
		user = req.user;
		if(user.role !== "admin") handleError({message : "Admin Only , Not aythorized !!" , status : 401 , funcName : "adminOnly middleware"} , res)
			
		next()

	}catch(err){
		handleError(err , res);
	}
}

// seperate function to check the user which is requesting is admin

export const adminOnlyV2 = async(req,res,next)=>{
	try{

		const token = req.cookies?.token
		if(!token){
			handleError({message : "Not authorized" , status : 401 , funcName : "adminOnly middleware"} , res)
		}
		
		const user = jwt.verify(token , process.env.SECRET_KEY)
		console.log("after decoding the user token for admin only is : " , user);

		// checking if the role of this user is admin or not
		if(user.role !== "admin") handleError({message : "Admin Only , Not aythorized !!" , status : 401 , funcName : "adminOnly middleware"} , res)

		req.user = user;
		next();

	}catch(err){
		handleError(err , res)
	}
}