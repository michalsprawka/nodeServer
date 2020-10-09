const port = 3000, express = require("express"), app=express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Word = require("./models/word");
const flash = require('connect-flash'); //+
const session = require('express-session'); //+
const passport = require("passport"); //+
const dotenv = require('dotenv');

dotenv.config();
//console.log("FROM ENV",process.env.DBUSER, process.env.DBPASS);
const mongoURI = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds129352.mlab.com:29352/wordsdb`;
//mongoose.Promise = global.Promise;

require('./config/passport')(passport) //+

mongoose.connect(mongoURI);
const db = mongoose.connection;
db.once("open", ()=>{
	console.log("Succesfully connected to mongoDB using mongoose");
});


app.use(
	express.urlencoded({
	  extended: false
	})
  );


app.use(session({ //+
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize()); //+
app.use(passport.session()); //+
app.use(flash()); //+
app.use((req,res,next)=> { //+
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
app.use(function (req, res, next) {
		res.locals.loggedIn = req.isAuthenticated()
		res.locals.user = req.user
		next()
		})

app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.set("view engine", "ejs");


app.use('/',require('./routes/index')); //+
app.use('/dict', require('./routes/words'))
app.use('/users',require('./routes/users')); //+
app.use('/notes',require('./routes/notes'));
app.use('/api/words',require('./routes/api/words'));

app.listen(port, "192.168.1.178", () =>{
	console.log(`Server runing on port: ${port}`);
});
