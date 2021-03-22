const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Projeto = new Schema({
    nome: {
        type: 'String',
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },

        funcionario: {
            // relacionamento entre dois documentos, projeto e funcionario
            type: mongoose.Schema.Types.ObjectId,
            ref: "funcionarios",
            require: true
        }
})

mongoose.model('projetos', Projeto)