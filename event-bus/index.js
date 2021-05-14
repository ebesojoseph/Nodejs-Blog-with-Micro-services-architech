'use strict';

const express = require('express');
const app = express();
const {randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/events',async(req,res)=>{
    const event = req.body;

    axios.post('http://localhost:4000/events',event);
    axios.post('http://localhost:4001/events',event);
    axios.post('http://localhost:4002/events',event);

    res.send({status:'OK'});
});

app.listen(4005,()=>{
 console.log("event bus listening on 4005");
});