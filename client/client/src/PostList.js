import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentsList  from './CommentsList';

const PostList = () => {
    const [posts,setPosts] = useState({});

    const fetchPosts = async ()=>{
        //Answer from the call is stored inside 'data' property
        //without await console.log outside of fetchPosts scope shows 'undefined'
        const res = await axios.get('http://localhost:4002/posts');
        console.log(res.data);
        setPosts(res.data);
    };

    //Run this first
    useEffect(()=>{
        fetchPosts();
    },[]);

    console.log(posts);

    //js built-in function give us back array of all values from object
    //key property is mandatory
    const renderedPosts = Object.values(posts).map(post=>{
        return <div className='card' style={{width : '30%', marginBottom: '20px'}} key={post.id}>
            <div className='cardBody'>
                <h3>{post.title}</h3>
                <CommentsList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
            </div>
        </div>
    })
    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>
}

export default PostList;