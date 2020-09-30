const express = require("express");

const app = express();

const port = 8000;

app.get('/', (req,res)=> {
    return res.send('helloWOld');
});

 app.get('/hi', (req,res)=> {
    return res.send('helloWOld');
});

app.listen(port , () =>{
    console.log("Server is up");
})



