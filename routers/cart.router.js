const express = require("express");
const { cartItems, CartItem } = require("../models/cart");

const router = express.Router();
router.get("/", (req, res) => {
  res.json(cartItems);
});
router.post("/", (req, res) => {
  const { name, price, quantity, author, genre } = req.body;

  if (!name || !price || !quantity || !author || !genre) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newBook = new CartItem(cartItems.length + 1, name, price, quantity, author, genre);
  cartItems.push(newBook);
  res.status(201).json(newBook);
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, author, genre } = req.body;

  const item = cartItems.find((item) => item.id === parseInt(id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = name || item.name;
  item.price = price || item.price;
  item.quantity = quantity || item.quantity;
  item.author = author || item.author;
  item.genre = genre || item.genre;

  res.json(item);
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = cartItems.findIndex((item) => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  cartItems.splice(index, 1);
  res.json({ message: "Item deleted" });
});

module.exports = router;
