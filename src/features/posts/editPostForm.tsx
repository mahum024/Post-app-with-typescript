import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { editPost, updatePost } from './postData'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
type Post={
  title: string
  body: string
  userId: number | null
  id: number | null
}

type EditParams = {
  id: string | undefined
}
const EditPostForm = () => {

  let { id } = useParams<EditParams>();
  const post = useAppSelector(state => state.post)
  const [values, setValues] = useState<Post>({ title: "", body: "", userId: null, id: null});
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(true);
  useEffect(() => {
    dispatch(editPost(id));
    values.body = post.post.body;
    values.title = post.post.title;
    values.userId = post.post.userId;
    values.id = post.post.id;
    
  }, [])

  const handleUpdate = () => {
    dispatch(updatePost(values));
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
                  id="title"
                  label="Title"
                  autoFocus
                  type="text"
                   value={values.body}
                   onChange={(e) => setValues({ ...values, title: e.target.value })}
                   placeholder="Enter Post Title"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="body"
                  label="Body"
                  autoFocus
                   className="form-control"
                   value={values.body}
                   onChange={(e) => setValues({ ...values, body: e.target.value })}
                   placeholder="add post description"
                  type="text" 
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
                ID {post.post.id}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Title {post.post.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Body {post.post.body}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                User Id   {post.post.userId}
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

export default EditPostForm;