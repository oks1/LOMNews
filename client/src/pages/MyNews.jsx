import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { EditItem } from '../components/EditItem'
import { PopularsNews } from '../components/PopularsNews'
import { useDispatch, useSelector } from 'react-redux'


import axios from '../utils/axios'
import { AiTwotoneEdit,
    AiFillDelete, } from 'react-icons/ai'
   
export const MyNews = () => {
    const [news, setMyNews] = useState([])
    const { popularsNews} = useSelector((state) =>state.news)
    const fetchMyNews = async () => {
        try {
            const { data } = await axios.get('/news/user/my')
            setMyNews(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyNews()
    }, [fetchMyNews])

    return (
      
   
   <div class="row">
       <div class="col-md-9">
   <div class="item_caregory red"><h2 class="text-light">My news</h2></div>
           <div class="news_area">
               <div id="featured-news-carousal" class="carousel slide" data-ride="carousel">
                   
                   <div class="carousel-inner" role="listbox">					    
                       <div class="item active feature_news_item">
           
                           <div class="item_wrapper pt-3">
           
                           {news?.map((news, idx) => (
                <EditItem news={news} key={idx} />  
              ))}
              
              
       
                           </div>	

                       </div>

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