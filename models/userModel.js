import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
	unique : true,
	validate : {
		validator : function(val){
			return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
		},
		message : props => `${props.value} is not a valid email!`
	}
  },
  role: {
    type: String,
    enum: ["admin", "nagar palika official", "surveyor", "viewer"],
    default: "viewer"
  },
  password : {
    type : String,
    required : true
  }
});


// here is the code to hash the password for security
// always keep in mind that keep this before exporting the mongoose schema
userSchema.pre('save' , async function(next){
  if(!this.isModified('password')) return next()

    try{
      const slatRounds = 10
      const hashedPassword  = await bcrypt.hash(this.password , slatRounds);
      this.password = hashedPassword
      next();
    }catch(err){
      next(err);
    }
  
})

const User = mongoose.model("User", userSchema); // Capitalized model name
export default User;


