import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: "news" }],
  },
  { timestamps: true }
);

export default mongoose.model("Categories", CategoriesSchema);
