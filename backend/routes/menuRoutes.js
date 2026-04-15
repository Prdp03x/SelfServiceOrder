const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

//Get All Menu Items

router.get("/", async (req, res) => {
    try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const items = await Menu.find(filter);

    res.json(items);
  } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Menu.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;