var express = require('express')
var query = require('../query/category');

var router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
});
// define the home page route
router.get('/list', function (req, res) {
  query.getCategories()
    .then((response) => {
      console.log('list', response);
      res.status(200).send(response);
    })
});
// define the about route
router.get('/detail/:id', function (req, res) {
  const id = req.param('id');
  query.getCategoryById(id)
    .then((response) => {
      console.log('response', response);
      res.status(200).send(response);
    }, (err) => {
      console.log('err', err);
    })
});

module.exports = router;
