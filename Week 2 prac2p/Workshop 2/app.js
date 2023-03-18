const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Retrieving user ID: {id}`);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log(response.data);
        res.send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error recieved');
    }
});

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.listen(PORT, () => {
    console.log(`Microservice listening at http://localhost:${PORT}`);
    console.log()
});