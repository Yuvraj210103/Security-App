import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  position: {
    type: String,
    enum: ["supervisor", "guard", "other"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const Shift = mongoose.model("Shift", shiftSchema);

export default Shift;
