import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postSlice'
import commentReducer from '../features/comments/commentSlice'
import postData from '../features/posts/postData'
const store = configureStore({
  reducer: {
   
    posts: postReducer,
    post: postData,
    comments: commentReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
