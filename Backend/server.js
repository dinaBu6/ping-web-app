const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const cors = require('cors'); 
const pingRoute = require('./routes/router')
const mongoose = require('mongoose')
//express app
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(pingRoute);
  
//conect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to port
        app.listen(4000, () => {
        console.log('listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    })

