const express =  require("express")
const router = express.Router()
const mongoose = require("mongoose")
// carregando models
require("../models/Projeto")
const Projeto = mongoose.model("projetos") 
require("../models/Funcionario")
const Funcionario = mongoose.model("funcionarios")

// redirecionando para a pagina principal
router.get('/', (req, res) =>{
    res.render("admin/index")
})

// pagina de projetos, buscando e mostrando os projetos
router.get('/projetos', (req, res) => {
    Projeto.find().sort({date: 'DESC'}).lean().populate("funcionario").then((projetos) => {
        res.render("admin/projetos", {projetos: projetos})
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar os projetos")
        res.redirect("/admin")
    })
    
})


// pagina para adicionar um novo projeto
router.get('/projetos/add', (req, res) => {
    Funcionario.find().lean().then((funcionarios)=>{
        res.render("admin/addprojetos", {funcionarios: funcionarios})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro")
        res.redirect("/admin")
    })
})


router.post('/projetos/novo', (req, res) => {

    var erros = []
    // adicionando o texto ao array de erros
    if(!req.body.nome){
        erros.push({texto: "Nome invalido"})
    }
    // verificando se ha algo adicionado no array de erros
    if(erros.length > 0) {
        res.render("admin/addprojetos", {erros: erros})
    }else{
        // recebendo os valores do documento
        const novoProjeto = {
            nome: req.body.nome,
            funcionario: req.body.funcionario
        }
        
        new Projeto(novoProjeto).save().then(() => {
            req.flash("success_msg", "Projeto salvo com sucesso")
            res.redirect("/admin/projetos") // redirecionando para a pagina de projetos
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar o projeto")
            res.redirect("/admin/projetos")
        })
    }
})

// acessando o projeto pelo id, pagina para editar o projeto
router.get("/projetos/edit/:id", (req, res) => {
    
    Projeto.findOne({_id: req.params.id}).lean().then((projeto) => {
        Funcionario.find().lean().then((funcionarios) => {
             res.render("admin/editprojetos", {projeto: projeto, funcionarios: funcionarios})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro")
            res.redirect("/admin/projetos")
        }) 
       
    }).catch((err) => {
        req.flash("erro_msg", "Esse projeto nao existe")
        res.redirect("/admin/projetos")
    })
})

// rota que vai atualizar os dados do projeto
router.post("/projetos/edit", (req, res) => {
    
    Projeto.findOne({_id: req.body.id}).then((projeto) => {
        // atribuindo os valor pelo valor do formulario de edicao
        projeto.nome = req.body.nome 
        projeto.funcionario = req.body.funcionario
        
        projeto.save().then(() => {
            req.flash("success_msg", "Projeto editado com sucesso")
            res.redirect("/admin/projetos")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edicao do projeto")
            res.redirect("/admin/projetos")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar o projeto")
        res.redirect("/admin/projetos")
    })

})

// rota para deletar o projeto
router.post("/projetos/deletar", (req, res) => {
    Projeto.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "projeto deletado com sucesso")
        req.redirect("/admin/projetos")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletada o projeto")
        res.redirect("/admin/projetos")
    })
})


// --------------------------------------------------------------------------

router.get("/funcionarios", (req, res) => {
    Funcionario.find().lean().populate("projeto").sort({data:"desc"}).then((funcionarios) => {
        res.render("admin/funcionarios", {funcionarios: funcionarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os funcionarios")
        res.redirect("/admin")
    })
})


router.get("/funcionarios/add", (req, res) => {
    Projeto.find().lean().then((projetos) => {
        res.render("admin/addfuncionarios", {projetos: projetos})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o projeto")
        res.redirect("/admin")
    })
})


router.post("/funcionarios/novo", (req, res) => {

    const novoFuncionario = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        admission_date: req.body.admission_date,
        job_role: req.body.job_role,
        projeto: req.body.projeto
    }


    new Funcionario(novoFuncionario).save().then(() => {
        req.flash("success_msg", "Funcionario criado com sucesso")
        res.redirect("/admin/funcionarios")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro durante o salvamento do funcionario")
        res.redirect("/admin/funcionarios")
    })
    
})

// rota da pagina de edicao de funcionarios
router.get("/funcionarios/edit/:id", (req, res) => {
    // buscando o id como parametro, /funcionarios/edit/:id -> req.params.id
    Funcionario.findOne({_id: req.params.id}).lean().then((funcionario) => {
        Projeto.find().lean().then((projetos) => {
            res.render("admin/editfuncionarios", {projetos: projetos, funcionario: funcionario})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar os projetos")
            res.redirect("/admin/funcionarios")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulario de edicao")
        res.redirect("/admin/funcionarios")
    })
    
})

// rota que vai atualizar os funcionarios
router.post("/funcionario/edit", (req, res) => {

    Funcionario.findOne({_id: req.body.id}).then((funcionario) => {
        funcionario.name = req.body.name
        funcionario.birthdate = req.body.birthdate
        funcionario.admission_date = req.body.admission_date
        funcionario.job_role = req.body.job_role
        funcionario.projeto = req.body.projeto
        
        funcionario.save().then(() => {
            req.flash("success_msg","Editado com sucesso")
            res.redirect("/admin/funcionarios")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar: "+err)
            res.redirect("/admin/funcionarios")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a edicao: "+err)
        res.redirect("/admin/funcionarios")
    })
})



router.get("/funcionarios/deletar/:id", (req, res) =>{
    Funcionario.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Funcionario deletado com sucesso")
        res.redirect("/admin/funcionarios")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/admin/funcionarios")
    })
})


module.exports = router
