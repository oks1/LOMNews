import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    role: {
        type: String,
        // required: true,
        unique: true,
        default: "User",
      },
}
// { timestamps: true }
);

export default mongoose.model("Roles", RolesSchema);