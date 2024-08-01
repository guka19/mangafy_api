const CartModel = require("../models/Cart");

module.exports = {
  getCart: async (req, res) => {
    try {
      let cart = await CartModel.findOne({ user: req.user.id });

      if (!cart) {
        // Create an empty cart if it does not exist
        cart = new CartModel({ user: req.user.id, items: [] });
        await cart.save();
      }

      res.json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },  

  addToCart: async (req, res) => {
    try {
      const { mangaId, quantity } = req.body; 

      if (!mangaId || !quantity) {
        return res.status(400).json({ message: "mangaId and quantity are required" });
      }

      let cart = await CartModel.findOne({ user: req.user.id });

      if (!cart) {
        cart = new CartModel({ user: req.user.id });
      }

      // Update cart items
      const itemIndex = cart.items.findIndex(item => item.mangaId.equals(mangaId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ mangaId, quantity });
      }

      await cart.save();
      res.json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateCart: async (req, res) => {
    try {
      const { mangaId, quantity } = req.body;
      const cart = await CartModel.findOneAndUpdate(
        { user: req.user.id, 'items.mangaId': mangaId },
        {
          $set: { 'items.$.quantity': quantity }
        },
        { new: true }
      );

      if (cart) {
        res.json(cart);
      } else {
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: req.user.id },
          {
            $push: { items: { mangaId, quantity } }
          },
          { new: true }
        );
        res.json(updatedCart);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { mangaId } = req.body; 
      const cart = await CartModel.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { items: { mangaId } } },
        { new: true }
      );
      res.json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
