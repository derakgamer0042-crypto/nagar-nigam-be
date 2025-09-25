import mongoose, { set } from "mongoose";
import { ConstructionType, PropertyType, RoadWidthType, RoadWidthTypeReverseMapping } from "../utils/data.js"
import { handleError } from "../utils/ErrorHandler.js";
// import { toIST } from "../utils/dateUtils.js";
import { customAlphabet } from "nanoid"

// ---------------- Floor Schema ----------------
const floorSchema = new mongoose.Schema({
  classification: {
    type: String,
    enum: ["residential", "commercial", "mixed"],
    required: true
  },
  carpetAreaC: { type: Number , set : v=> v === '' ? null : Number(v) },
  emptyAreaC: { type: Number ,  set : v=> v === '' ? null : Number(v) },
  carpetAreaR: { type: Number ,  set : v=> v === '' ? null : Number(v) },
  emptyAreaR: { type: Number ,  set : v=> v === '' ? null : Number(v) }
}, { _id: false });

// ---------------- Floors Wrapper ----------------
const floorsDataSchema = new mongoose.Schema({
  numberOfFloors: {
    type: Number,
    min: [1, "Number of floors must be at least 1"],
    required: true
  },
  floors: {
    type: [floorSchema],
    validate: {
      validator: function (value) {
        return value.length === this.numberOfFloors;
      },
      message: "Floors array length must match numberOfFloors"
    }
  }
}, { _id: false });

// ---------------- Family Members ----------------
const familySchema = new mongoose.Schema({
  male: { type: Number, default: 0 },
  female: { type: Number, default: 0 }
}, { _id: false });

// ---------------- Utilities ----------------
const utilitiesSchema = new mongoose.Schema({
  isTenantAvailable: { type: Boolean, default: false },
  isWaterConnection: { type: Boolean, default: false },
  isSubmersiblePump: { type: Boolean, default: false },
  isSewerConnection: { type: Boolean, default: false }
}, { _id: false });

// ---------------- Surroundings ----------------
const surroundingSchema = new mongoose.Schema({
  east: { type: String, trim: true },
  west: { type: String, trim: true },
  north: { type: String, trim: true },
  south: { type: String, trim: true }
}, { _id: false });

// ---------------- Main Property Schema ----------------
const propertySchema = new mongoose.Schema({
  PPIN : {type : String , trim : true},
  ward: { type: String, trim: true },
  locality: { type: String, trim: true },
  houseNumber: { type: String, trim: true },
  isEmptyProperty: { type: Boolean, default: false },

  // Interview & ownership
  interviewerName: { type: String, trim: true },
  fatherName: { type: String, trim: true },
  relationWithOwner: {
    type: String,
    enum: ["son", "daughter", "father", "mother", "sister", "wife", "brother", "others"]
  },
  ownerName: { type: String, trim: true },
  guardianName: { type: String, trim: true },
  phoneNumber : {type : Number},

  // Property info
  constructionYear: { type: Number },
  pinCode: { type: Number },
  address: { type: String, trim: true },
  religion: { type: String, enum: ["Hindu", "Muslim", "Christian", "Others"] },
  gender: { type: String, enum: ["male", "female", "others"] },
  mobile: { type: Number },
  aadharNumber: { type: Number },
  propertyName: { type: String, trim: true },
  sequenceNumber: { type: Number },
  email : {type : String , trim : true},

  propertyType: { type: String, trim: true, enum: Object.values(PropertyType) },
  constructionType: { type: String, trim: true, enum: Object.values(ConstructionType) },
  roadWidthType: { type: String, trim: true, enum: Object.values(RoadWidthType) },
  numberOfToilets: { type: Number, default: 0 },

  // Sub-documents
  addFamilyMembers: { type: familySchema },
  utilities: { type: utilitiesSchema },
  waterConnectionNumber: { type: Number },
  surrounding: { type: surroundingSchema },
  floorsData: { type: floorsDataSchema },
  location: {
    type: {
      lattitude: { type: String },
      longitude: { type: String }
    },
    _id: false
  },
  // uploadPictures :{
  //   type : {
  //     receiptWithSign : {type : String},
  //     ownerInterviewer : {type : String},
  //     IDProof : {type : String},
  //     houseFrontWithNamePlate : {type : String}
  //   },
  //   _id : false
  // }
  receiptWithSign: { type: String },
  ownerInterviewer: { type: String },
  IDProof: { type: String },
  houseFrontWithNamePlate: { type: String },
  isSurveyVerified: { type: Boolean , default : false},
  surveyor: { type: mongoose.Schema.Types.ObjectId, ref: 'Surveyor' },
  totalTaxPaid : {type : Number},
  propertyGroup : {type : String , enum : ["governmentOffices" , "schoolsAndColleges" , "hospitalsAndClinics" , "parksAndRecreation" , "transportHubs" , "localShops"]}
}, { timestamps: true, strict: false });



const generateNumericId = customAlphabet('0123456789', 6);


propertySchema.pre("save",function(next){
  try {

    const currentDate = new Date()

    if (this.isNew){
      // this.createdAt = toIST(currentDate)
      const ppinNumber = generateNumericId()
      this.PPIN = ppinNumber
    }

    // this.updatedAt = toIST(currentDate)
    next()

  } catch (err) {
    handleError({ message: err.message, status: 501, funcName: "propertSchema Model" })
    next(err);
  }
})

// propertySchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function(next){
//   try {

//     const currentDate = new Date();
//     const istNow = toIST(currentDate);
//     this.set({ updatedAt: istNow }); 
//     next();

//   } catch (err) {
//     handleError({ message: err.message, status: 501, funcName: "propertySchema Model" })
//     next(err)
//   }
// })

export const Property = mongoose.model("Property", propertySchema);
