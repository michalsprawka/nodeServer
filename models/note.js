const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    body: String,
    date :{
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model("Note", noteSchema);