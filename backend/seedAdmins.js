import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { User } from "./models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "./config.env") });

// Admin details come from the environment so no credentials live in git.
// See config.env.example for the full list.
const REQUIRED = [
  "MONGO_URI",
  "ADMIN_FIRST_NAME",
  "ADMIN_LAST_NAME",
  "ADMIN_EMAIL",
  "ADMIN_PHONE",
  "ADMIN_NIC",
  "ADMIN_DOB",
  "ADMIN_GENDER",
  "ADMIN_PASSWORD",
];

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`Seed failed: missing ${missing.join(", ")}`);
  process.exit(1);
}

const admin = {
  firstName: process.env.ADMIN_FIRST_NAME,
  lastName: process.env.ADMIN_LAST_NAME,
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE,
  nic: process.env.ADMIN_NIC,
  dob: new Date(process.env.ADMIN_DOB),
  gender: process.env.ADMIN_GENDER,
  password: process.env.ADMIN_PASSWORD,
  role: "Admin",
};

async function seedAdmin() {
  let exitCode = 0;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM_DEPLOYED",
    });

    if (await User.findOne({ email: admin.email })) {
      console.log("Admin already exists");
    } else {
      await User.create(admin);
      console.log("Admin created");
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
    exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(exitCode);
  }
}

seedAdmin();
