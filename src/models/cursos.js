
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const cursoSchema = new Schema({
    idCurso:{
        type : Number,
        require : true,
        trim: true,
        unique: true
    },
    nombreCurso: {
        type : String,
        require : true,
        trim: true
    },

    descripcion: {
        type : String,
        require : true,
        trim: true
    },

    valor: {
        type : Number,
        require : true
    },
    modalidad: {
        type : String,
        trim: true,
        enum: {values: ['Presencial','Virtual']}
    },
    intensidad: {
        type : Number,
        min: 0
    },
    estado: {
        type : String,
        require : true,
        trim: true,
        enum: {values: ['abierto','cerrado']}
    }
});


cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso',cursoSchema);

module.exports = Curso
