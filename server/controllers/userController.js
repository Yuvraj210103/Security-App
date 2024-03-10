import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await User.findById(userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, role } = req.body;
    if (!first_name || !last_name || !phone_number || !email) {
      return res.status(400).json({
        error:
          "First name, last name, phone number, and email are required fields.",
      });
    }
    const newUser = new User({
      first_name,
      last_name,
      phone_number,
      email,
      role: role || "supervisor",
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, email, phoneNumber, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ error: "userName, email, and password are required fields." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: {
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      },
      runValidators: true,
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};
