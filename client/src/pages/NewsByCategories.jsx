import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NewsItem } from '../components/NewsItem'
import axios from '../utils/axios'
import { useParams } from 'react-router-dom'


export const NewsByCategories = () => {

    const params = useParams()

    const [news, setCategoryNews] = useState([])

    const fetchCategoryNews = async () => {
        try {
            const { data } = await axios.get(`/news/category/${params.id}`)
            setCategoryNews(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategoryNews()
    }, [])

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {news?.map((news, idx) => (
                <NewsItem news={news} key={idx} />             
         
            ))}
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