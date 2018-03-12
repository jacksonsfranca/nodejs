var express  = require("express");
var router   = express.Router();

var middleware = require("../middleware");
var Aviso = require("../models/aviso");

router.get("/", function(req, res){
  Aviso.find({}, function(err, Avisos){
  if (err){
    return res.send(404);
  }
    
  console.log(Avisos);
  res.render("dashboard", {avisos: Avisos});
  });
});

// Mostrar Tela de Novo Aviso
router.get("/msg/nova", middleware.isLogado, function (req, res){
  res.render("msg/nova");
});

router.post("/msg", middleware.isLogado, function(req, res){
  var aux        = {};
  aux            = req.body;
  aux.criadorPor = req.user._id;
  Aviso.create(aux, function(err, Aviso){
    if (err){
      return res.send(404);
    }
    
    console.log(Aviso);
    res.redirect("/");
  });
});

// Excluir Aviso
router.get("/msg/apagar/:idAviso", middleware.isLogado, function(req, res){
  Aviso.findByIdAndRemove(req.params.idAviso, function(err){
    if (err){
      return res.send(404);
    }
    res.redirect("/");
  });
});

module.exports = router;