import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({ newsId, commentText }) => {
        try {
            // const { data } = await axios.post(`/comments/${newsId}`, params)
            const { data } = await axios.post(`/comments/${newsId}`, {
                newsId,
                commentText,
            })
            // console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)


export const getNewsComments = createAsyncThunk(
    'comment/getNewsComments',
    async (newsId) => {
        try {
            const { data } = await axios.get(`/news/comments/${newsId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        // Получение комментов
        [getNewsComments.pending]: (state) => {
            state.loading = true
        },
        [getNewsComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getNewsComments.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default commentSlice.reducer