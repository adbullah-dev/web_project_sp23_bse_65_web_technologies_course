import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected Server running on ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}


export default connectDB;