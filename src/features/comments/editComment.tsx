import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {editComments , updateComment} from './commentSlice' 
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
type Comment={
  id: number | null
  name: string
  email: string
  body: string
  postId: number| null
}

const EditComment = () => {
  const comment = useAppSelector(state => state.comments)
  let {PostId, Id} = useParams<string>();
  const {email, body,name, id, postId} = comment.comment
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<Comment>({ email, body, name, id, postId});

  const navigate = useNavigate();
  const [editData, setEditData] = useState<boolean>(true);

  useEffect(() => {
    dispatch(editComments({Id, PostId}));
    setValues({...values, name: name})
    setValues({...values, body: body})
    setValues({...values, email: email})
    setValues({...values, id: id})
    setValues({...values, postId: postId})
  }, [])

  const handleUpdate = () => {
    dispatch(updateComment(values));
    setEditData(false)
   
  };

  const showCreatedPostBtn = () => {
    return (
      <>
        {editData ? (

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
                Edit Comment
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Enter name" 

                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  type="text" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="Enter email"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="body"
                  label="Body"
                  autoFocus
                  value={values.body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="add description"
                />
      
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick= {handleUpdate}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
      
              </Box>
            </Box>
            <Button
              type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
          </Container>
                      
        ) : (

        <Grid xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
         <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              ID {values.id}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Email : {values.email}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Body {values.body}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Name : {values.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Post Id : {values.postId}
            </Typography>
          </CardContent>
          <CardActions>
          <Button
              type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
          </CardActions>
        </Card>
      </Grid>
        )}
      </>
    );
  };

  
 return (
   <div>
   {showCreatedPostBtn()}
   </div>
  );
};

export default EditComment;

