const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events',async (req,res)=>{
    const {type,data} = req.body;
    if(type==='CommentCreated'){
        const commentStatus = data.content.includes('oranges')?'rejected':'approved';

        await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                commentStatus: commentStatus,
                content: data.content
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    }
    res.send({});
});

app.listen(4003,()=>{
    console.log('Listening on port 4003');
})