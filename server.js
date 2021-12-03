const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


// for run 
dotenv.config();

//to Check our port
console.log(process.env.PORT);

let initial_path = path.join(__dirname, "public");

let app = express();

app.use(express.static(initial_path));




app.get('/', (req, res) => {
    
    res.sendFile("index.html");
    
})

app.get('/:id', (req, res) => {
    //console.log(req.params);
    res.sendFile(path.join(initial_path, "about.html"));
})


app.use((req, res) => {
    res.json("404");
})




const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`listening port ${port}`)
})