const express = require("express");
const readerRouter = require("../src/routes/reader");
const bookRouter = require("../src/routes/book");

const app = express();
app.use(express.json());

app.use("/", readerRouter);
app.use("/", bookRouter);

module.exports = app;
