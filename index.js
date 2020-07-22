const express = require('express');
const app = express();
const port = 8000;

//routing to express router
app.use('/',require("./routes"));

app.listen(port,(err)=>{
    if(err){
        console.log(`error in starting server:${err}`);
    }
    console.log(`Server is up and running at ${port}`);

});