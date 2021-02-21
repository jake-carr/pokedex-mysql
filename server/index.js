const express = require('express')
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})