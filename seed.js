//<pass> w mongoAtlasUri is current password to new database - dictionary
// this script generates error (validation error) but load dictionary


fs = require('fs');
const mongoose = require("mongoose");
const Word = require("./models/word");
const mongoAtlasUri = "mongodb+srv://test:<pass>@cluster0.rz656.mongodb.net/dictionary?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;


var words = [
//     {itaWord: "rosso", polWord: "czerwony"},
//     {itaWord: "verde", polWord: "zielony"},
//    {itaWord: "giallo", polWord: "szary"},
];

fs.readFile('./slownik.txt','utf8',function(err,data){
    if(err){
        return console.log(err);
    }
    let parole ={};
    let wordsFormFile = data.split('\n');
   
    for(let i = 0; i<wordsFormFile.length-1; i+=2){
        //   console.log(typeof(words[i]));
          parole.itaWord = wordsFormFile[i].trim();
          parole.polWord = wordsFormFile[i+1].trim();
          words.push({...parole});  
       }

//     console.log(words);

   mongoose.connect(mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
   db.once("open", ()=>{
	console.log("Succesfully connected to mongoDB using mongoose");
   });
  

   Word.deleteMany()
   .exec()
   .then(() => {
       console.log("Words data is empty!");
   })

    var commands = [];

   words.forEach((c) => {
       commands.push(Word.create({
           itaWord: c.itaWord,
           polWord: c.polWord
       }))
   })

   Promise.all(commands)
   .then(r => {
       console.log(JSON.stringify(r));
       db.close();
   })
   .catch(error => {
       console.log(`ERRORR: ${error}`);
   });

})

