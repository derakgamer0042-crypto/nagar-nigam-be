import { Rate } from "../models/rateModel.js"
import { PropertyType , MultiplierCommercial, getKeyByValue, RoadWidthType, ConstructionType } from "./data.js"


export const calculateRate = async(roadType , constructionType)=>{
	const rates = await Rate.findOne().sort({createdAt : -1})
	console.log("rates are : " , rates)
	console.log("roadtype" , roadType , "constructionType" , constructionType)
	return rates[roadType][constructionType] || null
}

export const getCommercialMultiplier = (propertyType)=>{
	const priceCategory = {
		category1 : 1,
		category2 : 2,
		category3 : 3,
		category4 : 3,
	}

	const category = Object.entries(MultiplierCommercial).find(([key , value])=>{
		const foundCategoryObj = Object.entries(value).find(([nestKey , nestValue])=> nestValue == propertyType);
		return foundCategoryObj
	})

	return priceCategory[category[0]]

	

}

const taxOrgFormula = (totalArea , rate)=>{
	return (totalArea * rate * 12)
}

export const calculateTax = async(floorsData , roadType , constructionType , propertyType) => {

	// roadType = getKeyByValue(roadType , RoadWidthType)
	// constructionType = getKeyByValue(propertyType , ConstructionType)

	roadType = getKeyByValue(roadType , RoadWidthType)
	constructionType = getKeyByValue(constructionType , ConstructionType)

	

	console.log("roadType : " , roadType , " constructionType : " , constructionType)
	// return
	const { floors, numberOfFloors } = floorsData

	let totalEmptyR = 0;
	let totalEmptyC = 0;
	let totalCarpetR = 0;
	let totalCarpetC = 0;

	let index = 0;

	for (const floor of floors) {
		if (index >= numberOfFloors) break;
		totalEmptyR += floor.emptyAreaR
		totalEmptyC += floor.emptyAreaC
		totalCarpetR += floor.carpetAreaR
		totalCarpetC += floor.carpetAreaC
		index++;
	}

	// here we are calculating RATE on the basis of roadType and constructionType
	const RATE = await calculateRate(roadType , constructionType)

	// const COMMERCIAL_MULTIPLIER = 3
	// here we are calculating the multiplier for commercial area
	const COMMERCIAL_MULTIPLIER = getCommercialMultiplier(propertyType) 
	console.log("multiplier is : " , COMMERCIAL_MULTIPLIER)

	const emptyResARV = (RATE * totalEmptyR * 12)
	const emptyComARV = (RATE * totalEmptyC * 12) * COMMERCIAL_MULTIPLIER
	const carpetResARV = (RATE * totalCarpetR * 12)
	const carpetComARV = (RATE * totalCarpetC * 12) * COMMERCIAL_MULTIPLIER


	const totalARV = (emptyResARV + emptyComARV + carpetResARV + carpetComARV);

	const houseTaxInt = Math.round((10 / 100) * totalARV)
	const waterTaxInt = Math.round((7.5 / 100) * totalARV)

	console.log("total ARV is : " , totalARV )
	console.log("house tax is : ", houseTaxInt);
	console.log("water tax is : ", waterTaxInt);
	console.log("TOTAL TAX : ", houseTaxInt + waterTaxInt);

	const taxinfo = {
		houseTax : houseTaxInt,
		waterTax : waterTaxInt,
		totalTax : (houseTaxInt + waterTaxInt),
		totalARV,
		area : {
			"totalEmptyArea(R)" : totalEmptyR,
			"totalCarpetArea(R)" : totalCarpetR,
			"totalEmptyArea(C)" : totalEmptyC,
			"totalCarpetArea(C)" : totalCarpetC
		},
		arv : {
			emptyResARV,
			carpetResARV,
			emptyComARV,
			carpetComARV,
			totalARV
		}

	}

	return {houseTax : houseTaxInt , waterTax : waterTaxInt , totalTax : (houseTaxInt + waterTaxInt) , totalARV, taxinfo}
}

