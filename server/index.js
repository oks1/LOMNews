import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from 'express-fileupload';
import authRoute from "./routes/auth.js";
import newsRoute from "./routes/news.js"
import commentsRoute from "./routes/comment.js"
import categoryRoute from "./routes/categories.js"



const app = express();
dotenv.config();

// Constants
const port = process.env.PORT || 3002;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;



// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));


//Routes
//http://localhost:3002
app.use("/api/auth", authRoute);
app.use("/api/news", newsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/categories", categoryRoute);

app.get("/", (req, res) => {
  return res.json({ message: "All is fine!" });
});




async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.5rhohrz.mongodb.net/${dbName}?retryWrites=true&w=majority`
      // 'mongodb+srv://Myrzagul:MA1234@cluster0.5rhohrz.mongodb.net/lomnews?retryWrites=true&w=majority'
    );

    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
