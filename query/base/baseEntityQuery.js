const knex = require('../../db/knex');

function BaseEntityQuery(TABLE_NAME) {

  function getList({ orderBy = 'name', orderDirection = 'asc' } = {}) {
    return knex(TABLE_NAME)
      .select()
      .orderBy(orderBy, orderDirection);
  }

  function getById(id) {
    return knex(TABLE_NAME)
      .select()
      .where({
        id
      })
      .first();
  }

  async function create(model) {
    return knex(TABLE_NAME)
      .insert(model)
      .returning('id');
  }

  async function createMany(list) {
    return knex(TABLE_NAME)
      .insert(list)
      .returning('id');
  }

  function update(model) {
    return knex(TABLE_NAME)
      .where({ id: model.id })
      .update(model);
  }

  function deleteById(id) {
    return knex(TABLE_NAME)
      .where({
        id: id
      })
      .delete();

  }
  function deleteByProductId(productId) {
    return knex(TABLE_NAME)
      .where({
        productId
      })
      .delete();

  }

  return {
    getList,
    create,
    createMany,
    update,
    getById,
    deleteById,
    deleteByProductId,
  };
}

module.exports = BaseEntityQuery;

