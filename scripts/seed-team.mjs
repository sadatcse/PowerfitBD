/* eslint-disable no-console */
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI environment variable is missing.");
  process.exit(1);
}

const teamSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    description: String,
    image: String,
    socials: Object,
    displayOrder: Number,
    status: String,
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

const DEFAULT_TEAM_MEMBERS = [
  {
    name: "MD. FOYJUR RAHMAN MANIK",
    designation: "Senior Trainer",
    description:
      "Specialized in high-intensity strength conditioning, athletic body transformation, and customized training programs.",
    image: "/images/team/manik.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 1,
    status: "active",
  },
  {
    name: "Md. Altaf",
    designation: "Trainer",
    description:
      "Professional strength & hypertrophy trainer focused on form correction, progressive overload, and physical conditioning.",
    image: "/images/team/md-altaf.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 2,
    status: "active",
  },
  {
    name: "Maria Anny",
    designation: "Female Trainer",
    description:
      "Dedicated ladies floor trainer specializing in female strength, weight loss, aerobics, and custom fitness coaching.",
    image: "/images/team/maria-anny.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 3,
    status: "active",
  },
  {
    name: "Karabi Sultana",
    designation: "Female Trainer",
    description:
      "Dedicated female fitness coach specializing in ladies floor workouts, posture, weight management, and personal training.",
    image: "/images/team/karabi-sultana1.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 4,
    status: "active",
  },
  {
    name: "Abdur Rahman",
    designation: "Assistant Trainer",
    description:
      "Attentive assistant trainer supporting members with equipment technique, safety, and daily workout execution.",
    image: "/images/team/abdur-rahman.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 5,
    status: "active",
  },
  {
    name: "Armina Khatun Rupa",
    designation: "Front Desk Officer",
    description:
      "Managing front desk reception, member registrations, package inquiries, and floor hospitality support.",
    image: "/images/team/armina-khatun-rupa.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 6,
    status: "active",
  },
  {
    name: "MD Asif Raihan",
    designation: "Front Desk Officer",
    description:
      "Managing front desk operations, member registrations, package inquiries, and floor hospitality support.",
    image: "/images/team/md-asif-raihan.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 7,
    status: "active",
  },
  {
    name: "MD. SHISIR",
    designation: "Office Assistant",
    description:
      "Ensuring smooth daily floor operations, locker management, facility organization, and prompt member support.",
    image: "/images/team/md-shisir.jpg",
    socials: {},
    displayOrder: 8,
    status: "active",
  },
  {
    name: "MD. SOBAHAN",
    designation: "Office Assistant",
    description:
      "Dedicated facility assistant maintaining clean workout environments, sanitation standards, and operational care.",
    image: "/images/team/md-sobahan.jpg",
    socials: {},
    displayOrder: 9,
    status: "active",
  },
];

async function runSeed() {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(mongoUri);

    const existingCount = await Team.countDocuments();
    if (existingCount > 0) {
      console.log(`MongoDB already contains ${existingCount} team members.`);
    } else {
      console.log("Seeding team members into MongoDB...");
      await Team.insertMany(DEFAULT_TEAM_MEMBERS);
      console.log("Successfully seeded 9 team members into MongoDB database!");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
