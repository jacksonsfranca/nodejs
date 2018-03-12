var mongoose    = require('mongoose');
var timestamp   = require('mongoose-timestamp');

var Schema      = mongoose.Schema;

var AvisoSchema = new mongoose.Schema({
  nomeCompleto: String,
  mensagem: String,
  criadorPor: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

AvisoSchema.plugin(timestamp);

module.exports = mongoose.model("Aviso", AvisoSchema);