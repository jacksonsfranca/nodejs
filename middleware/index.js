var Usuario = require("../models/usuario");

var middlewareObj = {};

middlewareObj.isLogado = function(req, res, next){
    if (!req.isAuthenticated()){
      return res.redirect("/entrar");
  }
    next();
};

module.exports = middlewareObj;