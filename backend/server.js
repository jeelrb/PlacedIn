const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
const port=5000;

app.use(cors());
app.use(express.json());

// const uri=process.env.ATLAS_URI;
//mongoose.connect(uri, {useNewUrlParser:true,useCreateIndex:true});

//const connection= mongoose.connection;
//connection.once('open',()=>{
//    console.log("MongoDB database connection established Successfully");
//});

const doubtRouter= require('./routes/doubt.route');
const interviewExpRouter=require('./routes/interview-experience.route');
const profileRouter=require('./routes/profile.route');

app.use('/profile',profileRouter);
app.use('/doubt',doubtRouter);
app.use('/interview-experience',interviewExpRouter);

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});