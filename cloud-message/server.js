"use strict"; 
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
var admin = require('firebase-admin');
const _ = require('lodash');

const app = express(); 
//handle json
app.use(bodyParser.json());
//https://milefreeplan.firebaseio.com/
var serviceAccount = require("./MiLeFreePlan-b19a05ba61ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://milefreeplan.firebaseio.com"
});



app.get('/cloud-message/auth-user/:id', (req, res) => { 


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

app.post('/cloud-message/push', (req, res) => { 

    var body = _.pick(req.body, ['token','message']);
    var payload = {
        data: {
            title: body.message,
            time: "2:45"
        }
};
    // Send a message to the device corresponding to the provided
// registration token.
admin.messaging().sendToDevice(body.token, payload)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
    res.status(200).send(response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
    res.status(200).send(error);
  });


});



//server start listen 
const port = process.env.PORT;
app.listen(process.env.PORT,()=>{
    console.log(`Started on port ${port}`);
});