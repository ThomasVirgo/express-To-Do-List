const express = require('express');
const cors = require('cors');
const app = express();

//Dummy Database
let items = ['go shops', 'write an api'];

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.get('/items', (req,res)=>{
    res.json(items)
});

app.post('/items', (req, res) => {
    let newItem = req.body;
    items.push(newItem);
    res.json(items);
});

app.delete('/items', (req, res) => {
    let deleteItem = req.body;
    const index = array.indexOf(deleteItem);
    if (index > -1) {
        items.splice(index, 1);
    }
})


module.exports = { app };