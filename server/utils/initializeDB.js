import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "../models/User.js";

mongoose.connect("mongodb://localhost:27017/security").then(() => {
  console.log("MongoDb is connected");
});

const generateRandomUser = () => {
  return {
    userId: faker.datatype.uuid(),
    userName: faker.internet.userName(),
    telephoneNumber: faker.phone.number(),
    securePassword: faker.internet.password(),
    forgetPasswordOptions: {
      email: faker.datatype.boolean(),
      phoneNumber: faker.datatype.boolean(),
    },
    userRoles: ["user"],
    defaultGeoLocation: faker.location.city(),
    defaultGeoRadius: 30,
    isActive: faker.datatype.boolean(),
  };
};

const seedUsers = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const userData = generateRandomUser();
      const user = new User(userData);
      await user.save();
      console.log(`User ${i + 1} seeded successfully.`);
    }
    console.log("Seeding complete.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
