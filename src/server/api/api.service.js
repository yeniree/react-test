const axios = require("axios");
URL_API = "https://api.mercadolibre.com";

exports.getAll = async (query) => {
  return axios
    .get(`${URL_API}/sites/MLA/search?q=${query}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

exports.getItem = async (id) => {
  return axios
    .get(`${URL_API}/items/${id}`)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
};

exports.getItemDescription = async (id) => {
  return axios
    .get(`${URL_API}/items/${id}/description`)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
};
