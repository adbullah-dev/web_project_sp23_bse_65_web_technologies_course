import express from "express";
import cors from "cors";
import product_router from "./routes/product.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.set("view engine", "ejs");

//Middlwwares
app.use(cors());
app.use(express.json());     
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 


app.use('/api/admin/products', product_router);

//Home Route
app.use('/', (req, res)=>{
    res.render('home')
})


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected Server running on ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}
connectDB().then(() => {
    app.listen(5000, ()=>{
        console.log('app Running on Specified Port...')
    });
});