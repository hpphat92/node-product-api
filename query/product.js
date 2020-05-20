const knex = require('../db/knex');
const BaseQuery = require('./baseQuery');


const TABLE_NAME = 'product';
const query = new BaseQuery(TABLE_NAME);

const oldCreate = query.create;

query.create = async (model) => {
  try {
    const {
      name,
      description,
      oldPrice,
      price,
      productCategories,
      productProperties,
      slug
    } = model;

    const newModel = {
      name,
      description,
      oldPrice,
      price,
      slug
    }
    const product = await oldCreate(newModel);
    console.log(product, model);

    return product;
  } catch (e) {
    console.log(e);
  }
};

module.exports = query;
