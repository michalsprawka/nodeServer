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

module.exports = router;