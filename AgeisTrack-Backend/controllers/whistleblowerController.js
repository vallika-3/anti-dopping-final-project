import WhistleblowerReport from "../models/whistleblowerReportModel.js";
import Athlete from "../models/athleteModel.js";

// Get all whistleblower reports
export const getAllReports = async (req, res) => {
    try {
      const reports = await WhistleblowerReport.find(); // Assuming Mongoose model is used
      res.status(200).json(reports);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching reports" });
    }
  };
  


const createWhistleblowerReport = async (req, res) => {
  const { whistleblowerName, whistleblowerEmail, athleteId, description, attachments } = req.body.data;
  // console.log(req.body);
  // console.log(whistleblowerName, whistleblowerEmail, athleteId, description);
  try {
    if (!whistleblowerName || !whistleblowerEmail || !athleteId || !description) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    // const athlete_details = await Athlete.findById(athleteId);
    // console.log(athlete_details)
    // const athleteName = athlete_details.name;
    const athleteName = athleteId;
    const newReport = new WhistleblowerReport({
      whistleblowerName,
      whistleblowerEmail,
      athleteName,
      description,
      attachments,
    });

    await newReport.save();
    return res.status(201).send({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Error creating whistleblower report:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getAllWhistleblowerReports = async (req, res) => {
  try {
    const reports = await WhistleblowerReport.find();
    if (reports.length === 0) {
      return res.status(404).send({ message: "No reports found" });
    }
    return res.status(200).send(reports);
  } catch (error) {
    console.error("Error fetching whistleblower reports:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export { createWhistleblowerReport, getAllWhistleblowerReports };
