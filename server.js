const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
require('dotenv').config();


require('./model/userModel');
require('./model/userProfile');
require('./model/adminModel');
require('./model/adminApprovalModel');
require('./model/charityModel');
require('./model/projectModel');
require('./model/donationModel');

const Admin = require('./model/adminModel');
const {hashPassword} = require('./middleware/bcrypt');

const globalExceptionHandler = require('./exception/globalExceptionHandler');
const usersRouter = require('./routes/users');
const charityRoutes = require("./routes/charityRoutes");
const adminRoutes = require('./routes/adminRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/user', usersRouter);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/charity', charityRoutes);
app.use('/api/v1/donation', donationRoutes);

app.use(express.static(path.join(__dirname, 'public/views')));


app.use(globalExceptionHandler); // Global error handler should be the last middleware

//create Admin initially
const createAdmin = async () =>{
    let employee = await Admin.findByPk(1);
    if(!employee){
      const initialSetupAdminAccount = {
        email:"admin@gmail.com",
        name:"admin",
        password: await hashPassword("admin"),
        role:"admin"
      }
      console.log("Creating admin account");
      employee = await Admin.create(initialSetupAdminAccount);
    }
    if(employee){
      console.log("Admin account present");
    }
  
}

sequelize
    .sync()
    .then(async result => {
        await createAdmin();
        console.log("Database synced successfully");
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });