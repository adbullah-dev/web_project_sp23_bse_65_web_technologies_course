import express from "express";
import cors from "cors";
import session from "express-session";
import flash from "connect-flash";
import Cart_Router from "./routes/cart.js";
import Shop from "./routes/shop.js";
import Orders from "./routes/order.js";
import AuthRouter from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes_Products from "./routes/product.js";
dotenv.config()

const app = express();
app.set("view engine", "ejs");

//Middlwwares
app.use(cors());
app.use(express.json());  
// app.use((req, res, next) => {res.locals.success = req.flash("success");res.locals.error = req.flash("error");next();});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 
// app.use(session({secret: process.env.SECRET,resave: false}));
// app.use(flash());


//Route paths
app.use('/cart', Cart_Router);
app.use('/', Shop);
app.use('/orders', Orders);
app.use('/api/auth', AuthRouter);
app.use('/admin/products', Routes_Products);

//home Page Rendering 
app.use('/', (req, res)=>{res.render('index')})


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Databse Connection Successful`)
    } catch (error) {
        console.log(error)
    }
}
connectDB().then(() => {
    app.listen(3000, ()=>{
        console.log('app running on port 3000')
    });
});