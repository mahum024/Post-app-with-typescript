import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchComments } from './commentSlice';
import {deleteComment} from './commentSlice'
import CreateComments from './createComments';
import Box from '@mui/material/Box';
import { Button, Grid, Card, CardActions, CardContent, Typography} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

export const CommentView = () => {
  let { id } = useParams<string>();
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const comments = useAppSelector(state => state.comments)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchComments(id))
  }, [])
  
  const handleCreate = () => {
    setShowCreateBtn(false)
  }
  const handleSubmit = () => {
    setShowCreateBtn(true)
  }
  const handleDelete = (id: number | null) => {
   
    dispatch(deleteComment({id}));
    
  };

  const showCreatedPostBtn = () => {
    return (
      <>
        {showCreateBtn ? (
              <Button variant="contained" onClick={ handleCreate}>{'Create Comment'} </Button>
        ) : (
         <CreateComments submit={handleSubmit}/>
        )}
      </>
    );
  };

  return (
    <Box sx={{ mt: 3, mb:3}}>
      <Box className='Create'>{showCreatedPostBtn()}</Box>
     
      <Typography gutterBottom variant="h3" component="h3" sx={{mt: 3, mb:3, pl:5}}>
        Comments
      </Typography>
      {comments.loading && <div>Loading...</div>}
      {!comments.loading && comments.error ? <div>Error: {comments.error}</div> : null}
      {!comments.loading && comments.comments.length ? (
        <Grid container spacing={4}>
        {comments.comments.map(comments => (
          <Grid item key={comments.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Comment No: {comments.id}
                </Typography>
                <Typography>
                  Name {comments.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/post/${comments.postId}/comments/edit/${comments.id}`}>Edit</Button>
                <Button size="small" onClick={()=> handleDelete(comments.id)} >Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      ) : null}
    </Box>
  )
}
