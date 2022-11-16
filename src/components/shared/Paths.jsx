import React from 'react'
import PageNotFound from './errors/PageNotFound';
import { PostView }  from '../../features/posts/postView';
import { SinglePostDetail } from '../../features/posts/singlePostDetail';
// import { BrowserRouter, Route , Routes} from 'react-router-dom';
import EditComment from '../../features/comments/editComment';
import { CommentView } from '../../features/comments/commentView';
import EditPostForm from '../../features/posts/editPostForm';
import CreatePost from '../../features/posts/createPost';
import { BrowserRouter, Route , Routes} from 'react-router-dom';

const Paths = () => 
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<PostView/>}/>
            <Route path="/post/:id" element={< SinglePostDetail/>} />
            <Route path="/post/edit/:id" element={< EditPostForm/>} />
            <Route path="/post/:id/comments" element={<CommentView/>}/>
            <Route path= "/comments?postId=:id" element={<CommentView/>}/>
            <Route path= "/createPost" element={<CreatePost/>}/>
            <Route path = "/post/:PostId/comments/edit/:Id" element={<EditComment/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>

export default Paths


