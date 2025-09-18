import { Surveyor } from "../../models/surveyorModel.js"
// import { toIST } from "../../utils/dateUtils.js"
import { handleError } from "../../utils/ErrorHandler.js"

export const buildOject = (flattenObject , property)=>{
	const obj = {}

	// console.log("property path is : " , property.path)

	Object.entries(flattenObject).map(( [key , value] )=>{

		if(key.startsWith(`${property.path}`)) obj[key.split(".")[1]] = value

	})

	// console.log("object is : " , obj)

	return obj
}


// this function exectues when a new user is created and its role is "surveyor"
export const createNewSurveyorDoc = async(user)=>{
	try{

		if(user.role != "surveyor") return "Not Surveyor"

		// no first we have to check if this surveyor already exists..?

		const isSurveyorAlreadyExists = await Surveyor.findOne({ email : user.email , isSurveyorActive : true});
		if(isSurveyorAlreadyExists) return "Surveyor already exists in Database"

		await Surveyor.create({
			name : user.name,
			email : user.email
		})

		return "New Surveyor is Created"
		
	}catch(err){
		handleError(err)
	}
}



export const updateSurveryorData = async(id , isVerified = false)=>{
	try{

		const currentDate = new Date();
		const surveyor = await Surveyor.findById(id)
		console.log("id is : " , id)
		console.log("surveyour is : " , surveyor)

		surveyor.totalSurveyDone += 1;
		// surveyor.lastSurveyDoneOn = toIST(currentDate);
		surveyor.lastSurveyDoneOn = currentDate;

		if(isVerified) surveyor.totalSuccessfulSurvey += 1;

		// calling the object's method to calculate the final success rate
		surveyor.updateSuccessRate();

		await surveyor.save();

	}catch(err){
		handleError({funcName : "updateSurveryorData" , message : err.message , status : 501})
	}
}


export const verifySurveyById = async(id , val)=>{
	try{
		console.log("inside the success rate update function , value is : " , val)
		const surveyor = await Surveyor.findById(id);
		console.log("surveyor : " , surveyor)
		if(surveyor.totalSuccessfulSurvey == 0 && val == -1) return
		surveyor.totalSuccessfulSurvey += val;
		surveyor.updateSuccessRate();
		await surveyor.save();

	}catch(err){
		handleError(err)
	}
}


export const verifyAdmin = (context)=>{
	return context.currentAdmin && context.currentAdmin.role == "admin"
}