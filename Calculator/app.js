const express = require("express")
const app = express();

app.get('/', (req, res) => {        
    res.send("Welcome to our server!!");
}); 

app.get('/addition/:num1/:num2', (req, res) => {
    num1 = req.params.num1;
    num2 = req.params.num2;
    if (isNaN(num1) || isNaN(num2)) {
        res.send("Please enter a valid number");
    }
    res.send(`The sum of ${num1} and ${num2} is ${parseInt(num1) + parseInt(num2)}`);
});

app.get('/subtraction/:num1/:num2', function(req, res) {
    num1 = req.params.num1;
    num2 = req.params.num2;
    if (isNaN(num1) || isNaN(num2)) {
        res.send("Please enter a valid number");
    }
    res.send(`The sum of ${num1} and ${num2} is ${parseInt(num1) - parseInt(num2)}`);
});

app.get('/division/:num1/:num2', (req, res) => {
    num1 = req.params.num1;
    num2 = req.params.num2;
    if (isNaN(num1) || isNaN(num2)) {
        res.send("Please enter a valid number");
    }
    res.send(`The sum of ${num1} and ${num2} is ${parseInt(num1) / parseInt(num2)}`);
});

app.get('/multiplication/:num1/:num2', (req, res) => {
    num1 = req.params.num1;
    num2 = req.params.num2;
    if (isNaN(num1) || isNaN(num2)) {
        res.send("Please enter a valid number");
    }
    res.send(`The sum of ${num1} and ${num2} is ${parseInt(num1) * parseInt(num2)}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});
