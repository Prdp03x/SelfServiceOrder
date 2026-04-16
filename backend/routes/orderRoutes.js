const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const DEFAULT_CAFE_ID = "69e0da3fc53d76f3adcf4da8";
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { items, tableNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }

    if (!tableNumber) {
      return res.status(400).json({ error: "Table number required" });
    }

    const total = items.reduce((sum, item) => {
      const extras =
        item.selectedOptions?.reduce(
          (s, opt) => s + opt.price,
          0
        ) || 0;

      return sum + (item.price + extras) * item.qty;
    }, 0);

console.log("🔥 ORDER HIT");
    console.log("CafeID:", DEFAULT_CAFE_ID);

    const newOrder = new Order({
      cafeId: new mongoose.Types.ObjectId(DEFAULT_CAFE_ID),
      items,
      total,
      tableNumber, // ✅ now valid
      status: "pending",
    });

    await newOrder.save();

    console.log("Saving Order:", newOrder);

    res.json({
      message: "Order placed",
      orderId: newOrder._id,
    });

    

  } catch (err) {
    console.error("🔥 ORDER ERROR:", err); // 👈 ADD THIS
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    await Order.findByIdAndUpdate(req.params.id, { status });

    res.json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get Id details
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;