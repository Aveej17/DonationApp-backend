const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
require('dotenv').config();


require('./model/userModel');
require('./model/userProfile');

const globalExceptionHandler = require('./exception/globalExceptionHandler');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/user', usersRouter);

app.use(express.static(path.join(__dirname, 'public/views')));


app.use(globalExceptionHandler); // Global error handler should be the last middleware
sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });