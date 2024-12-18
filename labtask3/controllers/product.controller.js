import Product from "../models/products.model.js";
import dotenv from "dotenv"
dotenv.config();


// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).render("admin/products", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch products.");
  }
};


//Single Product Page will be Render
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    console.log(product)

    if (!product) {
      return res.status(404).render("error", { message: "Product not found" });
    }

    res.status(200).render("admin/singleProduct", { product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).render("error", { message: "Failed to fetch product" });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { title, description, price, brand } = req.body;
    console.log("function arrived here")
    console.log("request body =======", req.body);
    // const productImage = req.file.path;

    const newProduct = new Product({
      title : "Product4 from Terminal",
      description : "Product from Terminal",
      price: 300 ,
      brand: "Lenovo",
      productImage : "ll",
    });

    const savedProduct = await newProduct.save();
    res.redirect(`/api/admin/products/`);
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to create product" });
  }
};


export const renderProductForm = async (req, res) => {
  try {
    res.status(200).render("admin/addProduct.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to display form.");
  }
};


// Update Product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, brand, productImage } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, brand, productImage },
      { new: true, runValidators: true } // Returns the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.redirect('/api/admin/products');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};



