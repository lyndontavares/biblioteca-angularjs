// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/livro', function (req, res) {
  console.log('I received a GET request');

  db.livros.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/livro', function (req, res) {
  console.log(req.body);
  db.livros.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/livro/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.livros.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/livro/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.livros.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/livro/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.livros.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {titulo: req.body.titulo, autor: req.body.autor, quantidade: req.body.quantidade}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");