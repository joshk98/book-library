const { Book, Reader } = require("../models");

const error404 = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
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

  res.status(200).json(await Model.findAll());
};

exports.findItemByPk = async (res, model, id) => {
  const Model = getModel(model);
  const item = await Model.findByPk(id);

  if (!item) {
    return res.status(404).json(error404(model));
  }
  res.status(200).json(item);
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);
  const [updatedItem] = await Model.update(item, {
    where: { id },
  });

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
