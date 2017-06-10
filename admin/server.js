"use strict"; 
require('./config/config');
const express = require('express'); 
const app = express(); 
app.get('/admin', (req, res) => {    
   res.status(200).send('Admin service!');
});
app.listen(process.env.PORT);