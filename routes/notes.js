const express = require('express');
const router  = express.Router();
const {ensureAuthenticated, ensureIsAdmin} = require('../config/auth') 
const Note = require('../models/note');
//login page
router.get('/', (req,res)=>{
    Note.find({})
    .exec()
    .then(data => {
        res.render('notes_welcome', {notes: data});
    })
    
})

router.get('/addform', (req,res) => {
    res.render("notes_addnote")
})

router.post('/newnote', (req,res) => {
    console.log("BODY IN ADD NEW NOTE:  ",req.body);
    let newNote = new Note({
        title: req.body.title,
        body: req.body.body
    })
    newNote.save()
    .then( _ => {
        req.flash('success_msg','Dodałaś nowy wpis');
        res.redirect("/notes");
    })
    .catch(error => {
        if(error) res.send(error);
    })
})

router.get('/delnote/:id', (req, res) => {
    Note.findOneAndDelete({_id: req.params.id})
    .exec()
    .then(_ => {
        Note.find({})
        .exec()
        .then(data => {
        res.render('notes_welcome', {notes: data});
        })
    })
})

module.exports = router; 