const knex = require('../db/knex');


const TABLE_NAME = 'category';

function convertNameToSlug(str, separator) {
  str = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .replace(/-+/g, '-');
  if (separator) {
    return str.replace(/-/g, separator);
  }
  return str;
}

function getCategories({ orderBy = 'name', orderDirection = 'asc' } = {}) {
  return knex(TABLE_NAME)
    .select()
    .orderBy(orderBy, orderDirection);
}

function getCategoryById(id) {
  return knex(TABLE_NAME)
    .select()
    .where({
      id
    })
    .first();
}

async function createCategory(model) {
  model.slug = model.slug || convertNameToSlug(model.name);

  const duplicateCategories = await knex(TABLE_NAME)
    .where({
      slug: model.slug
    });

  if (duplicateCategories && duplicateCategories.length) {
    model.slug += Date.now();
  }
  return knex(TABLE_NAME).insert(model);
}

function updateCategory(model) {
  return knex(TABLE_NAME)
    .where({ id: model.id })
    .update(model);
}

function checkNameExisting(categoryName, ignoreCategoryId) {
  let queryBuilder = knex(TABLE_NAME)
    .where({
      name: categoryName
    });
  if (ignoreCategoryId) {
    queryBuilder = queryBuilder
      .whereNot({
        id: ignoreCategoryId
      })
  }


  return queryBuilder;
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  getCategoryById,
  checkNameExisting
};
