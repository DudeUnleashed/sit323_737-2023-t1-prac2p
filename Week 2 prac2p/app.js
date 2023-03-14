const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

let users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Bob'}
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    var id = +req.params.id;
    console.log(id);
    var user = users.find(u => u.id === id);
    console.log(user);
    res.send(user);
});

app.post('/users', jsonParser, (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', jsonParser, (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    users = users.map(user => user.id === userId ? updatedUser : user);
    res.status(200).json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});
