const express = require('express');
const bodyParser = require('body-parser');
const categoryRoute = require('./routes/category');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use('/category', categoryRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
