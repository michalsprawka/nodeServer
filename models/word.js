const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
	itaWord: {
        type: String,
        required: true
    },
	polWord: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Word", wordSchema);