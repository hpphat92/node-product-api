const knex = require('../db/knex');
const BaseEntityQuery = require('./base/baseEntityQuery');

const TABLE_NAME = 'productCategory';
const TABLE_CATEGORY = 'category';
const query = new BaseEntityQuery(TABLE_NAME);


query.getCategoryByProductId = function (productId) {
  return knex(TABLE_NAME)
    .where({
      productId
    })
    .join(TABLE_CATEGORY,
      `productCategory.categoryId`,
      `category.id`)
};

module.exports = query;



