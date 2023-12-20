import express from 'express';
import Database from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const tasks = await Database.loadMany();
  let totalarea = ""
  res.render('listTasks.ejs', { tasks, totalarea });
});

app.post("/add", async function (req, res) {
  const newcolonne = new Database();
  newcolonne.name = req.body.piece
  newcolonne.length = req.body.longueur
  newcolonne.width = req.body.largeur
  await newcolonne.save();
  res.redirect('/');
});


app.post("/calcul", async function (req, res) {
  const colonnes = await Database.loadMany();
  let totalarea = 0
  for(elem of colonnes){
    let area = elem.length * elem.width 
    totalarea += area 
  }
  res.render('listTasks.ejs', { tasks : colonnes, totalarea });
});

app.post("/calculoneroom", async function (req, res) {
  const colonnes = await Database.loadMany();
  let totalarea = 0
  for(elem of colonnes){
    let area = elem.length * elem.width 
    totalarea += area 
  }
  res.render('newroom.ejs', { tasks : colonnes, totalarea });
});

app.get("/addapiece", async function(req,res){
  const colonnes = await Database.loadMany();
  let totalarea = 0
  for(elem of colonnes){
    let area = elem.length * elem.width 
    totalarea += area 
  }
  res.render("newroom.ejs",{ tasks : colonnes, totalarea}) 
})

app.get("/delete/:id", async function (req, res) {
  await Database.delete({ id: req.params.id });
  res.redirect('/');
});

app.use(express.static('public'))

app.listen(4000);