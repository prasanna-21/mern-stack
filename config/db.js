const mongoose=require("mongoose");
const config=require('config');

const db=config.get("mongo_URL");

const connectDB=async ()=>{
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected")
    }catch(err){
        console.error(err.message);
        //exit process
        process.exit(1);
    }
}

module.exports=connectDB;