import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true },
  shiftTimeStart: { type: String, required: true },
  shiftTimeEnd: { type: String, required: true },
  lunchBreakStart: { type: String },
  lunchBreakEnd: { type: String },
  shiftAddress: { type: String, required: true },
});

const Shift = mongoose.model("Shift", shiftSchema);

export default Shift;
