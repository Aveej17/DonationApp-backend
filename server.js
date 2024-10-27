const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });