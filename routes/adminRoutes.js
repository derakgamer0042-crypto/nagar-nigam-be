// adminRoutes.js file
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import dotenv from "dotenv";
dotenv.config();
import Form from "../models/formModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { AddNewProperty } from "../models/addNewProperty.js";
import { ComponentLoader } from "adminjs";
import path from "path";
import { fileURLToPath } from "url";
import { Property } from "../models/formModelV2.js";
import { calculateTax } from "../utils/calculationsBeforeSavingForm.js";
import { Rate } from "../models/rateModel.js";
// import RateModelEdit from '../admin/components/RateModelEdit.jsx'
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import uploadFeature from "@adminjs/upload";
import { Surveyor } from "../models/surveyorModel.js";
import {
  createNewSurveyorDoc,
  updateSurveryorData,
  verifyAdmin,
  verifySurveyById,
} from "../admin/adminUtils/adminUtils.js";
import mongoose from "mongoose";
import { activityLogger } from "../utils/activityLogger.js";
import { mapClassifiedProperty } from "../utils/adminUtils.js";
import { customButton } from "../admin/adminUtils/customButton.js";

console.log("__dirname is : ", __dirname);
console.log("current process.pwd() is : ", process.cwd());

const componentLoader = new ComponentLoader();

// Register your React component
const AdminCustomComponents = {
  FloorEditComponent: componentLoader.add(
    "FloorEdit",
    path.resolve(__dirname, "../admin/components/FloorEdit.jsx")
  ),
  RateModelEditComponent: componentLoader.add(
    "RateModelEdit",
    path.resolve(__dirname, "../admin/components/RateModelEdit.jsx")
  ),
  GetLocationComp: componentLoader.add(
    "GetLocation",
    path.resolve(__dirname, "../admin/components/GetLocation.jsx")
  ),
  // CutomButtonComponent : componentLoader.add(
  //   'CustomPage',
  //   path.resolve(__dirname , "../admin/components/CustomPage.jsx" )
  // )
};

// Register the Mongoose adapter so AdminJS can work with Mongoose models
AdminJS.registerAdapter(AdminJSMongoose);

const buildFloorsData = (payload) => {
  // 	console.log("payload is : " , payload)
    // const floorsData = {
    //   numberOfFloors: Number(payload["floorsData.numberOfFloors"] || 0),
    //   floors: [],
    // };

    // for (let i = 0; i < floorsData.numberOfFloors; i++) {
    //   floorsData.floors.push({
    //     classification: payload[`floorsData.floors.${i}.classification`] || "",
    //     carpetAreaC: payload[`floorsData.floors.${i}.carpetAreaC`] || "",
    //     emptyAreaC: payload[`floorsData.floors.${i}.emptyAreaC`] || "",
    //     carpetAreaR: payload[`floorsData.floors.${i}.carpetAreaR`] || "",
    //     emptyAreaR: payload[`floorsData.floors.${i}.emptyAreaR`] || "",
    //   });
    // }

    // return floorsData;

  const floorsData = {};
  floorsData.numberOfFloors = Number(payload["floorsData.numberOfFloors"]) || 0;
  const NF = floorsData.numberOfFloors;
  const floors = [];

  for (let i = 0; i < NF; i++) {
    const iThFloor = {
      classification: payload[`floorsData.floors.${i}.classification`] || "",
      carpetAreaC: safeNumber(payload[`floorsData.floors.${i}.carpetAreaC`]),
      carpetAreaR: safeNumber(payload[`floorsData.floors.${i}.carpetAreaR`]),
      emptyAreaC: safeNumber(payload[`floorsData.floors.${i}.emptyAreaC`]),
      emptyAreaR: safeNumber(payload[`floorsData.floors.${i}.emptyAreaR`]),
    };
    floors.push(iThFloor);
  }

  floorsData.floors = floors;

  // helper function
  function safeNumber(value) {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }

  return floorsData

};

