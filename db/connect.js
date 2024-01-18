const mongoose = require("mongoose");

const connectionString = "mongodb+srv://kadabo:1234@nodeexpressprojects.oghfjs8.mongodb.net/posdb?retryWrites=true&w=majority"

const connectDB = () => {
    mongoose.connect(connectionString).then(() => console.log("Database Connected!!!"))
}

module.exports = connectDB;