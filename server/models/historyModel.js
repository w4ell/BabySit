// Import required modules
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  babyname: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  deleteDate: {
    type: Date,
    default: Date.now(),
  },
  reason: {
    type: String,
  },
});

export default mongoose.model("History", historySchema);
