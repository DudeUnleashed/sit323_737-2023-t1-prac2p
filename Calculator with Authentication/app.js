const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

const users = require('./user.json');
const jwttoken = require('./jwt.json');

var fs = require('fs');

const passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(
    'signup', new localStrategy(
        { usernameField: "email", passwordField: "password" },
        (email, password, done) => {
            if (!password || !email) {
                done(null, false, { message: "you are missing an email or password", });
            } else {
                let newUser = { email, password };
                users.push(newUser);
                fs.writeFile("user.json", JSON.stringify(users), (err) => {
                    if (err) return done(err);
                });
                done(null, newUser, { message: "new user successfully signed up" });
            }
        }
    )
);

passport.use(
    'login', new localStrategy(
        { usernameField: "email", passwordField: "password" },
        (email, password, done) => {
            const user = users.find((user) => user.email === email);
            if (!user) { return done(null, false, { message: "user not found" }); }
            if (password !== user.password) { return done(null, false, { message: "invalid login" }); }
            return done(null, user, { message: "successful login" });
        }
    )
);

passport.use(
    new JWTStrategy({
        secretOrKey: "KEY",
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt')
    }, async (token, done) => {
        return done(null, token.user);
    })
)

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

app.post('/verify', (req,res) => {
    const body = {email: "Jake"};
    const token = jwt.sign({user: body}, "KEY");
    console.log(token);
    res.send(token)
})

app.post('/login', function(req, res, next) {
    passport.authenticate('login', (err, user, info) => {
        if (err) {return next(err);}
        if (!user){return res.redirect(`/status?message=${info.message}`);}
        const body = {email: user.email};
        const token = jwt.sign({user: body}, "KEY");
        fs.writeFile('jwt.json', JSON.stringify({Authorization: token}),
        (err) => {if (err) throw err;});
        return res.redirect(`/status?message=${info.message}`);
    })(req,res,next);
});

app.post('/signup', (req,res,next) => {
    passport.authenticate('signup', (err,user,info) => {
        if (err) {return next(err);}
        if(!user) {return res.redirect(`/status?message=${info.message}`);}
        const body = {email: user.email};
        const token = jwt.sign({user: body}, "KEY");
        fs.writeFile('jwt.json', JSON.stringify({Authorization: token}),
        (err) => {
            if (err) throw err;
        });
        return res.redirect(`/status?message=${info.message}`);
    })(req,res,next);
})

app.get('/', (req, res) => {        
    res.send('welcome to the server');
}); 

app.get('/status', (req,res) => {
    res.send(`status: ${req.query.message}`);
})

app.get('/add', passport.authenticate("jwt", {session: false}), (req, res) => {
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

app.get('/subtract', passport.authenticate("jwt", {session: false}), function(req, res) {
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

app.get('/divide', passport.authenticate("jwt", {session: false}), (req, res) => {
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

app.get('/multiply', passport.authenticate("jwt", {session: false}), (req, res) => {
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
