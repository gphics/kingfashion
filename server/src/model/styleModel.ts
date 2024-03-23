import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    images: [],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
  },
  { timestamps: true },
);
const styleModel = mongoose.model("styles", schema);

export default styleModel;
