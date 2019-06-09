const hbs = require('hbs');



hbs.registerHelper('listar',()=>{
    listarCursos = require('./listadoCursos.json');
    let texto = '';
    let lista = listarCursos.filter(cur=>cur.estado == 'disponible');
    if (lista.length == 0){
        texto = 'En el momento no hay cursos disponibles.';
    }else{
        lista.forEach(curso => {
            texto = texto + 
                    '<div class="py-2"><button style="width:50vw;" type="button" class="btn btn-success">Nombre del curso: ' + curso.nombre + 
                    '<br> Descripcion: ' + curso.descripcion +  
                    '<br> Valor: $'  + curso.valor + '</button></div>'
        });
    }
    return texto;
})


// hbs.registerHelper('login',()=>{

// })


// hbs.registerHelper('listar',()=>{
//     listarCursos = require('./listadoCursos.json');
    // let texto = "A continuación encuentra los cursos que actualmente están disponibles!! <br><br>";

//     listarCursos.forEach(curso => {
//         texto = texto +
//         curso.nombre + "<br>" +
//         curso.id + "<br>" +
//         curso.descripcion + "<br><br>";
        
//     });
//     return texto;
// });


