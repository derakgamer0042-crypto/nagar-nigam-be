

import express from "express"
import {protect} from "../middlewares/protect.js"
import { getSurveyorDataForRecord } from "../controllers/adminDashboardController.js";

export const router = express.Router();

// this is the middleware to allow only signedin users
// router.use(protect)

// additional middleware to allow only admins
// router.use(adminOnly)



router.post("/surveyor-info" , getSurveyorDataForRecord)

