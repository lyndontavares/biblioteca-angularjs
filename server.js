// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');

//local
//var db = mongojs('livros', ['livros']);

//user:vipangularjs sen:www010203 
//var db = mongojs('mongodb://adm:123@ds043972.mongolab.com:43972/contactlist', ['contactlist']);

//user: lyndon tavares sen:www010203
var db = mongojs( 'mongodb://adm:123@ds051170.mongolab.com:51170/db_mongo', ['livros','usuarios']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


// livros ////////////////////////////////////////////////////

app.get('/livro', function (req, res) {
  console.log('*****get LIVRO');

  db.livros.find(function (err, docs) {
  //db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/livro', function (req, res) {
  console.log('Adicionado Livro...')  ;
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


// users ////////////////////////////////////////////////////
app.get('/user', function (req, res) {
  console.log('*****get USER');
 db.usuarios.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/user', function (req, res) {
  console.log('Adicionado user...')  ;
  console.log(req.body);
  db.usuarios.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/user/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.usuarios.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/user/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.usuarios.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/user/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.usuarios.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {nome: req.body.nome, senha: req.body.senha}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
/////////////////////////////////////////////////////////////

app.listen(3000);
console.log("Server running on port 3000");