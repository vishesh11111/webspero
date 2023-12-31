
const mongoose = require("mongoose");

 const connect = () => {
    mongoose.connect("mongodb+srv://ecomerceWeb:a%4089824249@cluster0.jtmfd0k.mongodb.net/websquare")
}

module.exports = connect;