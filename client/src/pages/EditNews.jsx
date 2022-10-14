import React from "react";
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editMyNews } from '../redux/features/news/singleNewsSlice'

import axios from '../utils/axios'

export const EditNews = () => {
//   const [title, setTitle] = useState('')
//   const [newsText, setNewsText] = useState('')
//   const [oldImage, setOldImage] = useState('')
//   const [newImage, setNewImage] = useState('')
//   const [tags, setTags] = useState('')
//   const[newNews, setNewNews]=useState('');

const [title, setTitle] = useState('');
const [newsText, setNewsText] = useState('');
const [oldImage, setOldImage] = useState('')
const [newImage, setNewImage] = useState('');
const [tags, setTags] = useState('');


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchNews = useCallback(async () => {
      const { data } = await axios.get(`/news/${params.id}`)
      setTitle(data.title)
      setNewsText(data.newsText)
      setOldImage(data.image)
      setTags(data.tags)
  }, [params.id])

  const submitHandler = () => {
      try {
        const updatedNews = new FormData()
          updatedNews.append('id', params.id)
          updatedNews.append('title', title)
          updatedNews.append('newsText', newsText)
          updatedNews.append('image', newImage)
          updatedNews.append('tags', tags)
          dispatch(editMyNews(updatedNews))
          navigate('/news/user/my')
      } catch (error) {
          console.log(error)
      }
  }


  const clearFormHandler = () => {
      setTitle('')
      setNewsText('')
      setTags('')
  }

  useEffect(() => {
      fetchNews()
  }, [fetchNews])

  return (

    <div class="add_a_comment">
    <div class="single_media_title"><h2>Add a News</h2></div>
    <div class="comment_form" >
      <form onSubmit={(e)=> e.preventDefault()}>
                      <div class="form-group">
                        {/* <label>Upload a picture  */}

                        <input type="file"  class="custom-file-input" onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    }}/>
                        {/* </label> */}
                        <div className='flex object-cover py-2'>
          {oldImage && (
                    <img
                        src={`http://localhost:3002/${oldImage}`}
                        alt={oldImage.name}
                    />
                )}
              {newImage && (
                  <img
                      src={URL.createObjectURL(newImage)}
                      alt={newImage.name}
                  />
              )}
          </div>
                      </div>
                      <div class="form-group">
                        <input onChange={(e)=>setTitle(e.target.value)} class="form-control" value={title} type="text" placeholder = 'Title'/>
                        {/* </label> */}
                      </div>
                      <div class="form-group comment">
                      {/* <label>Body  */}

                          <textarea class="form-control" onChange={(e)=>setNewsText(e.target.value)}  value={newsText} placeholder = 'Body of the news'/>
                          {/* </label> */}

                      </div>
                      <div class="form-group comment">
                      {/* <label>Tags  */}
  <input class="form-control" onChange={(e)=>setTags(e.target.value)}value={tags} type="text" placeholder = 'Tags'/>
                      </div>
                     
                      

                      

          <div class="d-flex flex-row gap-2 mt-4">

                    
                        <button  type='submit' onClick={submitHandler} class="btn btn-submit btn-dark"> Update </button>
                        {/* </div>
                        <div class="d-grid gap-2 m-5"> */}
                        <button onClick={clearFormHandler} class="btn btn-submit btn-dark "> Cancel </button>
                        </div>
                  </form>
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
  
  )
}