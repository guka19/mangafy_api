var express = require("express");
var router = express.Router();
const userService = require("../services/userService");
const authenticate = require("../middlewares/authMiddleware");

router.get("/api/getAll", userService.getAll);
router.get("/api/:id", userService.getUserById);
router.post("/api/register", userService.register);
router.post("/api/login", userService.login);
router.put("/api/update", authenticate, userService.updateUser);
router.delete("/api/delete", authenticate, userService.deleteUser);

module.exports = router;
