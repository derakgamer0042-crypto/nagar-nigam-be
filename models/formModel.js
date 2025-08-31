import mongoose from "mongoose";
import {addNewProperty} from './addNewProperty.js'

const formSchema = new mongoose.Schema({

	ward : {
		type : String,
	},
	locality : {
		type : String
	},
	houseNumber : {
		type : String
	},
	isEmptyProperty : {
		type : Boolean
	},
	addNewProperty : {
		type : addNewProperty,
		_id : false
	}
});

const Form = mongoose.model("Form", formSchema); // Capitalized model name
export default Form;
