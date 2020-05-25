const knex = require('../../db/knex');

function BaseQuery(TABLE_NAME) {
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

  async function generateSlug(slugName){
    const duplicateItem = await knex(TABLE_NAME)
      .where({
        slug: slugName
      });

    if (duplicateItem && duplicateItem.length) {
      slugName += `-${ Date.now() }`;
    }

    return slugName;
  }


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
    model.slug = model.slug || convertNameToSlug(model.name);


    model.slug = generateSlug(model.slug);

    return knex(TABLE_NAME)
      .insert(model)
      .returning('id');
  }

  async function update(model) {
    model.slug = model.slug || convertNameToSlug(model.name);

    model.slug = generateSlug(model.slug);

    return knex(TABLE_NAME)
      .where({ id: model.id })
      .update(model);
  }

  function deleteById(id) {
    return knex(TABLE_NAME)
      .where({
        id
      })
      .delete();

  }

  function checkExisting(name, ignoreId) {
    let queryBuilder = knex(TABLE_NAME)
      .where({
        name: name
      });
    if (ignoreId) {
      queryBuilder = queryBuilder
        .whereNot({
          id: ignoreId
        })
    }


    return queryBuilder;
  }

  return {
    getList,
    create,
    update,
    getById,
    checkExisting,
    deleteById
  };
}

module.exports = BaseQuery;

