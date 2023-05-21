const Helper = require("./helper");

exports.create = (req, res) => Helper.createItem(res, "genre", req.body);

exports.findAll = (_req, res) => Helper.findAllItems(res, "genre");

exports.findByPk = async (req, res) =>
  Helper.findItemByPk(res, "genre", req.params.id);

exports.update = async (req, res) =>
  Helper.updateItem(res, "genre", req.body, req.params.id);

exports.delete = async (req, res) =>
  Helper.deleteItem(res, "genre", req.params.id);
