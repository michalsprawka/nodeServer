const Word = require("../../models/word");
const express = require('express');
const router = express.Router();

router.get('/all', (req, res)=> {
    Word.find({})
    .exec()
    .then(data => {
            res.json(data)   
    })
})

router.get('/randomword/', (req, res) => {
    Word.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Word.findOne().skip(random).exec(
          function (err, result) {
            // Tada! random user
            console.log(result) 
            res.json(result)   
          })
      })
})

router.post('/add', (req, res) => {
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
                res.json(result);
            }
            )
            .catch(error => {
             if(error) res.json(error);
             })
        } else {
            console.log("istnieje", found);
            res.json({message: "Word exist"});

        }// end of if res
    })  
})

module.exports = router;