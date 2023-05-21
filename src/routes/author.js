const express = require("express");
const authorController = require("../controllers/author");

const router = express.Router();

router.post("/authors", authorController.create);
router.get("/authors", authorController.findAll);
router.get("/authors/:id", authorController.findByPk);
router.patch("/authors/:id", authorController.update);
router.delete("/authors/:id", authorController.delete);

module.exports = router;
