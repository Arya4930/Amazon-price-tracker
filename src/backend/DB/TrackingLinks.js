import TrackingLinks from "./dbconfig.js";
import Sequelize from 'sequelize'

const trackinglinks = TrackingLinks.define("trackinglinks", {
    url: {
        type: Sequelize.STRING,
        unique: true
    }
});

await trackinglinks.sync();
console.log("| ✅ Table Tracking Links synced");

export default trackinglinks