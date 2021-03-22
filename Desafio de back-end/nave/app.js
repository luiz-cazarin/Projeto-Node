// arquivo principal
// carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routers/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// configuracoes
    // Sessao
        app.use(session({
            secret: "navers",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // middleware
        app.use((req,  res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.erro_msg = req.flash("error_msg")
            next()
        })
    // bodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/bdnavers").then(() => {
          console.log("Conectado ao mongo")  
        }).catch(err => {
            console.log("Erro: "+err)
        })
    // public
        app.use(express.static(path.join(__dirname, "public")))
        app.use((req, res, next) => {
            next()
        })
// rotas
    // informando pro app o local da rotas
    // quando um grupo de rotas e criado, e passado um prefixo para essas rotas
        app.get('/', (req, res) => {
            res.redirect('/admin/')
        })
        app.use('/admin', admin)
// outros
const PORT = 8081
// passando uma funcao de callback
app.listen(PORT, () => {
    console.log("Servidor rodando")
})