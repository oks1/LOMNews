import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        ref: "Roles",
      },
    ],
    avatarURL: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unblock",
    },
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorites",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Users", UsersSchema);
