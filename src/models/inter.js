
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const interSchema = new Schema({
    idCurso:{
        type : Number,
        require : true,
        trim: true
    },
    cc: {
        type : Number,
        require : true,
        trim: true
    }
});


interSchema.plugin(uniqueValidator);

const Inter = mongoose.model('inter',interSchema);

module.exports = Inter
