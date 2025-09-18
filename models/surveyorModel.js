import mongoose from "mongoose";
// import { toIST } from "../utils/dateUtils.js";
import { customAlphabet } from "nanoid"

const surveyorDataSchema = new mongoose.Schema({
  surveyorId : {type : String},
  name: { type: String },
  email: { type: String },
  lastSurveyDoneOn: { type: Date },
  totalSurveyDone: { type: Number, default: 0 },
  totalSuccessfulSurvey: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  isSurveyorActive : {type : Boolean , default : true},
}, { timestamps: true });


// here defining the custom methods on this schema to update the successRate
surveyorDataSchema.methods.updateSuccessRate = function() {

  if (this.totalSurveyDone > 0) this.successRate = (this.totalSuccessfulSurvey / this.totalSurveyDone) * 100;
  else this.successRate = 0;

}

const generateNumericId = customAlphabet('0123456789', 6);

// Pre-save middleware
surveyorDataSchema.pre("save", function(next) {
  try {

    // const currentDate = new Date();

    // converting the date into IST format from UTC format
    if (this.isNew) {
      // this.createdAt = toIST(currentDate);
      this.surveyorId = `SUR-${generateNumericId()}`
    }
    // this.updatedAt = toIST(currentDate)

    next();
  } catch (err) {
    console.log("[ERROR] while running pre-save for surveyorData:", err.message);
    next(err);
  }
});


// update middleware
// surveyorDataSchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function(next) {

//   const currentDate = new Date();
//   // 'this' refers to the query
//   const istNow = toIST(currentDate);
//   this.set({ updatedAt: istNow }); // automatically updates timestamp
//   next();
// });


export const Surveyor = mongoose.model("Surveyor", surveyorDataSchema);
