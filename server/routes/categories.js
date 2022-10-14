import Router from "express";
import Categories from "../models/Categories.js";

const router = new Router();
router.post("/", async (req, res) => {
  const newCat = new Categories(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const cats = await Categories.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// router.get("/", async (req, res) => {
//     try {
//       const cats = await find();
//       res.status(200).json(cats);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

export default router;