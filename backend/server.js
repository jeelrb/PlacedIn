const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db')

const app = express();

// Connect with mongo database
connectDB()

app.use(cors());
app.use(express.json());

//Routes setup
const doubtRouter = require('./routes/doubt.route');
const interviewExpRouter = require('./routes/interview-experience.route');
const profileRouter = require('./routes/profile.route');
const registrationRouter = require('./routes/register')
const loginRouter = require('./routes/login')

app.use('/register',registrationRouter)
app.use('/profile',profileRouter);
app.use('/doubt',doubtRouter);
app.use('/',loginRouter);

const port = 5000 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});