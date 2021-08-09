const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
);

app.use(cors());
app.use(express.json({ limit: '50mb' }))

const port = 3005;

const users = require('./routes/users');
app.use('/users', users);

app.listen(port, () => {
  console.log(`App listening at http://127.0.0.1:${port}`)
});