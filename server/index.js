const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/', router);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))