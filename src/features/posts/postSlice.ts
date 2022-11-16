import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
type Post ={
    id: number
    title: string
    body: string
    userId: number
}

type InitialState={
  loading: boolean
  posts: Post[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  posts: [],
  error: ''
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data)
})

export const deletePost = createAsyncThunk('post/deletePost', (id: number) => {
 
  try {
    return axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(()=> ({id}))
  } catch (error) {
    alert(error)
  }
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost : (state, action) => {
      var data = action.payload.values
      state.loading = false
      state.posts.push(data);
      state.error = ''
      console.log(data)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload;
      state.error = ''
     
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false
      state.posts = []
      state.error = action.error.message || 'something went wrong'
    })

    builder.addCase(deletePost.pending, state => {
      state.loading = true
    })
    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<{id: number} | undefined> ) => {
      state.loading = false
      state.posts.splice(state.posts.findIndex(item => item.id === action?.payload?.id), 1);
      state.error = ''
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false
      state.posts= []
      state.error = action.error.message || 'something went wrong'
    })


  }
})

export default postSlice.reducer
export const { createPost } = postSlice.actions