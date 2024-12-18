import express from "express";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import productRouter from "./routes/product.route.js";

const server = express();
server.set("view engine", "ejs");

//Middlwwares
server.use(cors());
server.use(express.json());     
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public")); 


//Route paths
server.use('/api/admin/products', productRouter);

//Home Route
server.use('/', (req, res)=>{
    res.render('home')
})



connectDB().then(() => {
    server.listen(5000, ()=>{
        console.log('Server Running on Specified Port...')
    });
});