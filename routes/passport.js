// Importar Bibliotecas
var express  = require("express");
var router   = express.Router();
var passport = require("passport");

var Usuario  = require("../models/usuario");

// Tela Registro
router.get("/registrar", function(req, res){
  res.render("registrar");
});

// Ação Registrar
router.post("/registrar", function(req, res){
  var novoUsuario = new Usuario({username: req.body.username});
  
  Usuario.register(novoUsuario, req.body.password, function(err, Usuario){
    if(err){
      return res.redirect("/registrar");
    }
    
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

// Tela Entrar
router.get("/entrar", function(req, res){
  res.render("entrar");
});

// Ação Entrar
router.post("/entrar", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/entrar",
  failureFlash: false
}), function(req, res){
  //req.flash("Sucesso", "Bem-vindo " + req.body.username);
});

// Ação Sair
router.get("/sair", function(req, res){
  req.logout();
  res.redirect("/");
});

module.exports = router;