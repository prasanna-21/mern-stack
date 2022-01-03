const express=require("express");
const app=express();
const cors=require('cors');
const connectDB=require('./config/db');
const router=require("./routes/auth")
//to connect database
connectDB();
//initialize middileware
app.use(cors())
app.use(express.json());

//pto connect with routes
app.use('/api',router);

const PORT=process.env.PORT || 8001
app.listen(PORT,()=>{
    console.log("server start on port: ",PORT);
})