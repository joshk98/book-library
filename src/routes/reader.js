const express = require("express");
const readerController = require("../controllers/reader");

const router = express.Router();

router.post("/readers", readerController.create);
router.get("/readers", readerController.findAll);
router.get("/readers/:id", readerController.findByPk);
router.patch("/readers/:id", readerController.update);
router.delete("/readers/:id", readerController.delete);

module.exports = router;
