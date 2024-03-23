import mongoose from "mongoose";
export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(error);
  }
}
