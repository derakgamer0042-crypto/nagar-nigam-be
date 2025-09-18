import mongoose, { Schema, Types } from "mongoose";


const activityLogSchema = new mongoose.Schema({
	event : {
		type : String,
		enum : ["INSERTED" , "UPDATED" , "DELETED"]
	},    // action performed on out DB
	schemaId : {
		type : mongoose.Schema.Types.ObjectId,
	},    // _id of Collection on which the action was performed
	schemaModel : {
		type : String,
		enum : ["User" , "Surveyor" , "Property" , "RATE"]
	},   // collection name on which the action was performed
	message : {
		type : String
	},   // action message
	performedBy : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User' 
	},     // who performed the action
	ipAddress : {
		type : String
	},      // IP address of the user who performed the action
	performedByUserData : {type : Schema.Types.Mixed}, // details of the user who performed the action

} , {timestamps : true})


export const ActivityLogs = mongoose.model("ActivityLog" , activityLogSchema)