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
    const { position, date, start_time, end_time, description } = req.body;

    if (!position || !date || !start_time || !end_time) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newShift = new Shift({
      position,
      date,
      start_time,
      end_time,
      description,
    });

    const savedShift = await newShift.save();

    res.status(201).json(savedShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create shift" });
  }
};


export const assignShift = async (req, res) => {
  const { shiftId } = req.params;

  try {
    // Find the shift by shiftId and update isAssigned to true
    const updatedShift = await Shift.findByIdAndUpdate(
      shiftId,
      { isAssigned: true },
      { new: true }
    );

    if (!updatedShift) {
      return res.status(404).json({ error: 'Shift not found' });
    }

    return res.status(200).json({ success: true, shift: updatedShift });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
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
