import Shift from "../models/Shift.js";

export const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({});
    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve shifts" });
  }
};

export const getShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({ error: "Shift not found" });
    }

    res.json(shift);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve shift" });
  }
};

export const addShift = async (req, res) => {
  try {
    const {
      shiftName,
      shiftTimeStart,
      shiftTimeEnd,
      lunchBreakStart,
      lunchBreakEnd,
      shiftAddress,
    } = req.body;

    if (!shiftName || !shiftTimeStart || !shiftTimeEnd || !shiftAddress) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newShift = new Shift({
      shiftName,
      shiftTimeStart,
      shiftTimeEnd,
      lunchBreakStart,
      lunchBreakEnd,
      shiftAddress,
    });

    const savedShift = await newShift.save();

    res.status(201).json(savedShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create shift" });
  }
};


export const modifyShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const {
      shiftName,
      shiftTimeStart,
      shiftTimeEnd,
      lunchBreakStart,
      lunchBreakEnd,
    } = req.body;

    const updatedShift = await Shift.findByIdAndUpdate(
      shiftId,
      {
        $set: {
          shiftName: shiftName,
          shiftTimeStart: shiftTimeStart,
          shiftTimeEnd: shiftTimeEnd,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedShift) {
      return res.status(404).json({ error: "Shift not found" });
    }

    res.json(updatedShift);
  } catch (err) {
    console.error(err.message);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).json({ error: "Validation failed", errors });
    } else {
      res.status(500).json({ error: "Failed to update shift" });
    }
  }
};


export const deactivateShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const deactivatedShift = await Shift.findByIdAndDelete(shiftId);

    if (!deactivatedShift) {
      return res.status(404).json({ error: "Shift not found" });
    }

    res.json({ message: "Shift deactivated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to deactivate shift" });
  }
};
