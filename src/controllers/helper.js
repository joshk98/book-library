const { Book, Reader, Author, Genre } = require("../models");

const error404 = (model) => ({ error: `The ${model} could not be found.` });

const getOptions = (model) => {
  if (model === "book") return { include: Genre };
  if (model === "genre") return { include: Book };
};

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    author: Author,
    genre: Genre,
  };

  return models[model];
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    res.status(201).json(await Model.create(item));
  } catch (error) {
    const errorMessages = error.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.findAllItems = async (res, model) => {
  const Model = getModel(model);
  const options = getOptions(model);

  res.status(200).json(await Model.findAll({ ...options }));
};

exports.findItemByPk = async (res, model, id) => {
  const Model = getModel(model);
  const options = getOptions(model);
  const item = await Model.findByPk(id, { ...options });

  if (!item) {
    return res.status(404).json(error404(model));
  }

  res.status(200).json(item);
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);
  const [updatedItem] = await Model.update(item, { where: { id } });

  if (!updatedItem) {
    return res.status(404).json(error404(model));
  }

  res.status(200).json(updatedItem);
};

exports.deleteItem = async (res, model, id) => {
  const Model = getModel(model);
  const deletedItem = await Model.destroy({ where: { id } });

  if (!deletedItem) {
    return res.status(404).json(error404(model));
  }

  res.status(204).json(deletedItem);
};
