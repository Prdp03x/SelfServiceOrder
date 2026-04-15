const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      // 🔥 THIS IS THE IMPORTANT PART
      selectedOptions: [
        {
          name: String,
          price: Number,
        },
      ],
    },
  ],
  total: Number,
  tableNumber: {
    type: Number,
    required: true,
  },
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);