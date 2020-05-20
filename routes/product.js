var express = require('express');
var query = require('../query/product');

var router = express.Router();

// define the home page route
router.get('/', function (req, res) {
  query.getList(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
});
// define the about route
router.get('/:id', async function (req, res) {
  const id = req.param('id');
  try {
    const category = await query.getById(id);

    if (!category) {
      res.status(404).send('Category not found');
      return;
    }

    res.status(200).send(category);
  } catch (e) {
    res.status(400).send('Error when retrieving category')
  }

});
router.delete('/:id', async function (req, res) {
  const id = req.param('id');
  try {
    const category = await query.getById(id);

    if (!category) {
      res.status(404).send('Category not found');
      return;
    }

    const deleteStt = await query.deleteById(category.id);
    console.log('deleteStt', deleteStt);
    res.sendStatus(200);

  } catch (e) {
    res.status(400).send('Error when deleting category')
  }
});
router.put('/', async function (req, res) {
  const body = req.body;

  await checkExisting(res, body.name, body.id);

  query.update(body)
    .then((response) => {
      res.sendStatus(200);
    }, (err) => {
      res.status(400).send('Error during updating category');
    })

});
router.post('/', async function (req, res) {
  const body = req.body;


  query.create(body)
    .then((response) => {
      console.log('response', response);
      res.status(200).send(response);
    }, (err) => {
      res.status(400).send('Error during creating product');
    })

});
module.exports = router;
