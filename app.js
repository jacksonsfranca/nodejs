// Importar Biblioteca do Express
var express         = require('express'); // Vai abrir o módulos do Node para virar uma dependência
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');

var passport        = require('passport');
var EstrategiaLocal = require('passport-local');

// Coleção de Usuários
var Usuario = require('./models/usuario');

// Config App
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

// Config do Passport
app.use(require('express-session')({
        secret: "j3thhash",
        resave: false,
        saveUninitialized: false
        }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new EstrategiaLocal(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

app.use(function(req, res, next) {
  res.locals.usuarioAtual = req.user;
  next();
});

// Config de rotas
var indexRoutes     = require('./routes/index');
var passportRoutes  = require('./routes/passport');

app.use("/", indexRoutes);
app.use("/", passportRoutes);

// Configuração MongoDB
mongoose.connect("mongodb://drstone:drstone@ds141766.mlab.com:41766/drstone");

app.listen(3000, "0.0.0.0", function(){
  console.log('Aplicação Rodando...');
});