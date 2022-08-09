const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type,data) =>{
    if(type === 'PostCreated'){
        const {id,title} = data;

        posts[id] = {id,title, comments: [] };
    }
    if(type === 'CommentCreated'){
         const {id, content, postId,commentStatus} = data;

         const post = posts[postId];
         post.comments.push({id,content,commentStatus});
    }
    if(type === 'CommentModerated'){
        const {id,content,postId,commentStatus} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment=>{
            return comment.id == id;
        });
        comment.commentStatus=commentStatus;
        comment.content = content;
    }
}
//QUICK EXAMPLE:
//posts === {
//  'randomkey' : {
//      id: 'randomkey',
//      title: 'posttitle',
//      comments: [
//      {id: '123', comment: 'comment!'}
//      ]
//},
app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type,data} = req.body;
 
    handleEvent(type,data);

    console.log(posts);
    
    res.send({});
});

app.listen(4002,async ()=>{
    console.log('Query svc listening on port 4002')

    const res = await axios.get('https://localhost:4005/events');

    for(let event of res.data){
        console.log('Processing event :',event.type);

        handleEvent(event.type,event.data);
    }
});