const adminJs = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: Form,
      options: {
        listProperties: [
          "addNewProperty.assessment1.interviewerName",
          "isEmptyProperty",
          "addNewProperty.assessment1.locality",
          "addNewProperty.assessment1.ownerName",
          // 'addNewProperty.assessment2.numberOfToilets',
        ],
        // actions: {
        // 	new: {
        // 		before: async (request) => {
        // 			console.log("request before : " , request.payload)
        // 			return request
        // 		},
        // 		after: async (response, request, context) => {

        // 			console.log("response is : " , response)
        // 			if (response.record && response.record.errors) {
        // 				// This will make the exact message show in the UI
        // 				if (response.record.errors['ssessment2.assessment2.floorsData.floors']) {
        // 					response.record.errors['ssessment2.assessment2.floorsData.floors'].message =
        // 						'Floors array length must match numberOfFloors'
        // 				}
        // 			}
        // 			console.log("after changes response is : " , response.record.errors)
        // 			return response
        // 		}
        // 	}
        // },
        actions: {
          new: {
            before: async (request) => {
              // console.log('Request payload:', request.payload);
              return request;
            },
          },
          edit: {
            before: async (request) => {
              // console.log('Edit Request payload:', request.payload);
              return request;
            },
          },
        },
        properties: {
          "addNewProperty.assessment2.addFamilyMembers": {
            label: "Add Family Member(s)",
            // Explicitly override all views
            edit: { label: "Add Family Member(s)" },
            list: { label: "Add Family Member(s)" },
            show: { label: "Add Family Member(s)" },
          },
          "addNewProperty.assessment2.addFamilyMembers.male": {
            label: "male",
          },
          "addNewProperty.assessment2.addFamilyMembers.female": {
            label: "female",
          },
          "addNewProperty.assessment2.numberOfToilets": {
            type: "number",
          },
          "addNewProperty.assessment2.floorsData": {
            type: "mixed",
            components: {
              edit: AdminCustomComponents.FloorEditComponent,
            },
          },
        },
      },
    },
    {
      resource: Property,

      // features for uploading the photos using admin js
      features: [
        uploadFeature({
          provider: {
            local: { bucket: path.join(process.cwd(), "uploads") },
          },
          properties: {
            key: "receiptWithSign", // name of the DB field in which the path of the picture is gonna stored
            file: "receiptWithSignFile",
            filePath: "receiptWithSignPath", // 👈 must be unique
            filesToDelete: "receiptWithSignToDelete", // 👈 must be unique
          },
          uploadPath: (record, filename) => {
            const uniqueID = record?.params?._id || "temp";
            return `receiptWithSign/${uniqueID}-${Date.now()}-${filename}`;
          },
          componentLoader,
        }),
        uploadFeature({
          provider: { local: { bucket: path.join(process.cwd(), "uploads") } },
          properties: {
            key: "ownerInterviewer",
            file: "ownerInterviewerFile",
            filePath: "ownerInterviewerPath",
            filesToDelete: "ownerInterviewerToDelete",
          },
          uploadPath: (record, filename) => {
            const uniqueID = record?.params?._id || "temp";
            return `ownerInterviewer/${uniqueID}-${Date.now()}-${filename}`;
          },
          componentLoader,
        }),
        uploadFeature({
          provider: { local: { bucket: path.join(process.cwd(), "uploads") } },
          properties: {
            key: "IDProof",
            file: "IDProofFile",
            filePath: "IDProofPath",
            filesToDelete: "IDProofToDelete",
          },
          uploadPath: (record, filename) => {
            const uniqueID = record?.params?._id || "temp";
            return `IDProof/${uniqueID}-${Date.now()}-${filename}`;
          },
          componentLoader,
        }),
        uploadFeature({
          provider: { local: { bucket: path.join(process.cwd(), "uploads") } },
          properties: {
            key: "houseFrontWithNamePlate",
            file: "houseFrontWithNamePlateFile",
            filePath: "houseFrontWithNamePlatePath",
            filesToDelete: "houseFrontWithNamePlateToDelete",
          },
          uploadPath: (record, filename) => {
            const uniqueID = record?.params?._id || "temp";
            return `houseFrontWithNamePlate/${uniqueID}-${Date.now()}-${filename}`;
          },
          componentLoader,
        }),
      ],
      options: {
        listProperties: [
          "ward",
          "houseNumber",
          "interviewerName",
          "fatherName",
        ],
        actions: {
          new: {
            before: async (request, context) => {
              // console.log('Request payload:', request.payload);
              // now here we have to perform the calculations like calculating the tax and arv and overall
              const roadWidthType = request.payload["roadWidthType"];
              const constructionType = request.payload["constructionType"];
              const propertyType = request.payload["propertyType"];

              //   converting the floors data into object to perform the tax calculations
              const floorsData = buildFloorsData(request.payload);
              const tax = await calculateTax(
                floorsData,
                roadWidthType,
                constructionType,
                propertyType
              );

              request.payload["houseTax"] = tax.houseTax;
              request.payload["waterTax"] = tax.waterTax;
              request.payload["totalTax"] = tax.totalTax;
              request.payload["totalARV"] = tax.totalARV;
              request.payload["taxinfo"] = tax.taxinfo;

              // here we have to store this activity in Activity Logs Model
              const schemaId = request.payload?._id;
              const schemaModel = "Property";
              const message = "New Property is created";
              const event = "INSERTED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              activityLogger(activity);

              //   =========== now store the classified group for this property type , only if the propertyGroup is not filled by surveyor ============
              if(!request.payload.propertyGroup){
                request.payload["propertyGroup"] = mapClassifiedProperty(
                request.payload["propertyType"]
              );
              }

              return request;
            },
            after: async (response, request, context) => {
              let { surveyor: id, isSurveyVerified = false } =
                response.record.params;
              id = new mongoose.Types.ObjectId(id);
              console.log(typeof id);
              console.log(id);

              updateSurveryorData(id, isSurveyVerified);

              return response;
            },
          },
          edit: {
            before: async (request, context) => {
              // console.log("request.payload inside edit.before is :", request.payload);
              // console.log("context in edit before : " , context)

              if (!request.payload._id) return request;

              context.prevIsVerifiedValue =
                context?.record?.params?.isSurveyVerified;

              if (request.payload["floorsData.numberOfFloors"]) {
                const roadWidthType = request.payload["roadWidthType"];
                const constructionType = request.payload["constructionType"];
                const propertyType = request.payload["propertyType"];

                // building floors data into object so that to show the data in edit form..
                const floorsData = buildFloorsData(request.payload);

                // console.log("edit road width data : ", roadWidthType)
                // console.log("edit construction data : ", constructionType)

                // console.log("floors data : " , floorsData)

                const tax = await calculateTax(
                  floorsData,
                  roadWidthType,
                  constructionType,
                  propertyType
                );
                request.payload["houseTax"] = tax.houseTax;
                request.payload["waterTax"] = tax.waterTax;
                request.payload["totalTax"] = tax.totalTax;
                request.payload["totalARV"] = tax.totalARV;
                request.payload["taxinfo"] = tax.taxinfo;

                // Replace flattened fields with nested object
                request.payload.floorsData = floorsData;

                //  removing the dot-notation keys so they don't conflict
                Object.keys(request.payload).forEach((key) => {
                  if (key.startsWith("floorsData.")) {
                    delete request.payload[key];
                  }
                });
              } else {
                console.log("floors data doesn't exist in payload");
              }

              // here we have to store this activity in Activity Logs Model
              const schemaId = request.payload?._id;
              const schemaModel = "Property";
              const message = "Property is Edited";
              const event = "UPDATED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              activityLogger(activity);

              // console.log("after rebuilt the payload is : ", request.payload)
              let propertyGroup = mapClassifiedProperty(
                request.payload["propertyType"]
              );
              console.log("final property group is : ", propertyGroup);
              if (propertyGroup)
                request.payload["propertyGroup"] = propertyGroup;

              return request;
            },
            after: async (response, request, context) => {
              // console.log("response after (before) : " ,response.record.params )

              // console.log("context in after before : " , context)

              if (
                response.record &&
                response.record.params["floorsData.numberOfFloors"]
              ) {
                response.record.params.floorsData = buildFloorsData(
                  response.record.params
                );
              }
              // console.log("response after :  " , response.record.params.floorsData)

              // console.log("inside the propertie's after")
              let { surveyor: id } = response.record.params;
              id = new mongoose.Types.ObjectId(id);
              console.log(typeof id);

              // now lets check if the isVerfied field is being updated or not.?
              const prevIsVerifiedValue = context.prevIsVerifiedValue;
              const newIsVerifiedValue =
                response?.record?.params?.isSurveyVerified;

              console.log("prev value : ", prevIsVerifiedValue);
              console.log("new value : ", newIsVerifiedValue);

              const checks = [undefined, null];

              if (
                !checks.includes(prevIsVerifiedValue) &&
                !checks.includes(newIsVerifiedValue)
              ) {
                if (!prevIsVerifiedValue && newIsVerifiedValue)
                  verifySurveyById(id, 1);
                if (prevIsVerifiedValue && !newIsVerifiedValue)
                  verifySurveyById(id, -1);
              }

              return response;
            },
          },
		  
        },
        properties: {
          // "isSurveyVerified": {
          // 	// isDisabled: ({ currentAdmin }) => !(currentAdmin && currentAdmin.role === 'admin'),
          // 	isDisabled : ()=>{
          // 		alert(JSON.stringify(currentAdmin));
          // 		return false
          // 	}
          // },
          PPIN: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
          floorsData: {
            type: "mixed",
            components: {
              edit: AdminCustomComponents.FloorEditComponent,
            },
          },
          location: {
            components: {
              edit: AdminCustomComponents.GetLocationComp,
			  show: AdminCustomComponents.GetLocationComp
            },
          },
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
          receiptWithSign: { isVisible: false },
          ownerInterviewer: { isVisible: false },
          IDProof: { isVisible: false },
          houseFrontWithNamePlate: { isVisible: false },
        },
      },
    },
    {
      resource: User,
      options: {
        navigation: "Admin Only",
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
            before: async (request) => {
              console.log("payload is : ", request.payload);

              // here we are storing password in hashed way just before saving
              // here updating the password
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: await bcrypt.hash(request.payload.password, 10),
                };
              }

              // here after creating a new document inside the surveyor schema if the role is surveyor
              createNewSurveyorDoc(request.payload).then((res) =>
                console.log(res)
              );

              // here we have to store this activity in Activity Logs Model
              const schemaId = request.payload?._id;
              const schemaModel = "USER";
              const message = "New User is created";
              const event = "INSERTED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              activityLogger(activity);

              return request;
            },
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
            before: async (request, context) => {
              if (!request.payload._id) return request;

              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: await bcrypt.hash(request.payload.password, 10),
                };
              }

              // here we have to store this activity in Activity Logs Model
              const schemaId = request.payload?._id;
              const schemaModel = "USER";
              const message = "New User is created";
              const event = "UPDATED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              activityLogger(activity);

              return request;
            },
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
        },
        properties: {
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
        },
      },
    },
    {
      resource: Surveyor,
      options: {
        navigation: "Admin Only",
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          edit: {
            // isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
            isAccessible: false,
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
        },
        properties: {
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
        },
      },
    },
    {
      resource: Rate,
      options: {
        navigation: "Admin Only",
        actions: {
          // new : {
          // 	before : async(request)=>{
          // 		console.log("🚧 🚧  before saving the document : " , request.payload)
          // 		return request
          // 	},
          // 	after : async(request)=>{
          // 		console.log("🚗 🚗 after saving the document : " , request.payload)
          // 		return request
          // 	}
          // }
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
            before: async (request, context) => {
              // here we have to store this activity in Activity Logs Model

              if (!request.payload._id) return request;

              const schemaId = request.payload?._id;
              const schemaModel = "RATE";
              const message = "New Rate is created";
              const event = "INSERTED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              activityLogger(activity);

              return request;
            },
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
            before: async (request, context) => {
              if (!request.payload._id) return request;
              // here we have to store this activity in Activity Logs Model
              console.log("request payload is : ", request.payload);
              const schemaId = request.payload?._id;
              const schemaModel = "RATE";
              const message = "Rate is Updated";
              const event = "UPDATED";
              const performedBy = context.currentAdmin?.id;
              const { password, ...performedByUserData } = context.currentAdmin;
              console.log("performedByUserData is : ", performedByUserData);

              const activity = {
                schemaId,
                schemaModel,
                message,
                event,
                performedBy,
                performedByUserData,
              };
              console.log("activity is : ", activity);
              activityLogger(activity);

              return request;
            },
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role == "admin",
          },
        },
        properties: {
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
          lessThan9m: {
            components: {
              edit: AdminCustomComponents.RateModelEditComponent,
              show: AdminCustomComponents.RateModelEditComponent,
            },
            custom: { path: "lessThan9m" },
          },
          from9to12m: {
            components: {
              edit: AdminCustomComponents.RateModelEditComponent,
              show: AdminCustomComponents.RateModelEditComponent,
            },
            custom: { path: "from9to12m" },
          },
          from12to24m: {
            components: {
              edit: AdminCustomComponents.RateModelEditComponent,
              show: AdminCustomComponents.RateModelEditComponent,
            },
            custom: { path: "from12to24m" },
          },
          moreThan24m: {
            components: {
              edit: AdminCustomComponents.RateModelEditComponent,
              show: AdminCustomComponents.RateModelEditComponent,
            },
            custom: { path: "moreThan24m" },
          },
        },
      },
    },
  ],
  branding: {
    companyName: "Nagar Nigam",
    softwareBrothers: false,
    logo: false,
  },
  pages : {
    runMyFunction: {
      label : "Run Function",
      handler : customButton,
      component : AdminCustomComponents.CutomButtonComponent
    }
  },
  locale: {
    language: "en",
    translations: {
      en: {
        labels: {
          Rate: "Rate Matrix",
          Property: "Property Records",
          Form: "Forms",
          User: "System Users",
          nagar_nigam: "नगर निगम",
          "Admin Only": "Admin Only",
        },
      },
    },
    i18n: {
      debug: false,
    },
  },
  componentLoader,
  dashboard: null,
});

adminJs.watch();

const ADMIN = {
  email: "admin@gmail.com",
  password: "12345",
};

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  // hardcoded authenticate function
  // authenticate: async (email, password) => {
  // 	console.log('Login attempt:', { email, password });
  // 	if (email && password) {
  // 		if (email === ADMIN.email && password.toString() === ADMIN.password) {
  // 			console.log('Authentication successful');
  // 			return ADMIN;
  // 		}
  // 	}
  // 	console.log('Authentication failed');
  // 	return null;
  // },

  // dynamic authenticate function
  authenticate: async (email, password) => {
    console.log("Login Attempt : ", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login Failed : User not found in DB ❌");
      return null;
    }

    // now lets verify the password of user
    const userPassword = user.password;
    const isPasswordMatching = await bcrypt.compare(password, userPassword);
    if (!isPasswordMatching) {
      console.log("Login Failed : password is wrong ❌");
      return null;
    }

    return {
      name: user.name,
      email,
      role: user.role,
      id: user._id.toString(),
    };
  },
  cookieName: "adminjs",
  cookiePassword: process.env.SECRET_KEY,
});
