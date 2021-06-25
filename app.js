const express = require('express');
const cors = require('cors');
const app = express();

//Dummy Database
let items = [
    {
        id: 1,
        task: "Go to the shops"
    },
    {
        id: 2,
        task: "Create an API with express"
    }
];

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.get('/items', (req,res)=>{
    res.json(items)
});

app.post('/items', (req, res) => {
    let newItem = req.body;
    let newID
    // add the id to the new item
    if (items.length){
        let highestID = items[items.length -1].id;
        newID = highestID + 1;
    } else {
        newID = 1;
    }
    
    newItem = {id: newID, ...newItem};
    // newItem.id = newID;
    items.push(newItem);
    res.status(201).json(items);
});

app.delete('/items/:id', (req, res) => {
    let deleteId = req.params.id;
    const index = items.findIndex(item => item.id === parseInt(deleteId));
    if (index > -1) {
        items.splice(index, 1);
    }
    res.status(204).json(items);
})


module.exports = { app };