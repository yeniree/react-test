const HttpStatus = require("http-status-codes");
const services = require("./api.service");
const decorators = require("./api.decorator");

exports.getAll = async (req, res, next) => {
  let response = {};
  let query = "";
  let data = null;
  try {
    if (req.query) {
      query = req.query.q;
    }
    response = await services.getAll(query);
    if (response && response.data) {
      data = decorators.getAll(response.data);
    }
    return data ? res.send(data) : res.status(HttpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
  let response = {};
  let id = "";
  let data = null;
  let item = null;
  try {
    if (req.params) {
      id = req.params.id;
    }
    response = await services.getItem(id);
    if (response && response.data) {
      item = response.data;
      response = await services.getItemDescription(id);
      if (response && response.data) {
        data = decorators.getItem(item, response.data);
      }
    }
    return data ? res.send(data) : res.status(HttpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
