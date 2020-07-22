const express = require('express');
const app = express();
const port = 8000;

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