var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// public folder setup
app.use(express.static(path.join(__dirname, 'public')));


//session infor
app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/home', function(req, res) {
    if (req.session.user){
        res.render('home.ejs', {user: req.session.user});
    }
    else{
        console.log("redirect")
        console.log(req.session.user)
        res.redirect('/')
    }
});

app.post('/login', function(req, res){
    console.log("login body")
    console.log(req.body)
    console.log("login user")
    console.log(JSON.parse(req.body.user))
    req.session.user = JSON.parse(req.body.user)
    console.log("set session")
    console.log(req.session.user)
    // res.redirect('/home')
    res.json("yes")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
