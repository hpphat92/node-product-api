const knex = require('../db/knex');


const TABLE_NAME = 'category';


function getCategories() {
  return knex(TABLE_NAME)
    .select();
}

function getCategoryById(id) {
  return knex(TABLE_NAME)
    .select()
    .where({
      id
    })
    .first();
}

function createCategory(model) {
  return knex(TABLE_NAME).insert(model);
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById
};
