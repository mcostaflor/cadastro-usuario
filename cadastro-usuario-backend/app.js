const express = require('express');
const cors = require('cors');
const app = express();

const config = require('./app.config.json');

app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const users = require('./routes/users');
app.use('/users', users);

app.listen(config.port, config.host, () => {
  console.log(`App listening at http://${config.host}:${config.port}`)
});