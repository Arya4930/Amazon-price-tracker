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

export default sequelize