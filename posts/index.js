'use strict';

const express = require('express');
const app = express();
const {randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');

const posts = {};

 app.use(bodyParser.json());
 app.use(cors());
  
 app.get('/posts',(req, res)=>{
    res.send(posts);
 });

 app.post('/posts',async (req,res)=>{
    const id = randomBytes(7).toString('hex');
    const {title } = req.body;

    posts[id] = {
        id, title
    };
    await axios.post('http://localhost:4005/events',{
        type: 'PostCreated',
        data:{
            id,title
        }
    });
    res.status(201).send(posts[id]);
 });

 app.post('/events',(req,res)=>{
    console.log("Recieved Event",req.body.type)
    res.send({});
});

 app.listen(4000,()=>{
    console.log("Posts sever up and running on 4000");
 });

