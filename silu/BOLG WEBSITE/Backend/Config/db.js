import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: "./.env" });

const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI);
        console.log("Database Connection Successful!!!");
    } catch (err) {
        console.log('Error during database connection : ' + err.message);
        process.exit(1);
    }
}

export default connectDB;
