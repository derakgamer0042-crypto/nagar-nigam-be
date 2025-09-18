import { handleError } from "../utils/ErrorHandler.js";
import { Property } from "../models/formModelV2.js"
import { ActivityLogs } from "../models/activityLogSchema.js";
// import { getDayRange, toIST } from "../utils/dateUtils.js";

export const getSurveyorDataForRecord = async (req, res) => {
	try {

		// const currentDate = toIST(new Date());
		const currentDate = new Date();
		console.log("current date in IST is : " , currentDate)

		// let {dayStart : currentDayStart , dayEnd : currentDateEnd} = getISTDayRange(currentDate , currentDate)
		// currentDayStart = toIST(currentDayStart)
		// currentDateEnd = toIST(currentDateEnd)
		
		let {dayStart : currentDateStart , dayEnd : currentDateEnd} = getDayRange(currentDate , currentDate)

		let { from = currentDateStart, to = currentDateEnd } = req.body;
		console.log("from is : " , from)
		console.log("to is : " , to)

		const surveyDoneByToday = await Property.find({
			createdAt: { $gte: from, $lte: to }
		}).populate("surveyor").sort({createdAt : -1}).lean();

		const surveyors = surveyDoneByToday.map(doc => {
			return {...doc.surveyor , isSurveyVerified : doc.isSurveyVerified , address : doc.address , ward : doc.ward , houseNumber : doc.houseNumber , surveyDate : doc.createdAt}
		})

		console.log("Total survery done in given time : ", surveyDoneByToday.length)

		return res.status(200).json({ success: true, message: "Fetched all Surveyor's data", data: { surveyDoneByToday, surveyors } })


	} catch (err) {
		err.funcName = "getSurveyorDataForRecord";
		err.status = err.status || 501;
		return handleError(err, res); // pass res so user gets JSON response
	}
};


export const getLatestSurveyActivities = async(req,res)=>{
	try{

		const {limit = 5} = req.body;
		const activities = await ActivityLogs.find({}).sort({createdAt : -1}).limit(limit).lean()
		return res.status(201).json({success : true , message : `Fetched latest ${activities?.length} activities` , data : activities})

	}catch(err){
		handleError({...err , funcName : "getLatestSurveyActivities" } , res)
	}
}

export const getTotalPropertiesByCategory = async(req,res)=>{
	try{

		const properties = await Property.find({}).select("floorsDate totalTax")

		const residentialProperties = [] , commercialProperties = [] , mixedProperties = []

		

	}catch(err){
		handleError({...err , funcName : "getTotalPropertiesByCategory" } , res)
	}
}


export const getUserData = async(req,ers)=>{
	try{

		const body = req.body;

		// building dynamic query
		query = {}

		Object.entries(body).forEach(([key , value])=>{
			if(typeof(key) == "string"){
				query[key] = {$regex : value , $options : "i"}
			}else{
				query[key] = value
			}
		})

		console.log("query is : " , query)

		const properties = await Property.find(query)


		
		// const userData = Property.find({...body})
		return res.status(201).json({success : true , message : "Fetched Properties!!" , properties})

	}catch(err){
		handleError({...err , funcName : "getUserData" } , res)
	}
}
