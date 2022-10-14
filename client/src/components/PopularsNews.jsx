import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'


export const PopularsNews = ({ news }) => {
    return (
        <Link to={`/`+`news/${news._id}`} style={{textDecoration: 'none'}}> 
        <div className='d-flex flex-row pop_news'>
            
            <div className='col-4'> {news.image && (
                        <img width="50px" src={`http://localhost:3002/${news.image}`}
                            alt='img'
                        />)}
                
                </div>
                <div className='col-8'>
                    <p class="text-body fs-6">{news.title}</p>
                <p class="text-muted">{news.authorName}</p>
                
                </div>
                    
   
        </div>
        </Link>
    )
}