import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

const categoryModel = mongoose.model("categories", schema);

export default categoryModel;
