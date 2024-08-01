const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");
const authenticate = require("../middlewares/authMiddleware");

router.get("/api/cart", authenticate, cartService.getCart);
router.post("/api/cart", authenticate, cartService.addToCart);
router.put("/api/cart", authenticate, cartService.updateCart);
router.delete("/api/cart", authenticate, cartService.deleteCart);
router.post('/api/clear', authenticate, cartService.clearCart);

module.exports = router;
