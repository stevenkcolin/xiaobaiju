var mongoose = require( 'mongoose' );

var dbconfig = require('../config/nonsqlDB.json')
// Build the connection string
var dbURI = dbconfig.protocol + '://' + dbconfig.host + '/' + dbconfig.database;
// Create the database connection
mongoose.connect(dbURI, {user: dbconfig.username, pass: dbconfig.password});

mongoose.set('debug', true);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});