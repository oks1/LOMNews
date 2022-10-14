import { Router } from "express";
import { createComment } from "../controllers/comments.js";
import { checkAuth } from "../utils/checkAuth.js";
import { newsValidation, newsValidationResult} from "../validators/newsValidation.js";
import { roleMiddleware} from "../utils/roleMiddleware.js";



const router = new Router();

// Create Comment
//http://localhost:3002/api/comments/:id
// router.post("/:id", checkAuth, createComment);
router.post("/:id",  checkAuth, createComment);


// Get All News
//http://localhost:3002/api/news
// router.get('/', getAllNews);

//Get News By Id
//http://localhost:3002/api/news/:id
// router.get('/:id', getNewsById);

//Get News By Users Id
//http://localhost:3002/api/news/user/my
// router.get('/user/my', checkAuth, getMyNews);

//Delete News By Users Id and News Id
//http://localhost:3002/api/news/user/my/delete/:id
// router.delete('/user/my/delete/:id', checkAuth, deleteMyNews);

//Edit News By Users Id and News Id
//http://localhost:3002/api/news/user/my/edit/:id
// router.put('/user/my/edit/:id', checkAuth, editMyNews);
export default router;

