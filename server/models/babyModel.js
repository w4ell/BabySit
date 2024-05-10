// Import required modules
import mongoose from "mongoose";

const babySchema = new mongoose.Schema({
  babyname: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  birth_date: {
    type: Date,
  },
  parent_name: {
    type: String,
  },
  parent_id: {
    type: String,
  },
  parent_phone: {
    type: String,
  },
  room: {
    type: String,
    default: "1",
  },
});

export default mongoose.model("Baby", babySchema);
