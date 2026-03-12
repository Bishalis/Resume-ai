import mongoose from "mongoose";

const MONGO_DB_URI:string = process.env.MONGO_DB_URI || "";

if (!MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI is not defined in environment variables");
}

async function connectToDatabase() {
    await mongoose.connect(MONGO_DB_URI);
    console.log("Connected to MongoDB");
}

export default connectToDatabase;