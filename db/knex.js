var db = require('./db');
var knex = require('knex')(db);

module.exports = knex;
