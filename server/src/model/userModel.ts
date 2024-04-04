import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: { type: String, default: "" },
    password: { type: String, default: "" },
    email: { type: String, default: "" },
    contact: { type: Number, default: 0},
    img: { url: String, public_id: String },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", schema);
export default userModel;
