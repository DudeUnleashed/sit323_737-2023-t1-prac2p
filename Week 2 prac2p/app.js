const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

let users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Bob'}
];

app.get('/', (req, res) => {        
    res.send("Welcome to our server!!");
}); 

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
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
    console.log("Update user with ID: " + req.params.id);
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
