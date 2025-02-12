import mongoose from "mongoose";

const whistleblowerReportSchema = new mongoose.Schema({
  whistleblowerName: { type: String, required: true },
  whistleblowerEmail: { type: String, required: true },
  athleteName: { type: String, required: true },
  description: { type: String, required: true },
  attachments: [{ type: String }], // URLs of uploaded files or images
  reportedDate: { type: Date, default: Date.now },
});

export default mongoose.model("WhistleblowerReport", whistleblowerReportSchema);
