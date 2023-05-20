const Helper = require("./helper");

exports.create = (req, res) => Helper.createItem(res, "reader", req.body);

exports.findAll = (_req, res) => Helper.findAllItems(res, "reader");

exports.findByPk = async (req, res) =>
  Helper.findItemByPk(res, "reader", req.params.id);

exports.update = async (req, res) =>
  Helper.updateItem(res, "reader", req.body, req.params.id);

exports.delete = async (req, res) =>
  Helper.deleteItem(res, "reader", req.params.id);
