const Cart = require("../models/cart-model");


exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate("productId userId");



    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCartItem = async (req, res) => {
  try {
    const {  productId, quantity, address } = req.body;

    if ( !productId || !quantity || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Cart({ userId: req.user.id, productId, quantity, address });
    await newItem.save();
    
    res.status(201).json({ message: "Item added to the cart", cart: newItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, address } = req.body;

    if (quantity && quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item updated", cart: updatedItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteCartItem = async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};