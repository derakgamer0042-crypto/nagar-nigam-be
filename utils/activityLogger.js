import { ActivityLogs } from "../models/activityLogSchema.js"
import { handleError } from "./ErrorHandler.js"

export const activityLogger = async(activity)=>{
	try{
		
		const{schemaId , schemaModel , message , event , performedBy , performedByUserData} = activity

		await ActivityLogs.create({
			schemaId : schemaId || undefined , schemaModel : schemaModel || undefined , message , event , performedBy , performedByUserData
		})

		return "New Activity Logged Stored"

	}catch(err){
		console.log("err is : " , err)
		handleError({...err , funcName : "activityLogger" })
	}
}
