const knex = require('../db/knex');
const BaseQuery = require('./base/baseQuery');


const TABLE_NAME = 'basicProperty';
const query = new BaseQuery(TABLE_NAME);

module.exports = query;
