var express = require('express');
var formidable = require('formidable');

var router = express.Router();

// define the home page route
router.post('/', async function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    console.log(fields, files);
  });

  form.on('fileBegin', function (name, file) {
    file.path = process.cwd() + '/upload/' + file.name;
  });
  form.on('file', function (name, file) {
    console.log('Uploaded ' + file.name);
  });

  res.sendStatus(204);
});

module.exports = router;
