import mongoose from "mongoose"

const newsSchema = new mongoose.Schema({
    title: { type:String, required: true},
    newsText: {type:String, required: true},
    image: {type:String, default: ''},
    viewsQty: {type:Number, default: 0 },
    createDate: {type:Date,default: Date.now},
    tags: {type: Array,default: []},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    authorName: {type: String},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments",},],
    category: [{type: mongoose.Schema.Types.ObjectId, ref: "Categories",},]
},
{timestamps:true},
)
export default mongoose.model('News', newsSchema)