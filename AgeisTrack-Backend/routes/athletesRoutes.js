import express from "express";
const athleteRouter = express.Router();

import {  getAllAthletes, getAthleteDetailsByAthleteId, getAllAthletesForInvestigator, reportAthleteById } from "../controllers/athleteController.js";

athleteRouter.get("/get-all-athletes", getAllAthletes);
athleteRouter.post("/get-all-athletes-for-investigaor", getAllAthletesForInvestigator);
athleteRouter.post("/get-athlete-details-by-id", getAthleteDetailsByAthleteId);
// athleteRouter.post("/report-athlete-by-id", reportAthleteById);
athleteRouter.post("/get-all-athletes", getAllAthletes);
// athleteRouter.post("/report-athlete-by-id", reportAthleteById);
// athleteRouter.post("/create-whistleblower-report", createWhistleblowerReport);

export default athleteRouter;
