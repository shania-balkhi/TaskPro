//require the library
const mongoose = require('mongoose');

//connect to the database
// mongoose.connect('mongodb+srv://balkhishania:shania808@cluster0.3dayi33.mongodb.net/test').then(function(result){
//     console.log("connected");
// }).catch(function(error){
//     console.log("error", error);
// });

// mongoose.connect('mongodb://localhost/contacts_list_db');
// mongoose.connect('mongodb://0.0.0.0/contacts_list_db');  --- works!
mongoose.connect('mongodb://127.0.0.1/contacts_list_db'); /* --- works! */

//acquire the connection (to check if it is succesful)
const db = mongoose.connection;

//if there is an error in connection, then print error
db.on('error', console.error.bind(console, 'error connecting to db'));

//if the connection is up and running, then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
});