import mongoose from "mongoose";


export const connectDB = async()=>{
	try{
		const uri = process.env.MONGO_URI;
		const connect = await mongoose.connect(uri)
		console.log("successfully established the connection with database")
	}catch(err){
		console.log("Error while connecting to the DB : " , err.message);
	}
}


