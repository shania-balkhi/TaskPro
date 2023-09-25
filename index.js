const express = require('express');
const path = require('path');
const port = 8002;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

//we need to fire up express -- to get all the functionalities of express, usually the naming convention is 'app'
const app = express(); //now, this 'app' has all the functionalities of these libraries which are needed to run a server

app.set('view engine', 'ejs');  //using app.set(), we are 'setting a value for a property'. eg: setting value(ejs) for property(view enginer)
//also, view == template. so, view engine and template engine are the same thing
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded()); //use signifies middleware //url.encoded() reads only form data that has been submitted, not the params
//middleware - a middleware is simply a function which also has access to your request, 
// your response and it cas analyze or pre-process the data present in the request or response
//find more info about it and why do we need it in the lecture video
app.use(express.static('assets')); //to access static files


// //middleware1
// app.use(function(req, res, next){
//     req.myName="Arpan";
//     // console.log('middleware 1 called');
//     next();
// });

// //middleware2
// app.use(function(req, res, next){
//     console.log('My Name from MW2 is :', req.myName);
//     // console.log("middleware 2 called");
//     next();
// });

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "0987654321"
    }
]

app.get('/', function(req, res){
    // console.log("from the get route controller",req.myName);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
        }

        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });

    });

});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    //push into database (collection)
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err, newContact){
        if (err){
            console.log('error in creating a contact!');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
    // return res.redirect('back');
});

//as part of mini_assignment --- works!
// app.get('/shania', function(req, res){
//     res.send("<h1>Cool, Hey Broooooooooooooooooo?</h1>");
// });


//for deleting a contact
app.get('/delete-contact', function(req, res){
     //get the id from query in the url
     let id = req.query.id;

    
    //  let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactList, 1);
    // }

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('/');

    });

    // return res.redirect('/');

});




app.listen(port, function(err){
    if(err){
        console.log("Error in running the server ", err);
    }
    
    console.log("Yup! My Express Server is running on port : ", port);
});