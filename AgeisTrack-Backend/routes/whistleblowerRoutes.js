import express from "express";
import { createWhistleblowerReport, getAllWhistleblowerReports } from "../controllers/whistleblowerController.js";

const whistleblowerRouter = express.Router();

whistleblowerRouter.post("/create-report", createWhistleblowerReport);
whistleblowerRouter.get("/get-all-reports", getAllWhistleblowerReports);

export default whistleblowerRouter;
