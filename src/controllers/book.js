const { Book } = require("../models");

exports.create = async (req, res) => {
  try {
    res.status(201).json(await Book.create(req.body));
  } catch (error) {
    const errorMessages = error.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.findAll = async (_req, res) => {
  res.status(200).json(await Book.findAll());
};

exports.findByPk = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  res.status(200).json(book);
};

exports.update = async (req, res) => {
  const [book] = await Book.update(req.body, {
    where: { id: req.params.id },
  });
  if (!book) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  res.status(200).json(book);
};

exports.delete = async (req, res) => {
  const book = await Book.destroy({ where: { id: req.params.id } });
  if (!book) {
    return res.status(404).json({ error: "The book could not be found." });
  }
  res.status(204).json(book);
};
