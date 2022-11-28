const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({extended:true}));
// mondodb connection locally
// mongoose.connect('mongodb://localhost:27017/cricket').then(() => "mongob connection successfully").then((err) => console.log(err));
mongoose.connect("mongodb+srv://user-abhi:user-password@cluster0.sg7jamx.mongodb.net/cricket"
).then(() => console.log("mongob connection successfully")).then((err) => console.log(err));
// creating cricket schema
const cricketSchema = new mongoose.Schema({
  name:String,
  team:String,
  shirtNumber:Number
});

// creating a modal
const Cricket = new mongoose.model("Cricket",cricketSchema);

const cricketArray = [
  {name:"Sachin",team:"India",shirtNumber:10},
  {name:"Buttler",team:"England",shirtNumber:15},
  {name:"Finch",team:"Australia",shirtNumber:22},
  {name:"Rabada",team:"South Africa",shirtNumber:7},
  {name:"Pollard",team:"West Indies",shirtNumber:12},
];

// Cricket.insertMany(cricketArray);

// for all routes:

// get request to get get all data
app.get("/cricket", (req, res) => {
  Cricket.find((err,foundPlayer) =>{
    if(!err){
      res.send(foundPlayer);
      console.log(foundPlayer);
    }

    else{
      console.log(err);
    }
  })
});


// post request to post a data or add a new player
app.post("/cricket", (req, res) => {
  console.log(req.body);

  const newCricketer = Cricket({
    name:req.body.name,
    team:req.body.team,
    shirtNumber:req.body.shirtNumber
  });

  newCricketer.save((err) =>{
    if (!err) {
      console.log("player added successfully");
      res.send("player added successfully");
    }

    else{
      console.log(err);
      res.send(err);
    }
  })

});

// delete request to delete all data
app.delete("/cricket", (req, res) => {
  Cricket.deleteMany((err) =>{
    if(!err){
      res.send("all players details are deleted");
      console.log("all player details are deleted");
    }

    else{
      console.log(err);
    }
  })
});


// for separate route

// find one player either by id or by player name
app.get("/cricket/:player",(req,res)=>{
  const playerName = req.params.player;
  Cricket.findOne({name:playerName},(err,foundPlayer) =>{
    if (!err) {
      res.send(foundPlayer);
      console.log(foundPlayer);
    }

    else{
      res.send(err + "no player found");
      console.log(err + "no player found");
    }

  });
})


// put for updating whole document
app.put("/cricket/:player",(req,res)=>{
  const playerName = req.params.player;
  Cricket.updateOne({name:playerName},{name:req.body.name, team:req.body.team, shirtNumber:req.body.shirtNumber},(err) =>{
    if (!err) {
      res.send("selected player updated successfully");
      console.log("selected player updated successfully");
    }

    else{
      res.send(err + "some problem in updating seleced player");
      console.log(err + "some problem in updating seleced player");
    }

  });
})

app.patch("/cricket/:player",(req,res)=>{
  const playerName = req.params.player;
  Cricket.updateOne({name:playerName},{$set:req.body},(err) =>{
    if (!err) {
      res.send("selected player updated successfully");
      console.log("selected player updated successfully");
    }

    else{
      res.send(err + "some problem in updating seleced player");
      console.log(err + "some problem in updating seleced player");
    }

  });
})


app.delete("/cricket/:player",(req,res)=>{
  const playerName = req.params.player;
Cricket.deleteOne({name:playerName},(err)=>{
  if (!err) {
    res.send("selected player deleted successfully");
    console.log("selected player deleted successfully");
  }

  else{
    res.send( err + "selected player not deleted successfully");
    console.log( err + "selected player not deleted successfully");
  }

})

});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

