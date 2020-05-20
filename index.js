const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRoute = require('./routes/category');
const productPropertyRoute = require('./routes/productProperty');
const productRoute = require('./routes/product');
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use('/category', categoryRoute);
app.use('/product-property', productPropertyRoute);
app.use('/product', productRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
