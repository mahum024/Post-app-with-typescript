import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from './postSlice'
import uuid from 'react-uuid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
type CreatePostParams ={
  submit: () => void
}
const CreatePost = (props: CreatePostParams) => {
  const [values, setValues] = useState({ title: "", body: "", userId: uuid(), id: uuid()});
  const { title, body,  userId } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    
    dispatch(createPost({values}));
    setValues({ title: "", body: "", userId: uuid(), id: uuid() });
    navigate('/')
    props.submit()
  };
  
 return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            autoFocus
            type="text" value={title} onChange={(e) => setValues({ ...values, title: e.target.value })} placeholder="Enter Post Title"
          />
          <TextField
            margin="normal"
            fullWidth
            id="body"
            label="Body"
            autoFocus
            value={body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="add post description"
          />
         <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick= { handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Create POst
          </Button>

        </Box>
      </Box>
  
    </Container>
    
  );
};

export default CreatePost;