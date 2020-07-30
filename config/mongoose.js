const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost/codiel_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to MongoDB"));

db.once('open',()=>{
    console.log("Sucessfully connected to MongoDB");
});

module.exports = db;