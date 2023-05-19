const { Reader } = require("../models");

exports.create = async (req, res) => {
  try {
    res.status(201).json(await Reader.create(req.body));
  } catch (error) {
    const errorMessages = error.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.findAll = async (_req, res) => {
  res.status(200).json(await Reader.findAll());
};

exports.findByPk = async (req, res) => {
  const reader = await Reader.findByPk(req.params.id);
  if (!reader) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(200).json(reader);
};

exports.update = async (req, res) => {
  const [reader] = await Reader.update(req.body, {
    where: { id: req.params.id },
  });
  if (!reader) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(200).json(reader);
};

exports.delete = async (req, res) => {
  const reader = await Reader.destroy({ where: { id: req.params.id } });
  if (!reader) {
    return res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(204).json(reader);
};
