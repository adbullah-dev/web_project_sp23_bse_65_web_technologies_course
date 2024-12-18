import express from "express";
import Product from "../models/products.model.js";
import dotenv from "dotenv";
dotenv.config();

const Routes_Products = express.Router();

// Fetch All Products with Pagination, Sorting, and Search
Routes_Products.route("/")
  .get(async (req, res) => {
    try {
      console.log("Fetching products with pagination, sorting, and search...");
      const { page = 1, limit = 10, search = "", sortBy = "price", sortOrder = "asc" } = req.query;
      const pageNum = parseInt(page);
      const pageLimit = parseInt(limit);

      const searchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { brand: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const sortOrderValue = sortOrder === "desc" ? -1 : 1;

      const products = await Product.find(searchQuery)
        .skip((pageNum - 1) * pageLimit)
        .limit(pageLimit)
        .sort({ [sortBy]: sortOrderValue });

      const totalProducts = await Product.countDocuments(searchQuery);

      console.log(`Found ${products.length} products on page ${pageNum}.`);
      res.status(200).render("admin/allProductsWithPagination", {
        products,
        totalPages: Math.ceil(totalProducts / pageLimit),
        currentPage: pageNum,
        limit: pageLimit,
        search,
        sortBy,
        sortOrder,
      });
    } catch (error) {
      console.error("Error while fetching products:", error);
      res.status(500).send("Failed to fetch products.");
    }
  })
  .post(async (req, res) => {
    try {
      console.log("Attempting to create a new product...");
      const { title, description, price, brand } = req.body;

      const newProduct = new Product({
        title: title || "Default Title",
        description: description || "Default Description",
        price: price || 0,
        brand: brand || "Unknown",
        productImage: "placeholder.jpg",
      });

      const savedProduct = await newProduct.save();
      console.log(`Product created successfully: ${savedProduct.title}`);
      res.redirect("/api/admin/products");
    } catch (error) {
      console.error("Error while creating a product:", error);
      res.render("error", { message: "Failed to create product" });
    }
  });

// Add Product Form
Routes_Products.route("/create").get((req, res) => {
  try {
    console.log("Rendering the add product form...");
    res.status(200).render("admin/addProduct.ejs");
  } catch (error) {
    console.error("Error displaying the product form:", error);
    res.status(500).send("Failed to display form.");
  }
});

// Fetch a Single Product
Routes_Products.route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      console.log(`Fetching product with ID: ${id}`);
      const product = await Product.findById(id);

      if (!product) {
        console.log("Product not found.");
        return res.status(404).render("error", { message: "Product not found" });
      }

      console.log(`Product fetched successfully: ${product.title}`);
      res.status(200).render("admin/singleProduct", { product });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).render("error", { message: "Failed to fetch product" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      console.log(`Attempting to delete product with ID: ${id}`);
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        console.log("Product not found for deletion.");
        return res.status(404).json({ error: "Product not found" });
      }

      console.log(`Product deleted successfully: ${deletedProduct.title}`);
      res.redirect("/api/admin/products");
    } catch (error) {
      console.error("Error while deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, brand, productImage } = req.body;
    try {
      console.log(`Updating product with ID: ${id}`);
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { title, description, price, brand, productImage },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        console.log("Product not found for update.");
        return res.status(404).json({ error: "Product not found" });
      }

      console.log(`Product updated successfully: ${updatedProduct.title}`);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error while updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

export default Routes_Products;
