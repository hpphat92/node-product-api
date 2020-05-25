const knex = require('../db/knex');
const BaseQuery = require('./base/baseQuery');
var productCategoryQuery = require('./productCategory');

const TABLE_NAME = 'product';
const query = new BaseQuery(TABLE_NAME);

const oldCreate = query.create;
const oldUpdate = query.update;
const oldGetById = query.getById;

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
      price
    };
    const productId = (await oldCreate(newModel))[0];
    if(productCategories){
      const md = productCategories.map(c => ({
        productId: productId,
        categoryId: c.id
      }));
      await productCategoryQuery.createMany(md);
    }
    if(productProperties){
      const md = productProperties.map(c => ({
        productId: productId,
        basicPropertyId: c.id
      }));
      await productCategoryQuery.createMany(md);
    }
    return { id: productId };
  } catch (e) {
    console.log(e);
  }
};
query.update = async (model) => {
  try {
    const {
      name,
      description,
      oldPrice,
      price,
      productCategories,
      productProperties,
      slug,
      id
    } = model;

    const updateModel = {
      name,
      description,
      oldPrice,
      price,
      id
    };
    await oldUpdate(updateModel);
    await productCategoryQuery.deleteByProductId(id);
    if(productCategories){
      const md = productCategories.map(c => ({
        productId: id,
        categoryId: c.id
      }));
      await productCategoryQuery.createMany(md);
    }
    return { id };
  } catch (e) {
    console.log(e);
  }
};
query.getById = async function (id) {
  const product = await oldGetById(id);

  const productCategory = await productCategoryQuery.getCategoryByProductId(id);
  product.productCategory = productCategory;
  return product;
}

module.exports = query;
