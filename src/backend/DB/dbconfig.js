import Sequelize from 'sequelize'

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite", // SQLite only
});

try {
    await sequelize.authenticate();
    console.log("| ✅ Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database: ", error);
}

// Define the 'tracking' model
const tracking = sequelize.define("tracking", {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    price_INR: Sequelize.INTEGER,
    price_USD: Sequelize.INTEGER,
    product_image: Sequelize.STRING,
    product_url: Sequelize.STRING,
});

await tracking.sync();
console.log("| ✅ Table synced");

export default tracking