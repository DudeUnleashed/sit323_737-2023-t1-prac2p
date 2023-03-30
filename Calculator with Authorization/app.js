const express = require("express")
const app = express();

const add = (n1,n2) => {
    return n1 + n2;
}
const subtract = (n1,n2) => {
    return n1 - n2;
}
const divide = (n1,n2) => {
    return n1 / n2;
}
const multiply = (n1,n2) => {
    return n1 * n2;
}

app.get('/', (req, res) => {        
    res.send("Welcome to our server!!");
}); 

app.get('/add', (req, res) => {
    try {
        n1 = parseFloat(req.query.n1);
        n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN){
            console.log()
            throw new Error("Parsing Error");
        }
        const result = add(n1,n2);
        res.status(200).json({statuscocde:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});

app.get('/subtract', function(req, res) {
    try {
        n1 = parseFloat(req.query.n1);
        n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN){
            console.log()
            throw new Error("Parsing Error");
        }
        const result = subtract(n1,n2);
        res.status(200).json({statuscocde:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});

app.get('/divide', (req, res) => {
    try {
        n1 = parseFloat(req.query.n1);
        n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN){
            console.log()
            throw new Error("Parsing Error");
        }
        const result = divide(n1,n2);
        res.status(200).json({statuscocde:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});

app.get('/multiply', (req, res) => {
    try {
        n1 = parseFloat(req.query.n1);
        n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN){
            console.log()
            throw new Error("Parsing Error");
        }
        const result = multiply(n1,n2);
        res.status(200).json({statuscocde:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});
