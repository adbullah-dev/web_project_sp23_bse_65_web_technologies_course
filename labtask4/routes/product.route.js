import express from "express"
import upload from "../middleware/multer.js"
import { addProductForm, createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();

//RestFull Crud Operations
productRouter.route('/')
.post(createProduct) //Now this function will implement pagination, sorting and seraching
.get(getAllProducts)        

productRouter.route('/create')
.get(addProductForm)
.post(upload.single("productImage"), createProduct);


  productRouter.route('/:id')
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(updateProduct)      

export default productRouter;


