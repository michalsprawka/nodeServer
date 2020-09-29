const port = 3000, express = require("express"), app=express();
const router = express.Router();
const homeController = require('./controllers/homeController');
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Word = require("./models/word");
const wordsController = require("./controllers/wordsController");
const flash = require('connect-flash'); //+
const session = require('express-session'); //+
const passport = require("passport"); //+
//const { receiveMessageOnPort } = require("worker_threads");

const mongoURI = "mongodb://testUser:test123@ds129352.mlab.com:29352/wordsdb";
mongoose.Promise = global.Promise;

//passport config:
require('./config/passport')(passport) //+

mongoose.connect(mongoURI);
const db = mongoose.connection;
db.once("open", ()=>{
	console.log("Succesfully connected to mongoDB using mongoose");
});

// Word.create(
// 	{itaWord: "rosso", polWord: "czerwony"},
// 	function(error, savedDocument) {
// 		if(error) console.log(error);
// 		console.log(savedDocument);
// 	}
// )

// Word.findOne({
// 	polWord: "zielony"
// },(err, data) => {
// 	if(data) console.log(data);
// });

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
		//console.log(req.session);
		// if(req.session.passport && req.session.passport.user){
		// res.locals.loggedIn = req.user;
		// } else{
		// res.locals.loggedIn = null;
		// }
		res.locals.loggedIn = req.isAuthenticated()
		res.locals.user = req.user
		next()
		})
app.use(express.json());

app.use(layouts);
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.get('/items/:vegetable', homeController.sendReqParam);
// app.get('/name/:myName', homeController.respondWithName);


// app.get("/words", wordsController.getAllWords, (req, res,next) => {
// 	//console.log(req.data);
// 	res.render("words", {words: req.data});
// })
// app.get("/addform/:ita/:pol/:id", wordsController.getAddWordPAge);
// app.get("/addform", wordsController.getAddWordPAge);
// app.post("/word", wordsController.saveWord);
// app.post("/editword/:id", wordsController.editWord);
// app.get("/random/:lang", wordsController.getRandomWord);
// app.get("/wordid/:id/:lang", wordsController.getWordWithId);
// app.get("/delword/:id", wordsController.deleteWord);
app.use('/',require('./routes/index')); //+
app.use('/dict', wordsController)
app.use('/users',require('./routes/users')); //+
app.use('/notes',require('./routes/notes'));

app.listen(port, "192.168.1.178", () =>{
	console.log(`Server runing on port: ${port}`);
});
