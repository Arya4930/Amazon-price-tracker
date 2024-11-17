import { Tracking } from "./dbconfig.js";
import Sequelize from 'sequelize'

const tracking = Tracking.define("tracking", {
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
console.log("| ✅ Table Tracking synced");

export default tracking