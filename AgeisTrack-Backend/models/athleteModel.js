import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  // reportedCount: {type: Number, required: false, default:0},
  isReported: {type: Boolean, required: false, default:false}
});

// athleteSchema.pre('save', function(next) {
//   this.isReported = this.reportedCount >= 10;
//   next();
// });

export default mongoose.model("athletes", athleteSchema);