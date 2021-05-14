'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const users ={};
const app =  express();
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());


app.get('/user/:id',(req,res)=>{
    const {id} = req.params
    const user =  users[id];
    console.log(id);
    res.status(200).send(user);
});

app.post('/register/user',async (req,res)=>{
    const id = randomBytes(8).toString('hex');
    const {name, age , email,address} = req.body;
    users[id]={
        id,name,age,email,address
    };
    await axios.post('http;//localhost:4005/events',{
        type:"UserCreated",
        data:{
            id,name,age,email,address
        }
    });
    res.status(201).send(users[id]);
});

app.get('/users',(req,res)=>{
 res.status(201).send(users);
});

app.post('/events',(req,res)=>{
    console.log("Recieved Event",req.body.type)
    res.send({});
});

app.listen(4001,()=>{
    console.log("Users server is up and running on 4001");
});
