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

async function dedupeTeam() {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(mongoUri);

    const allMembers = await Team.find({}).sort({ createdAt: 1 }).lean();
    console.log(`Total team member records in DB: ${allMembers.length}`);

    const seenNames = new Set();
    const idsToDelete = [];
    const uniqueMembers = [];

    for (const member of allMembers) {
      const normalizedName = (member.name || "").trim().toLowerCase();
      if (seenNames.has(normalizedName)) {
        idsToDelete.push(member._id);
        console.log(`Found duplicate record for: "${member.name}" (ID: ${member._id})`);
      } else {
        seenNames.add(normalizedName);
        uniqueMembers.push(member);
      }
    }

    if (idsToDelete.length > 0) {
      console.log(`Deleting ${idsToDelete.length} duplicate team member records...`);
      await Team.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`Cleaned up duplicates! Total unique team members remaining: ${uniqueMembers.length}`);
    } else {
      console.log("No duplicate team member records found. All records are unique!");
    }
  } catch (err) {
    console.error("Deduplication error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

dedupeTeam();
