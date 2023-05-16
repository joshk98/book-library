const express = require("express");
const readerController = require("../src/controllers/reader");

const app = express();

app.use(express.json());

app.post("/readers", readerController.create);
app.get("/readers", readerController.findAll);
app.get("/readers/:id", readerController.findByPk);
app.patch("/readers/:id", readerController.update);
app.delete("/readers/:id", readerController.delete);

module.exports = app;
