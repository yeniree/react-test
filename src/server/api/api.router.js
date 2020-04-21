const express = require("express");
const router = express.Router();
const controller = require("./api.controller");

router.get("/items", controller.getAll);
router.get("/items/:id", controller.getItem);

module.exports = router;
