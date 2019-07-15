
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const estudianteSchema = new Schema({
    cc: {
        type : Number,
        require : true,
        trim: true,
        unique: true
    },
    nombre:{
        type : String,
        require : true,
        trim: true
    },
    cargo: {
        type : String,
        require : true,
        trim: true,
        enum: {values: ['aspirante','coordinador','docente']}

    },
    pass :{
        type : String,
        require : true
    },
    correo: {
        type : String,
        require : true,
        trim: true
    },
    tel: {
        type : String,
        require : true,
        trim: true
    }
});

estudianteSchema.plugin(uniqueValidator);

const Estudiante = mongoose.model('Estudiante',estudianteSchema);


module.exports = Estudiante
