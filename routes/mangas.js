const mangaService = require("../services/mangaService");
const express = require("express");
const router = express.Router();

router.get("/api/getAll", mangaService.getAll);
router.get("/api/:id", mangaService.getById);
router.post("/api/add", mangaService.add);
router.delete("/api/:id", mangaService.delete);
router.put("/api/:id", mangaService.update);

module.exports = router;