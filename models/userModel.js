import mongoose from "mongoose";
import bcrypt from "bcrypt"
// import { toIST } from "../utils/dateUtils.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  role: {
    type: String,
    enum: ["admin", "nagar palika official", "surveyor", "viewer"],
    default: "viewer"
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });


// here is the code to hash the password for security
// always keep in mind that keep this before exporting the mongoose schema

// userSchema.pre('save', async function (next) {

//   // here converting the createdAt and updatedAt field in IST
//   if (this.isNew) {
//     // changing the createdAt only when the document is created for the first time..
//     // this.createdAt = toIST(new Date())
//   } 
//   // upadting the updatedAt on every save
//   // this.updatedAt = toIST(new Date())

//   if (!this.isModified('password')) return next()

//   try {
//     const saltRounds = 10
//     const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//     this.password = hashedPassword
//   } catch (err) {
//     next(err);
//   }

//   next()

// })


// // handling the update cases , this is a query middleware hook , triggered when updating or making changes on documents using any of these methods
// userSchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function (next) {
//   // 'this' refers to the query
//   const istNow = toIST(new Date());
//   this.set({ updatedAt: istNow }); // automatically updates timestamp
//   next();
// });


const User = mongoose.model("User", userSchema); // Capitalized model name
export default User;


