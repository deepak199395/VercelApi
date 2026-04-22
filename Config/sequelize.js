const { Sequelize } = require("sequelize");
const dotenv = require("dotenv")
dotenv.config()

// MySQL Connection
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: false
        }

    }
)
const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database connected successfully!".cyan);
    } catch (error) {
        console.error("❌ MySQL Database connection failed!", error);
    }
};
module.exports = { sequelize, connectMySQL };
