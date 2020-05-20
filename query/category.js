const knex = require('../db/knex');
const BaseQuery = require('./baseQuery');


const TABLE_NAME = 'category';
const query = new BaseQuery(TABLE_NAME);

module.exports = query;
