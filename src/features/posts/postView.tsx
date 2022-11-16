import React, { useEffect, useState } from 'react'
import { deletePost, fetchPosts } from './postSlice'
import CreatePost from './createPost';
import Box from '@mui/material/Box';
import { Button, Grid, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
export const PostView = () => {

  const dispatch = useAppDispatch()
  const [showCreateBtn, setShowCreateBtn] = useState(true);

  const post = useAppSelector(state => state.posts)

  const handleDelete = (id: number) => {
    dispatch(deletePost(id))
  }

  const handleCreate = () => {
    setShowCreateBtn(false)
  }

  const handleSubmit = () => {
    setShowCreateBtn(true)
  }

  const showCreatedPostBtn = () => {
    return (
      <>
        {showCreateBtn ? (
            <Button variant="contained" onClick={ handleCreate} >Create Post</Button>
        ) : (
         <CreatePost submit={handleSubmit}/>
      
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <>
     
      <Box sx={{ mt: 3}}>
        <Box className='Create'>{showCreatedPostBtn()}</Box>
        <Typography gutterBottom variant="h5" component="h2" sx={{ mt: 3, mb:3, pl:5}}>
          List of Post
        </Typography>
        {post.loading && <Box>Loading...</Box>}
        {!post.loading && post.error ? <Box>Error: {post.error}</Box> : null}
        {!post.loading && post.posts.length ? (
           <Grid container spacing={4}>
           {post.posts.map((post) => (
             <Grid item key={post.id} xs={12} sm={6} md={4}>
               <Card
                 sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardContent sx={{ flexGrow: 1 }}>
                   <Typography gutterBottom variant="h5" component="h2">
                     Post No: {post.id}
                   </Typography>
                   <Typography>
                     Title {post.title}
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="small" href={`/post/${post.id}`}>View</Button>
                   <Button size="small" onClick={ ()=> handleDelete(post.id)} >Delete</Button>
                 </CardActions>
               </Card>
             </Grid>
           ))}
         </Grid>
        ) : null}
      </Box>
     
    </>
  )
}

