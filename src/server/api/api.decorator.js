exports.getAll = function (item) {
  return {
    author: author,
    categories: getCategories(item),
    items: item.results.map((results) => {
      return {
        id: results.id,
        title: results.title,
        price: getPrices(results),
        picture: results.thumbnail,
        condition: results.condition,
        free_shipping: results.shipping.free_shipping,
      };
    }),
  };
};

exports.getItem = function (item, description) {
  return {
    author: author,
    items: {
      id: item.id,
      title: item.title,
      price: getPrices(item),
      picture: item.pictures[0].url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text,
    },
  };
};

const author = {
  name: "Yeniree",
  lastname: "Sanchez",
};

getPrices = (item) => {
  return {
    currency: item.currency_id,
    amount: Math.trunc(item.price),
    decimals: item.price,
  };
};

getCategories = (item) => {
  let filter = [];
  if (item.filters && item.filters.length > 0) {
    filter = item.filters;
  } else {
    filter = item.available_filters;
  }
  const categories = filter.find((f) => f.id === "category");

  if (categories && categories.values) {
    const values = categories.values.find((v) => v.path_from_root);
    if (values && values.path_from_root) {
      return values.path_from_root.map((p) => p.name);
    }
  }
  return [];
};
