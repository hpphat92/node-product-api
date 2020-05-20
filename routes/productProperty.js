var express = require('express');
var query = require('../query/productProperty');

var router = express.Router();

async function checkExisting(res, name, ignoreProductPropertyId) {
  const categories = await query.checkExisting(name, ignoreProductPropertyId);

  // Check duplicate
  if (categories && categories.length) {
    res.status(400).send('Property name exists');
  }
}


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
    const productProperty = await query.getById(id);

    if (!productProperty) {
      res.status(404).send('Property not found');
      return;
    }

    res.status(200).send(productProperty);
  } catch (e) {
    res.status(400).send('Error when retrieving property list')
  }

});
router.delete('/:id', async function (req, res) {
  const id = req.param('id');
  try {
    const productProperty = await query.getById(id);

    if (!productProperty) {
      res.status(404).send('Property not found');
      return;
    }

    const deleteStt = await query.deleteById(productProperty.id);
    console.log('deleteStt', deleteStt);
    res.sendStatus(200);

  } catch (e) {
    res.status(400).send('Error when deleting property')
  }
});
router.put('/', async function (req, res) {
  const body = req.body;

  await checkExisting(res, body.name, body.id);

  query.update(body)
    .then((response) => {
      res.sendStatus(200);
    }, (err) => {
      res.status(400).send('Error during updating property');
    })

});
router.post('/', async function (req, res) {
  const body = req.body;

  await checkExisting(res, body.name);

  query.create(body)
    .then((response) => {
      console.log('response', response);
      res.status(200).send(response);
    }, (err) => {
      res.status(400).send('Error during creating property');
    })

});
module.exports = router;
