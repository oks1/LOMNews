import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const NewsItem = ({ news }) => {

const navigate = useNavigate();

    if (!news) {
        return (
            <div className='text-xl text-center py-10 '>
                {/* Loading... */}
            </div>
        )
    }

   
    return (

        <Link  to={`/`+`news/${news._id}`} style={{textDecoration: 'none'}}>
            <div className='flex flex-col basis-1/4 flex-grow mb-5 m-5 news_container p-3'>
                <div
                    className={
                        news.image? 'flex rouded-sm h-80' : 'm-3'
                    }
                >
                    {news.image && (
                        <img
                            src={`http://localhost:3002/${news.image}`}
                            alt='img'
                        />
                    )}
                </div>
                <h2 text-decoration-none>{news.title}</h2>
                <div className='flex justify-between items-center pt-2'>
                                       <div className='text-muted pb-2'>
                        <Moment date={news.createdAt} format='D MMM YYYY'  />,  by :  {news.authorName}
                    </div>
                </div>
                
                <p className=' text-body fs-5'>
                    {/* {(news.newsText).substr(0,300)}... */}
                    {news.newsText}
                </p>

                <div className='flex gap-3 items-center pb-5'>
                    <button className='flex items-center justify-center gap-2 text-xs opacity-50'>
                        <AiFillEye /> <span>{news.viewsQty}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs  opacity-50 '>
                        <AiOutlineMessage />{' '}
                        <span>{news.comments?.length || 0} </span>
                    </button>
                </div>
            </div>
        </Link>
    )
}