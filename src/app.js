const express = require("express");
const readerController = require("../src/controllers/reader");

const app = express();
app.use(express.json());

app.post("/readers", readerController.createReader);

module.exports = app;
