import React, { useEffect} from 'react'
import { fetchSinglePost } from './postData'
import { useParams } from 'react-router-dom';
import { Button, Grid, Card, CardActions, CardContent, Typography , Box} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'


export const SinglePostDetail = () => {
 
  let { id } = useParams<string>();
  const post  = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSinglePost(id))
  }, [])


  return (
   
    <Box sx={{ mt: 5, mb:7}}>
        <Typography gutterBottom variant="h1" component="h1" sx={{mb:2, pl:5}}>
          Post Detail
        </Typography>
        {post.loading && <div>Loading...</div>}
        {!post.loading && post.error ? <div>Error: {post.error}</div> : null}
        {!post.loading ? (
              <Grid xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
               <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Post Id: {post.post.id}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Post Title  {post.post.title} 
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Post Body {post.post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`/post/edit/${post.post.id}`}>Edit</Button>
                  <Button size="small"  href={`/post/${post.post.id}/comments`}>Show Comments</Button>
                </CardActions>
              </Card>
            </Grid>
            // <div>here</div>
          ) : null}
    </Box>
   
  )
}

