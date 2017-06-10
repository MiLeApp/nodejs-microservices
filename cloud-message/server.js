"use strict"; 
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
var admin = require('firebase-admin');

const app = express(); 
//handle json
app.use(bodyParser.json());
//https://milefreeplan.firebaseio.com/
var serviceAccount = require("./MiLeFreePlan-b19a05ba61ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://milefreeplan.firebaseio.com"
});



app.get('/cloud-message/:id', (req, res) => { 


    var id  = req.params.id;   

    admin.auth().verifyIdToken(id)
    .then(function(decodedToken) {
        var uid = decodedToken.uid;
        res.status(200).send(decodedToken);
        // ...
    }).catch(function(error) {
        // Handle error
        
          res.status(200).send('cloud-message service! ' + error);
    });

    
});

//server start listen 
const port = process.env.PORT;
app.listen(process.env.PORT,()=>{
    console.log(`Started on port ${port}`);
});