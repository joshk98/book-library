const express = require("express");
const genreController = require("../controllers/genre");

const router = express.Router();

router.post("/genres", genreController.create);
router.get("/genres", genreController.findAll);
router.get("/genres/:id", genreController.findByPk);
router.patch("/genres/:id", genreController.update);
router.delete("/genres/:id", genreController.delete);

module.exports = router;
