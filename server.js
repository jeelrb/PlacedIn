const express = require('express');
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const mongodb = config.get('mongoURL')

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || mongodb, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('Mongo connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()

app.use(cors())

app.use(express.json());

//Routes setup
const postRouter = require('./backend/routes/doubt.route');
const interviewExpRouter = require('./backend/routes/interview-experience.route');
const profileRouter = require('./backend/routes/profile');
const registrationRouter = require('./backend/routes/register')
const loginRouter = require('./backend/routes/login')

app.use('/register',registrationRouter)
app.use('/profile',profileRouter);
app.use('/post',postRouter);
app.use('/interview',interviewExpRouter);
app.use('/',loginRouter);

// Serve static assets in production
if(process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'))
    app.get('*', ( req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});