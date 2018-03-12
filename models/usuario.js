var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UsuarioSchema = new mongoose.Schema({});

UsuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Usuario", UsuarioSchema);