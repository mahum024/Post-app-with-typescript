import React, { useState } from "react";
import {createComment} from './commentSlice'
import uuid from 'react-uuid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../app/hooks'

type CreateCommentParams ={
  submit: () => void
}
const CreateComments = (props: CreateCommentParams) => {
  const [values, setValues] = useState({ name: "", body: "", email:"", id: uuid()});
  const { body, name, email } = values;
  const dispatch = useAppDispatch();
  
  const handleSubmit = (e : any) => {
    e.preventDefault();
    dispatch(createComment({values}));
    setValues({ name: "",email:"", body: "", id: uuid() });
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
          New Comment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            autoFocus
            type="text" value={name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Enter name" 
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoFocus
            type="text" value={email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="Enter email"
          />
          <TextField
            margin="normal"
            fullWidth
            id="body"
            label="Body"
            autoFocus
            value={body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="add description"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick= { handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>

        </Box>
      </Box>
  
    </Container>
  );
};

export default CreateComments;
