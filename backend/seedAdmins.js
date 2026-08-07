import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { User } from "./models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "./config.env") });

const admins = [
  {
    firstName: "Chaithu",
    lastName: "Admin",
    email: "chaithu@gmail.com",
    phone: "98765432101",
    nic: "1234567890123",
    dob: new Date("1995-01-15"),
    gender: "Male",
    password: "12345678",
    role: "Admin",
  },
  {
    firstName: "Sai",
    lastName: "Admin",
    email: "sai@gmail.com",
    phone: "98765432102",
    nic: "1234567890124",
    dob: new Date("1996-06-20"),
    gender: "Male",
    password: "12345678",
    role: "Admin",
  },
];

async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM_DEPLOYED",
    });
    console.log("Connected to MongoDB");

    for (const admin of admins) {
      const existing = await User.findOne({ email: admin.email });
      if (existing) {
        console.log(`Admin already exists: ${admin.email}`);
        continue;
      }
      await User.create(admin);
      console.log(`Admin created: ${admin.email}`);
    }

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmins();
