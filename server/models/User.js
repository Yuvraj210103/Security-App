import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name should be at least 2 characters long"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name should be at least 2 characters long"],
  },
  phone_number: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number should be at least 10 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (v) => {
        return /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/.test(v);
      },
      message: "Invalid email",
    },
  },
  role: {
    type: String,
    enum: ["supervisor", "guard", "admin", "other"],
    default: "supervisor",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
