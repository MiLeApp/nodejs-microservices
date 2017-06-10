"use strict"; 
require('./config/config');
const express = require('express'); 
const app = express(); 
app.get('/', (req, res) => {    
   res.status(200).send('Hello world node service!');
});
app.listen(process.env.PORT);