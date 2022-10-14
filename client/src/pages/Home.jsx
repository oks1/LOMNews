import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularsNews } from '../components/PopularsNews'
import { NewsItem } from '../components/NewsItem'
import {  getAllNews } from '../redux/features/news/singleNewsSlice'
import "../index.css"

export const Home = () => {

  const dispatch = useDispatch()
  const { news, popularsNews} = useSelector((state) =>state.news)
 

  const formEntries = Array.from(popularsNews.entries());
  // console.log("formEntries " , formEntries);
  
  
  useEffect(() => {
      dispatch(getAllNews())
  }, [dispatch])

  if (!news.length) {
      return (
          <div className='text-center py-10'>
              No news yet.
          </div>
      )
  }

  return (
<body>
   
	    <div class="row">
	    	<div class="col-md-9">
        <div class="item_caregory red"><h2 class="text-light">Latest news</h2></div>
	    		<div class="news_area">
					<div id="featured-news-carousal" class="carousel slide" data-ride="carousel">
					    
						<div class="carousel-inner" role="listbox">					    
							<div class="item active feature_news_item">
                
								<div class="item_wrapper pt-3">
                
                {news?.map((news, idx) => ( 
                        <NewsItem key={idx} news={news} />
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

							// </div>

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
       </body>

  )
}