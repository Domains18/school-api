const mongoose = require("mongoose");
const colors = require("colors");


const databaseInstance = async () => {
    try {
        const instance = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Database is connected to ${instance.connection.host}`.red.underline);
    } catch (error) {
        console.log(error);
    }
}


module.exports = databaseInstance;
