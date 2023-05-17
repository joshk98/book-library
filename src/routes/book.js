const express = require("express");
const bookController = require("../controllers/book");

const router = express.Router();

router.post("/books", bookController.create);
router.get("/books", bookController.findAll);
router.get("/books/:id", bookController.findByPk);
router.patch("/books/:id", bookController.update);
router.delete("/books/:id", bookController.delete);

module.exports = router;
