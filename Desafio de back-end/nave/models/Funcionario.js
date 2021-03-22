const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Funcionarios seriao os 'NAVERS'
const Funcionario = new Schema({
    name: {
        type: 'String',
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    admission_date: {
        type: Date,
        default: Date.now()
    },
    job_role: {
        type: 'String',
        required: true
    },

        projeto: {
            // relacionamento entre dois documentos, funcionario e projeto
            type: mongoose.Schema.Types.ObjectId,
            ref: "projetos"
        },
   
})

mongoose.model("funcionarios", Funcionario)