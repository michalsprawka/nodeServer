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