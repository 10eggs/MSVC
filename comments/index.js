const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const axios = require('axios');
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId ={};

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
 
});

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || []; //when undefined return empty
    
    comments.push({id: commentId, content, commentStatus:'pending'});

    console.log('Comment saved with the following structure: ',comments.at(-1))

    commentsByPostId[req.params.id]=comments;

    await axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            commentStatus: 'pending'
        }
    });
    res.status(201).send(comments);
});

app.post('/events',async (req,res)=>{
    console.log('Received Event: ',req.body.type);

    const {type,data} = req.body;
    if(type==='CommentModerated'){
        const {postId,id,commentStatus,content} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment=>{
            return comment.id === id;
        })
        
        comment.commentStatus=commentStatus;

        await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentUpdated',
            data: {
                id,
                commentStatus,
                postId,
                content
            }
        })
    } 
    res.send({});
});


app.listen(4001,()=>{
    console.log('Listening on port 4001');
})