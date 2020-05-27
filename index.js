const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRoute = require('./routes/category');
const productPropertyRoute = require('./routes/productProperty');
const productRoute = require('./routes/product');
const uploadRoute = require('./routes/upload');
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use('/file', express.static('upload'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use('/category', categoryRoute);
app.use('/product-property', productPropertyRoute);
app.use('/product', productRoute);
app.use('/upload', uploadRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
