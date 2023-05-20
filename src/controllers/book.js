const Helper = require("./helper");

exports.create = (req, res) => Helper.createItem(res, "book", req.body);

exports.findAll = (_req, res) => Helper.findAllItems(res, "book");

exports.findByPk = async (req, res) =>
  Helper.findItemByPk(res, "book", req.params.id);

exports.update = async (req, res) =>
  Helper.updateItem(res, "book", req.body, req.params.id);

exports.delete = async (req, res) =>
  Helper.deleteItem(res, "book", req.params.id);
