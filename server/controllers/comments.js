import Comment from "../models/Comments.js"
import News from "../models/News.js"
import User from "../models/Users.js"
import path, {dirname} from 'path'
import { fileURLToPath } from "url"
import Comments from "../models/Comments.js"

// Create Comment
export const createComment = async (req, res) => {
    try {
        const {commentText, id} = req.body        
        const user = await User.findById(req.userId);
        console.log(commentText)

            const newComment = new Comment({ 
                commentText: commentText ,
                author: req.userId,
                authorName: user.name,
                news:req.params.id
            })

            console.log(newComment)
            await newComment.save()

            console.log(newComment)
                await News.findByIdAndUpdate(req.params.id, {
                    $push: { comments: newComment._id },
                })
        
                await User.findByIdAndUpdate(req.userId, {
                    $push: { comments: newComment._id },
                })
    
            res.json(newComment)
    }     catch (error) {
       res.json({
           message: "Something going wrong"
       })
    }
}

// Get All 