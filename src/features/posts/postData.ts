import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
type Post ={
  id: number | null
  title: string
  body: string
  userId: number | null
}
type InitialState={
  loading: boolean
  post: Post
  error: string
}
const initialState: InitialState = {
  loading: false,
  post: {id: null, title: "",
    body: "",
    userId: null},
  error: ''
}

export const fetchSinglePost = createAsyncThunk('post/fetchSinglePost', (id: string | undefined) => {
  
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
})


export const editPost = createAsyncThunk('posts/editPost', (id: string | undefined) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
 
 })

 export const updatePost = createAsyncThunk('posts/updatePost', (values: Post) => {
 
  return axios
  .patch(`https://jsonplaceholder.typicode.com/posts/${1}`,values )
  .then(response => response.data)
 
 })

const postData = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSinglePost.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
      console.log(action)
      state.loading = false
      state.post = action.payload
      state.error = ''
    })
    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      state.loading = false
      state.post = {id: null, title: "",
      body: "",
      userId: null}
      state.error = action.error.message || 'Something went wrong'
    })

    builder.addCase(editPost.pending, state => {
      state.loading = true
    })
    builder.addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.loading = false
      state.post = action.payload
      state.error = ''
    })
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false
      state.post = {id: null, title: "",
      body: "",
      userId: null}
      state.error = action.error.message || 'Something went wrong'
    })


    builder.addCase(updatePost.pending, state => {
      state.loading = true
    })
    builder.addCase(updatePost.fulfilled, (state , action: PayloadAction<Post>) => {
      const data: Post = {id: action.payload.id, title: action.payload.title, body: action.payload.body, userId:action.payload.userId };
      
      state.loading = false
      state.post = data
      console.log(data)
      state.error = ''
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false
      state.post = {id: null, title: "",
      body: "",
      userId: null}
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default postData.reducer
