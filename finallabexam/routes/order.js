import express from "express";
import Order from "../models/order.model.js";

const Orders = express.Router();

// Create a new order
Orders.route("/create").post(async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    console.log("Attempting to create a new order...");
    
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();
    console.log("Order created successfully:", newOrder);

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get all orders
Orders.route("/").get(async (req, res) => {
  try {
    console.log("Fetching all orders...");
    
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId");

    console.log(`Fetched ${orders.length} orders.`);
    
    res.status(200).render("order/order", { orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Failed to fetch orders");
  }
});

// Get a single order by ID
Orders.route("/:id").get(async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Fetching order with ID: ${id}...`);
    
    const order = await Order.findById(id)
      .populate("userId")
      .populate("items.productId");

    if (!order) {
      console.warn("Order not found for ID:", id);
      return res.status(404).send("Order not found");
    }

    console.log("Order found:", order);
    res.status(200).render("admin/orderDetails", { order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Failed to fetch order");
  }
});

// Update the order status
Orders.route("/:id/status").put(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    console.log(`Updating status of order with ID: ${id} to ${status}...`);
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      console.warn("Order not found for status update, ID:", id);
      return res.status(404).send("Order not found");
    }

    console.log("Order status updated:", updatedOrder);
    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Failed to update order status");
  }
});

export default Orders;
