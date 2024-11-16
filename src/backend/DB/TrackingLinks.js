import sequelize from "./dbconfig.js";
import Sequelize from 'sequelize'

const trackinglinks = sequelize.define("trackinglinks", {
    url: {
        type: Sequelize.STRING,
        unique: true
    }
});

await trackinglinks.sync();
console.log("| ✅ Table Tracking Links synced");

export default trackinglinks