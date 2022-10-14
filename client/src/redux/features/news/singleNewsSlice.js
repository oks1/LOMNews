import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js';

const initialState = {
    news: [],
    popularsNews: [],
    loading: false,
}

export const createNews = createAsyncThunk(
    'news/createNews',
    async (params) => {
        try {
            const { data } = await axios.post('/news', params)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllNews = createAsyncThunk(
    'news/getAllNews', 
    async () => {
    try {
        const { data } = await axios.get('/news')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getMyNews = createAsyncThunk(
    'news/getMyNews', 
    async (id) => {
    try {
        const { data } = await axios.get(`/news/user${id}/$my`)
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const editMyNews = createAsyncThunk(
    'news/editMyNews',
    async (updatedNews) => {
        try {
            const { data } = await axios.patch(`/news/user/my/edit/${updatedNews.id}`,
             updatedNews, )

            return data
            
        } catch (error) {
            console.log(error)
        }
    },
)

export const deleteMyNews = createAsyncThunk(
    'news/deleteMyNews', 
    async (id) => {
    try {
        const { data } = await axios.delete(`/news/user/my/delete/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const singleNewsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: {
        // Create news
        [createNews.pending]: (state) => {
            state.loading = true
        },
        [createNews.fulfilled]: (state, action) => {
            state.loading = false
            state.news.push(action.payload)
        },
        [createNews.rejected]: (state) => {
            state.loading = false
        },
        // Get all news
        [getAllNews.pending]: (state) => {
            state.loading = true
        },
        [getAllNews.fulfilled]: (state, action) => {
            state.loading = false
            state.news = action.payload.news
            state.popularsNews = action.payload.popularsNews
        },
        [getAllNews.rejected]: (state) => {
            state.loading = false
        },

        // Get my news
        [getMyNews.pending]: (state) => {
            state.loading = true
        },
        [getMyNews.fulfilled]: (state, action) => {
            state.loading = false
            state.news = action.payload.news
            state.popularsNews = action.payload.popularsNews
        },
        [getMyNews.rejected]: (state) => {
            state.loading = false
        },

        // Update news
        [editMyNews.pending]: (state) => {
            state.loading = true
        },
        [editMyNews.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.news.findIndex(
            (news) => news._id === action.payload._id,
            )
            state.news[index] = action.payload
                 
        //  const datapayload = Array.from(action.payload);
        //   console.log("datapayload " , datapayload);
        },
        [editMyNews.rejected]: (state) => {
            state.loading = false
        },

        // Deleting news
        [deleteMyNews.pending]: (state) => {
            state.loading = true
        },
        [deleteMyNews.fulfilled]: (state, action) => {
            state.loading = false
            state.news = state.news.filter(
                (news) => news._id !== action.payload._id,
            )
        },
        [deleteMyNews.rejected]: (state) => {
            state.loading = false
        },

    },
})

export default singleNewsSlice.reducer