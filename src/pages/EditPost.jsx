import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/Service";
import { useNavigate,  useParams } from 'react-router-dom';
import { setPosts } from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditPost() {
    const dispatch = useDispatch();
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const posts = useSelector(state => state.post.posts);

    useEffect(()=>{
        const localPosts = localStorage.getItem('posts');

        try{
            if(localPosts){
                const parsedPost = JSON.parse(localPosts);
                dispatch(setPosts(parsedPost));
            }
        }catch(error){
        }
    },[]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate, posts])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost