import News from "../models/News.js";
import User from "../models/Users.js";
import Comment from "../models/Comments.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Categories from "../models/Categories.js";
// Create News
export const createNews = async (req, res) => {
  // console.log(req.usersId)
  try {
    const { title, newsText } = req.body;

    const user = await User.findById(req.userId);
    const category = await Categories.findById(req.categoryId);

    console.log(user)
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
      
      const newNewsWithImage = new News({
        title,
        newsText,
        image: fileName,
        tags: req.body.tags,
        author: req.userId,
        authorName: user.name,
        category: req.body.category,
      });
      await newNewsWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { news: newNewsWithImage },
      });

      console.log("category._id ", req.body.category)

      await Categories.findByIdAndUpdate(req.body.category, {
        $push: { news: newNewsWithImage },
      });

      return res.json(newNewsWithImage);
    }

    const newNewsWithoutImage = new News({
     
      title,
      newsText,
      image: "",
      author: req.userId,
      authorName: user.name,
      category: req.body.category,
      tags: req.body.tags,
    });
    await newNewsWithoutImage.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { news: newNewsWithoutImage },
    });

    await Categories.findByIdAndUpdate(req.body.category, {
      $push: { news: newNewsWithoutImage },
    });

    res.json(newNewsWithoutImage);
  } catch (error) {
    res.json({
      message: "Something going wrong",
    });
  }
};


// Get All News
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort("-createdAt");
    const popularsNews = await News.find().limit(10).sort("-viewsQty");
    if (!news) {
      return res.json({ message: "No News" });
    }
    res.json({ news, popularsNews });
  } catch (error) {
    res.json({ message: "Something going wrong" });
  }
};

// Get News By Id
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, {
      $inc: { viewsQty: 1 },
    });
    res.json(news);
  } catch (error) {
    res.json({ message: "Failed to retrieve news" });
  }
};

// Get News By Users Id
export const getMyNews = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // console.log(user.news())
    const list = await Promise.all(
      user.news.map((news) => {
        return News.findById(news._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Something going wrong" });
  }
};

//Delete News By Users Id and News Id
export const deleteMyNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.json({ message: "This news does not exist" });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { news: req.params.id },
    });

    res.json({ message: "The news has been removed." });
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
};

//Edit News By Users Id and News Id
export const editMyNews = async (req, res) => {
  try {
    const { title, newsText, tags, category, id } = req.body;
    // console.log("backend " + title)
    // console.log("backend " + id)
    const news = await News.findById(id);

    // const { title, newsText, image, tags, id } = req.body;
    // const news = await News.findById(id);
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName))
      news.image = fileName || "";
    }
    news.title = title;
    news.newsText = newsText;
    // news.image = fileName;
    news.tags = tags;
    news.category = category;
    // news.image = image;
    // news.tags =tags;
  
    await news.save();


    res.json(news);
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
};

// Get News Comments
export const getNewsComments = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    const list = await Promise.all(
      news.comments.map((comments) => {
        return Comment.findById(comments._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
};

// Get News By Categories Id
export const getNewsByCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    const news = await News.findById(category);
    
    const list = await Promise.all(
      category.news.map((news) => {
        return News.findById(news._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Something going wrong" });
  }
};
