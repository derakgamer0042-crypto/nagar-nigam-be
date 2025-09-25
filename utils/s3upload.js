import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";


const REGION = "ap-south-1"
const BUCKET_NAME = "nagar-nigam"


const s3 = new S3Client({
	region : "ap-south-1",
	credentials : {
		accessKeyId : process.env.AWS_ACCESS_KEY,
		secretAccessKey : process.env.AWS_SECRET_KEY
	}
})

const uploadToS3 = async(filePath)=>{
	try{


	}catch(err){
		console.log()
	}
}