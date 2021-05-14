'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const axios =  require('axios');

app.use(bodyParser.json());
const commentByPostId = {};

app.get('/posts/:id/comments',(req,res)=>{
   res.send(commentByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(8).toString('hex');
    const {content} =  req.body;

    const comments = commentByPostId[req.params.id] || []; 
    comments.push({id:commentId, content});

    commentByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events',{
       type:'CommentCreated' ,
       data:{
            id : commentID,
            content,
            postId : req.params.id,
       }
    });
    res.status(201).send(comments);
});
app.post('/events',(req,res)=>{
    console.log("Recieved Event",req.body.type)
    res.send({});
});
app.listen(4002,()=>{
    console.log("Comments server running on port 4002");
});