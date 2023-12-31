
const mongoose = require("mongoose");

 const connect = () => {
    mongoose.connect("mongodb+srv://ecomerceWeb:a%4089824249@cluster0.jtmfd0k.mongodb.net/websquare")
}

mongoose.connection.once('open', () => {
    // Access the database connection and create the index
    mongoose.connection.db.collection('users').createIndex({ location: '2dsphere' }, (err) => {
      if (err) {
        console.error('Error creating 2dsphere index:', err);
      } else {
        console.log('2dsphere index created successfully');
      }
  
      // Close the connection after creating the index
      mongoose.connection.close();
    });
  });

module.exports = connect;