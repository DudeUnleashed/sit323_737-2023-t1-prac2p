const express = require("express")
const app = express();

app.get('/', (req, res) => {        
    res.send("Welcome to our server!!");
}); 

app.get('/jake', (req, res) => {
    res.send("Hello Jake");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});
