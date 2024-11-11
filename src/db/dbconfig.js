const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

sequelize.authenticate().then(() => {
    console.log('| ✅ Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const tracking = sequelize.define('tracking', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    price_INR: Sequelize.INTEGER,
    price_USD: Sequelize.INTEGER,
    product_image: Sequelize.STRING
});

module.exports = {
    tracking
}