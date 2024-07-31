import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"PORTFOLIO"
    }).then(()=>{
        console.log("Connected To DB")
    }).catch((error)=>{
        console.log(`Some Error occured while connecting to DB : ${error}`)
    })
}

export default dbConnection