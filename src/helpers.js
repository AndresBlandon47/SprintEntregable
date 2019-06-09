const hbs = require('hbs');


hbs.registerHelper('listar',()=>{
    listarCursos = require('./listadoCursos.json');
    let texto = "Holisss <br>";

    listarCursos.forEach(curso => {
        texto = texto +
        curso.nombre+"<br>"+
        curso.id+"<br>"+
        curso.descripcion+"<br><br>";
    });
    return texto;
});