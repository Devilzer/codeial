const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

//creating layouts
app.use(expressLayouts);
// extract script and style from subPages of layout
app.set('layout extractStyles',true); 
app.set('layout extractScripts',true);

//setting up static files routes
app.use(express.static('./assets'));

//routing to express router
app.use('/',require("./routes"));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//starting the Server
app.listen(port,(err)=>{
    if(err){
        console.log(`error in starting server:${err}`);
    }
    console.log(`Server is up and running at ${port}`);

});