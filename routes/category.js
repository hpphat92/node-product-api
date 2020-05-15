var express = require('express')
var query = require('../query/category');

var router = express.Router();

async function checkCategoryExisting(res, name, ignoreCategoryId) {
  const categories = await query.checkNameExisting(name, ignoreCategoryId);

  // Check duplicate
  if (categories && categories.length) {
    res.status(400).send('Category name exists');
  }
}


// define the home page route
router.get('/', function (req, res) {
  query.getCategories(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
});
// define the about route
router.get('/:id', function (req, res) {
  const id = req.param('id');
  query.getCategoryById(id)
    .then((response) => {
      console.log('response', response);
      res.status(200).send(response);
    }, (err) => {
      console.log('err', err);
    })
});
router.put('/', async function (req, res) {
  const body = req.body;

  await checkCategoryExisting(res, body.name, body.id);

  query.updateCategory(body)
    .then((response) => {
      res.sendStatus(200);
    }, (err) => {
      res.status(400).send('Error during updating category');
    })

});
router.post('/', async function (req, res) {
  const body = req.body;

  await checkCategoryExisting(res, body.name);

  query.createCategory(body)
    .then((response) => {
      console.log('response', response);
      res.status(200).send(response);
    }, (err) => {
      res.status(400).send('Error during creating category');
    })

});
module.exports = router;
