require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Order = require("./models/Order")
const connectDB = require("./config/db");

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(helmet());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start server ONLY after DB connects
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

startServer();
