var express = require("express");
var router = express.Router();
const userService = require("../services/userService");

router.get("/api/getAll", userService.getAll);
router.get("/api/:id", userService.getUserById);
router.post("/api/register", userService.register);
router.post("/api/login", userService.login);

module.exports = router;
