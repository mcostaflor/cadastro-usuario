
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://xmwcvzef:N8q8_tmoFvS2Q-aI344YeZsVoZoj-AB-@chunee.db.elephantsql.com/xmwcvzef');

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

module.exports = sequelize;