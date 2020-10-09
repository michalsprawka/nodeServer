//UNDER CONSTRUCTION

const Word = require("../models/word");
const express = require('express');
const router = express.Router();

 var getAllWords = (req, res, next) => {
    // Word.find( {},(error, words)=>{
    //     if(error) next(error);
    //     req.data = words;
    //     next();
    // });
    Word.find({})
    .exec()
    .then(data => {
        if(req.query.format == "json"){
            res.json(data)
        }else{
            res.render("words", {words: data});
        }    
    })
};

router.get('/words', getAllWords)

 var getAddWordPAge = (req, res) => {
    if(req.params.ita){
        res.render("editword", {info : "", ita:req.params.ita, pol:req.params.pol, id:req.params.id});
    }else {
        res.render("addword", {info : ""});
    }
   
};

router.get('/addform/:ita/:pol/:id', getAddWordPAge)
router.get('/addform', getAddWordPAge)

var saveWord = (req, res)=> {
    console.log(req.body);
    let newWord = new Word({
        itaWord: req.body.itaword,
        polWord: req.body.polword
    })
    Word.findOne({itaWord: newWord.itaWord})
    .exec()
    .then(found => {
        if(!found){
            console.log("FOUND", found)
            newWord.save()
            .then(result => {
                res.render("addword", {info : "Dzięki :)"});
            }
            )
            .catch(error => {
             if(error) res.send(error);
             })
        } else {
            console.log("istnieje", found);
            res.render("addword", {info : "Słowo istnieje (:"});

        }// end of if res
    })  
};

router.post('/word', saveWord)

var editWord = (req, res)=> {
    console.log(req.body);
    let newWord = new Word({
        itaWord: req.body.itaword,
        polWord: req.body.polword
    })
    Word.findById(req.params.id)
    .exec()
    .then(doc => {
        doc.itaWord = newWord.itaWord,
        doc.polWord = newWord.polWord
        doc.save().then(result=>{res.render("thanks")});
    })
//     Word.findOne({itaWord: newWord.itaWord})
//     .exec()
//     .then(found => {
//         if(!found){
//             console.log("FOUND", found)
//             newWord.save()
//             .then(result => {
//                 res.render("addword", {info : "Dzięki :)"});
//             }
//             )
//             .catch(error => {
//              if(error) res.send(error);
//              })
//         } else {
//             console.log("istnieje", found);
//             res.render("addword", {info : "Słowo istnieje (:"});

//         }// end of if res
//     })  
 };

 router.post('/editword/:id', editWord)

var getRandomWord = (req, res) => 
{
    Word.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Word.findOne().skip(random).exec(
          function (err, result) {
            // Tada! random user
            console.log(result) 
            if(req.params.lang=="ita"){
                res.render("random", {word: result.itaWord, wordid: result._id, answerLang: "pol"});
            }else {
                res.render("random", {word: result.polWord, wordid: result._id, answerLang: "ita"});
            }
            
          })
      })
};

router.get('/random/:lang', getRandomWord)


var getWordWithId = (req, res) => {
    Word.findById(req.params.id)
    .exec(
        function(err,result) {
            console.log(result);
            if(req.params.lang == "pol"){
                res.render("answer", {word: result.polWord});
            } else {
                res.render("answer", {word: result.itaWord});
            }
            
        }
    )
}

router.get('/wordid/:id/:lang', getWordWithId)



var deleteWord = (req, res)=>{
    console.log("in delete");
    Word.findOneAndDelete({_id: req.params.id})
    .exec()
    .then(resp => {
        res.render("thanks")
    })
};

router.get('/delword/:id', deleteWord)

router.get('/welcome',(req, res) => {
    res.render("dictionary_welcome")
})


module.exports  = router;