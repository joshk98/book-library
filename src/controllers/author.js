const Helper = require("./helper");

exports.create = (req, res) => Helper.createItem(res, "author", req.body);

exports.findAll = (_req, res) => Helper.findAllItems(res, "author");

exports.findByPk = async (req, res) =>
  Helper.findItemByPk(res, "author", req.params.id);

exports.update = async (req, res) =>
  Helper.updateItem(res, "author", req.body, req.params.id);

exports.delete = async (req, res) =>
  Helper.deleteItem(res, "author", req.params.id);
