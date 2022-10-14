import React from "react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getNewsComments} from '../redux/features/comments/commentsSlice.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "../utils/axios.js";
import { useLocation} from "react-router"
import { CommentItem } from "../components/CommentItem";
import { PopularsNews } from '../components/PopularsNews'
import {  getAllNews } from '../redux/features/news/singleNewsSlice'
import { AiTwotoneEdit,
  AiFillDelete, } from 'react-icons/ai'
  import { deleteMyNews } from '../redux/features/news/singleNewsSlice'
  import { toast } from 'react-toastify'

export const NewsRead = () => {

  const navigate = useNavigate()


  const location = useLocation();
  var path = location.pathname.split("/")[2];
  const [news, setNews] = useState({})
  const [commentText, setCommentText] = useState('')
  const { comments } = useSelector((state) => state.comment)
  const params = useParams()
  const dispatch = useDispatch()
  const { popularsNews} = useSelector((state) =>state.news)
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
      dispatch(getAllNews())
  }, [dispatch])

  const removeNewsHandler = () => {
    try {
        dispatch(deleteMyNews(news._id))
        toast('Successfully deleted news')
        navigate('/news/user/my')
        // console.log(news._id)
    } catch (error) {
        console.log(error)
    }
}


  // console.log(location)
  useEffect (() => {
    const getNews = async () => {
      const res = await axios.get("/news/" + path)
      setNews(res.data)
    }
    getNews()
  },[path])

//  console.log(comments)
//  console.log( comments.commentText)

 
  
  const handleSubmit = () => {
    try {
        const newsId = params.id
        dispatch(createComment({ newsId, commentText }))
        setCommentText('')
    } catch (error) {
        console.log(error)
    }
}
  const fetchComments = useCallback(async () => {
    try {
        dispatch(getNewsComments(params.id))
    } catch (error) {
        console.log(error)
    }
}, [params.id, dispatch])


useEffect(() => {
  fetchComments()
}, [fetchComments])

return (
  <div className="container">
    <div className="row">
      <div className="col-md-9">
        <div className="item feature_news_item"> 
           {news.image && 
           <img
          src={`http://localhost:3002/${news.image}`}
          alt=''
           className='newsReadImg'
          />}
        </div>
          <div className="item_wrapper">
						<div className="news_item_title text-decoration-none">
							<h2>{news.title}</h2> 
            </div>
            <div className="item_meta">{new Date(news.createDate).toDateString()} by:{news.authorName} </div>
            <div className="item_content">
              <p>{news.newsText}</p>
						</div>
            <div className="category_list">
              <a href="#">{news.tags}</a>
            </div>

            {/* Edit button */}

            {user?._id === news.author && (
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-dark opacity-50'>
                                    <Link to={`/edit/${params.id}`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removeNewsHandler}
                                    className='flex items-center justify-center gap-2  text-dark opacity-50'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )} 

                        

        </div> 
        <div className="readers_comment">
         {comments.map( comment=> <CommentItem key={comment._id} comment={comment} />
                   )} 
       
                <div className="media">
							<div className="media-left">
								{/* <img alt="64x64" className="media-object" data-src=""
										 src="" data-holder-rendered="true"/> */}
                            {/* {comments.map(comment => <div>{comment.dtWhen}</div>)} */}
							</div>
							<div className="media-body">
								<h2 className="media-heading">
                {/* {comments.map(comment => <div>{comment.commentText}</div>)} */}
                 {/* {comments?.map((cmt)=>  */}
                    {/* // <CommentItem key ={cmt._id} cmt={cmt}/> */}
                    {/* /* {comments} */}
                  
               
                                </h2>
							</div>
        </div> 
        
        <div className="add_a_comment">
						<div className="single_media_title"><h2>Add a Comment</h2></div>
						<div className="comment_form">
              <form onSubmit={e => e.preventDefault()}>
              <div className="form-group comment">
                <textarea className="form-control" id="inputComment" placeholder="Comment"
                value={commentText} onChange = {(e) => setCommentText (e.target.value)}></textarea>
	              </div>
	              
	            </form>
              <button type="submit" className="btn btn-submit red" onClick={handleSubmit}>Submit</button>
            </div>
					</div>
      </div>
      
     
      </div>
      <div class="col-md-3">
          <div class="item_caregory red"><h6 class="text-light">Popular news</h6></div>
								<div class="news_area">
                {popularsNews?.map((news, idx) => (
                      <PopularsNews key={idx} news={news} />
                   ))}
			
								</div>	

							</div>

						{/* </div>
            </div> */}
    </div>
    <div class="copyright-section footer_section section_wrapper section_wrapper">
         <div class="container-fluid">
           <div class="row">
             <div class="col-md-3">
             </div>
             <div class="col-md-7">
               <div class="copyright">
               © Copyright 2022 - LOMNEWS. Developed by: Liutsiia, Oxana, Myrzagul</div>
             </div>
             <div class="col-md-2">
             </div>
           </div>
         </div>
       </div>
  </div>
  
  )};
