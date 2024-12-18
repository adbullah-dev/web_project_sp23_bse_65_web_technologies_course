import express from "express";
import Product from "../models/products.model.js";

const Shop = express.Router();

// Route for rendering the shop page
Shop.route("/shop").get(async (req, res) => {
  try {
    console.log("Fetching all products for the shop page...");
    
    // Fetch all products from the database
    const products = await Product.find();

    console.log(`Successfully fetched ${products.length} products.`);
    
    // Render the shop page with products
    res.status(200).render("shop", { products });
  } catch (error) {
    console.error("Error fetching products for shop page:", error);
    res.status(500).send("An error occurred while loading the shop page.");
  }
});

export default Shop;
