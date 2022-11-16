import axios from 'axios'
import { createSlice, createAsyncThunk , PayloadAction} from '@reduxjs/toolkit'

type Comment={
  id: number | null
  name: string
  email: string
  body: string
  postId: number | null
}
type editComment ={
  Id: string | undefined
  PostId: string | undefined
}

type InitialState={
loading: boolean
comments: Comment[]
comment: Comment
error: string
}

const initialState: InitialState = {
  loading: false,
  comments: [],
  comment: {
    id: null ,
    name: "",
    email: "",
    body:  "",
    postId: null
  },
  error: ''
}

export const fetchComments = createAsyncThunk('user/fetchComments', (id: string | undefined ) => {
 
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => response.data)
})

export const editComments = createAsyncThunk('comments/editComments', (id: editComment) => {
  console.log("POST id", id.PostId)
  return axios
  .get(`https://jsonplaceholder.typicode.com/posts/${id.PostId}/comments`)
    .then( response => response.data)
 
 })

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment : (state, action) => {
      var data = action.payload.values
      state.loading = false
      state.comments.push(data);
      state.error = ''
    },
    deleteComment : (state, action) => {
      state.loading = false
      state.comments.splice(state.comments.findIndex(item => item.id === action.payload.id), 1);
      state.error = ''
    },

    updateComment : (state, action: PayloadAction<Comment>)=> {
     
      var data: Comment[]= [{id: action.payload.id, name: action.payload.name, email: action.payload.email, body:action.payload.body,  postId: action.payload.postId}];
      state.loading = false
      state.comments = data
      console.log(data)
      state.error = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      state.loading = false
      state.comments = action.payload
      state.error = ''
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false
      state.comments = []
      state.error = action.error.message || ""
    })


    builder.addCase(editComments.pending, state => {
     
      state.loading = true
    })
    builder.addCase(editComments.fulfilled, (state, action: PayloadAction<Comment[]> | any  ) => {
      
      state.loading = false
      state.comments = action.payload
      let data = state.comments.findIndex(item => item.id == action.meta.arg.Id)
      console.log("data", action.meta.arg.Id)
      state.comment = (state.comments[data])
      state.error = ''
      console.log(state.comment)
    })
    builder.addCase(editComments.rejected, (state, action) => {
      state.loading = false
      state.comments = []
      state.error = action.error.message || ""
    })

  }
})

export default commentSlice.reducer
export const { deleteComment, createComment, updateComment } = commentSlice.actions
