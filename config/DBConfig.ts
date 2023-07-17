 import mongoose from "mongoose";
 import dotenv from "dotenv"
 dotenv.config()

 const URL = process.env.DATABASE;

 export const db = ()=>{
    mongoose.connect(URL!).then(()=>{
      console.log("server is active now");      
    })
 }