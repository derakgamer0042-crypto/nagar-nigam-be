import mongoose from "mongoose";


export const addNewPropertAssesment1 = new mongoose.Schema({
	interviewerName : {
		type : String,
	},
	fatherName : {
		type : String
	},
	relationWithOwner : {
		type : String,
		enum : ["son" , "daughter" , "father" , "mother" , "sister" , "wife" , "brother" , "others"]
	},
	locality : {
		type : String
	},
	ownerName : {
		type : String
	},
	guardianName : {
		type : String
	},
	constructionYear : {
		type : Number
	},
	houseNumber : {
		type : String
	},
	pinCode : {
		type : Number
	},
	address : {
		type : String
	},
	religion : {
		type : String,
		enum : ["Hindu" , "Muslim" , "CHristian" , "Others"]
	},
	gender : {
		type : String,
		enum : ["male" ,"female" , "others"]
	},
	mobile : {
		type : Number
	},
	aadharNumber : {
		type : Number
	},
	propertyName : {
		type : String
	},
	sequenceNumber : {
		type : Number
	}
})



const floorData = new mongoose.Schema({
	classification : {
		type : String,
		enum : ["residential" , "commercial" , "mixed"]
	},
	carpetAreaC : {
		type : String
	},
	emptyAreaC : {
		type : String
	},
	carpetAreaR : {
		type : String
	},
	emptyAreaR : {
		type : String
	}

})

const assessment2FloorsData = new mongoose.Schema({
	numberOfFloors : {
		type : Number,
		min: [1, 'Number of floors must be at least 1']
	},
	floors : {
		type : [floorData],
		_id : false,
		validate: {
			validator: function (value) {
				// 'this' refers to the current subdocument (assessment2FloorsData)
				return value.length === this.numberOfFloors
			},
			message: 'Floors array length must match numberOfFloors'
		}
	}
})

export const addNewPropertAssesment2 = new mongoose.Schema({
	propertyType : {
		// need to be updated
		type : String,
	},
	constructionType : {
		// need to be updated
		type : String
	},
	roadWidthType : {
		// need to be updated
		type : String
	},
	numberOfToilets: {
		type : Number
	},
	addFamilyMembers : {
		type : {
			male : {type : Number},
			female : {type : Number}
		},
		label : "Add Family Member(s)",
		_id : false
	},
	isAvailables : {
		isTenantAvailable : {type : Boolean},
		isWaterConnection : {type : Boolean},
		isSubmersiblePump : {type : Boolean},
		isSewerConnection : {type : Boolean},
	},
	waterConnNumber : {
		type : Number
	},
	surrounding : {
		type : {
			east : {type : String},
			west : {type : String},
			north : {type : String},
			south : {type : String},
		}
	},
	floorsData : {
		type : assessment2FloorsData,
		_id : false
	}
})


export const addNewProperty = new mongoose.Schema({
	assessment1 : {
		type : addNewPropertAssesment1,
		_id : false
	},
	assessment2 : {
		type : addNewPropertAssesment2,
		_id : false
	}
})





export const AddNewProperty = mongoose.model("AddNewProperty" , addNewProperty )