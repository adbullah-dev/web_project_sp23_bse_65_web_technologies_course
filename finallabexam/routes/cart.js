import express from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

const Cart_Router = express.Router();

// View Cart
Cart_Router.route("/").get(async (req, res) => {
  const userId = req.session.userId;

  try {
    console.log(`Fetching cart for user ID: ${userId}...`);

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      console.warn("Cart is empty or not found.");
      return res.render("cart/cart", { cart: null });
    }

    console.log("Cart fetched successfully:", cart);
    res.render("cart/cart", { cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.render("error", { message: "Failed to fetch cart" });
  }
});

// Add to Cart
Cart_Router.route("/add/:productId").post(async (req, res) => {
  const { productId } = req.params;
  const userId = req.session.userId;

  try {
    console.log(`Adding product ID: ${productId} to user ID: ${userId}'s cart...`);

    const product = await Product.findById(productId);
    if (!product) {
      console.warn("Product not found:", productId);
      return res.render("error", { message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log("Creating a new cart for user:", userId);
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    console.log("Product added to cart successfully.");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.render("error", { message: "Failed to add product to cart" });
  }
});

// Remove from Cart
Cart_Router.route("/remove/:productId").post(async (req, res) => {
  const { productId } = req.params;
  const userId = req.session.userId;

  try {
    console.log(`Removing product ID: ${productId} from user ID: ${userId}'s cart...`);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.warn("Cart not found for user:", userId);
      return res.render("error", { message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    console.log("Product removed from cart successfully.");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.render("error", { message: "Failed to remove product from cart" });
  }
});

// Checkout Cart
Cart_Router.route("/checkout").post(async (req, res) => {
  const userId = req.session.userId;

  try {
    console.log(`Processing checkout for user ID: ${userId}...`);

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      console.warn("Checkout failed: Cart is empty.");
      return res.render("error", { message: "Cart is empty" });
    }

    cart.items = [];
    await cart.save();

    console.log("Checkout successful for user ID:", userId);
    res.render("cart/checkout", { message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.render("error", { message: "Failed to checkout" });
  }
});

export default Cart_Router;
