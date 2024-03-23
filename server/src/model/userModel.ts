import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: String,
    password: String,
    email: String,
    contact: Number,
    img: { url: String, public_id: String },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", schema);
export default userModel;
