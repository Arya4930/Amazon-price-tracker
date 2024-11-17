import Sequelize from 'sequelize'

const Tracking = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    port: 5432,
    storage: 'tracking.sqlite'
});

const TrackingLinks = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    port: 5432,
    storage: 'trackinglinks.sqlite'
});

try {
    await Tracking.authenticate();
    await TrackingLinks.authenticate();
    console.log("| ✅ Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database: ", error);
}

export { Tracking, TrackingLinks }