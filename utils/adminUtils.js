import { flagError } from "./ErrorHandler.js"
import {classifiedGroups} from "./data.js"

export const mapClassifiedProperty = (propertyType)=>{
	try{

		console.log("classified groups : " , classifiedGroups)
		console.log("property type is : " , propertyType)

		const res = Object.entries(classifiedGroups).find(([key , value])=>{
			return value.includes(propertyType.trim())
		})
		console.log("group is : " ,  res)
		return res ? res[0] : null

	}catch(err){
		flagError(err , "mapClassifiedProperty");
	}
}