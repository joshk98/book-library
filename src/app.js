const express = require("express");
const readerRouter = require("../src/routes/reader");
const bookRouter = require("../src/routes/book");
const authorRouter = require("../src/routes/author");
const genreRouter = require("../src/routes/genre");

const app = express();
app.use(express.json());

app.use("/", readerRouter);
app.use("/", bookRouter);
app.use("/", authorRouter);
app.use("/", genreRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

module.exports = app;
