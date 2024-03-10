import mongoose from "mongoose";

export const Connection=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/LOGIN');
    }catch(err){
        console.log("Error while connecting to database",err);
    }
}
