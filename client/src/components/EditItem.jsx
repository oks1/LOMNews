import React from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit,
    AiFillDelete, } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { deleteMyNews } from '../redux/features/news/singleNewsSlice'
// import { toast } from 'react-toastify'
// import axios from '../utils/axios'

import { useDispatch, useSelector } from 'react-redux'


export const EditItem = ({ news }) => {

    // const { user } = useSelector((state) => state.auth)
    // const params = useParams()
    // const dispatch = useDispatch()
    // const navigate = useNavigate()


    //    const removeNewsHandler = () => {
    //     try {
    //         dispatch(deleteMyNews(news._id))
    //         toast('Пост был удален')
    //         navigate('/news')
    //         console.log(news._id)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    if (!news) {
        return (
            <div className='text-xl text-center py-10'>
                {/* Loading... */}
            </div>
        )
    }


    return (
        <Link  to={`news/${news._id}`} style={{textDecoration: 'none'}}>
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