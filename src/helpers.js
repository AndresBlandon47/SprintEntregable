const hbs = require('hbs');



hbs.registerHelper('listar',()=>{
    listarCursos = require('./listadoCursos.json');
    let texto = '';
    let lista = listarCursos.filter(cur=>cur.estado == 'disponible');
    if (lista.length == 0){
        texto = '<h2>En el momento no hay cursos disponibles.</h2>';
    }else{
        lista.forEach(curso => {
            texto = texto + 
                    '<div class="py-2"><button style="width:50vw;" type="button" class="btn btn-success">Nombre del curso: ' + curso.nombre + 
                    '<br> Descripcion: ' + curso.descripcion +  
                    '<br> Valor: $'  + curso.valor + '</button></div>'
        });
    }
    return texto;
});

hbs.registerHelper('anadirEstudiante',(ced, correo, nomb,tel,curso )=>{
    bandera = false;
    listarCombinado = require('./listadoEstudiantesCursos.json');
    listarCombinado.forEach(materia=>{
        if(materia.nomEst==nomb && materia.idMateria==5)
            console.log('Holissss');
        else
            console.log('funcionaaaa');
    })
});

// Este metodome sirve para usar un espacio para seleccionar el nombre del usuario
hbs.registerHelper('prueba',()=>{
    listarCursos = require('./listadoCursos.json');
    let texto="<select class='form-control' name='cursoins'>";
    let lista = listarCursos.filter(ins=>ins.nombrEst != 'Andres');
    lista.forEach(curso=>{
        texto = texto + 
        `<option>${curso.nombre}</option>`
    
    });
    texto = texto + '</select>';
    return texto;
})

hbs.registerHelper('listarInscrito',()=>{
    console.log('Putraaaa');
    var i = 1; 
    let texto = "<div class='accordion' id='accordionListarInscrito'>";
    listarCursos = require('./listadoCursos.json');//Llamo el JSON de los cursos para ver cuales estan disponibles
    listaCombinado = require('./listadoEstudiantesCursos');//Llamo el JSON que relaciona estudiantes con cursos
    let listains= listaCombinado.filter(estud=>estud.nomEst == 'Andres');
    //Aqui tengo que modificar dependiendo del usuario que entre
    listains.forEach(listadispo=>{
        
        let lista1 = listarCursos.filter(cur=>cur.estado == 'disponible');
        let lista = lista1.filter(ins=>ins.id == listadispo.idMateria);
        
            if (lista.length == 0){
                texto = '<h2>En el momento no hay cursos disponibles.</h2>';
            }else{
                console.log("Holissss"+i);
                
                lista.forEach(curso => {
                    texto = texto + 
                        `<div class="card">
                            <div class="card-header" id="heading${i}">
                                <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                    ${curso.nombre}
                                </button>
                                </h2>
                            </div>
                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionListarInscrito">
                                <div class="card-body">
                                    ${curso.descripcion}<br>
                                    Tiene un valor de ${curso.valor}<br>
                                    y su modalidad es ${curso.modalidad}<br>
                                    
                                </div>
                            </div>  
                            </div>`
                        
                    
                });
                i = i+1;
                texto = texto +'</div>';
            }
    })
            
            return texto;

    /*
        let lista = lista1.filter(ins=>ins.nombrEst == 'Andres');
        let texto = "<div class='accordion' id='accordionListarInscrito'>";
            if (lista.length == 0){
                texto = '<h2>En el momento no hay cursos disponibles.</h2>';
            }else{
                i = 1; 
                lista.forEach(curso => {
                    texto = texto + 
                        `<div class="card">
                            <div class="card-header" id="heading${i}">
                                <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${1}">
                                    ${curso.nombre}
                                </button>
                                </h2>
                            </div>
                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionListarInscrito">
                                <div class="card-body">
                                    ${curso.descripcion}<br>
                                    Tiene un valor de ${curso.valor}<br>
                                    y tiene los siguientes estudiantes ${curso.nombrEst}<br>
                                </div>
                            </div>`
                        
                i = i + 1;
                });
            }
        texto = texto +'</div>'
        return texto;*/
});



hbs.registerHelper('verificarSesion', (usuario, pass)=>{
    listarUsuarios = require ('./listadoUsuarios.json');
    let texto = '';
    let veri = listarUsuarios.filter(buscar => buscar.nombre == usuario)
    if(veri.length == 0){
        //NO EXISTE EL USUARIO
        texto = 'nousuario';
    }else{
        let veriPass = veri.find(contra => contra.pass == pass)
        if(!veriPass){
            //Contraseña incorrecta
            texto = 'nopassword';
        }else{
            let veri2 = veri.find(carg => carg.cargo == 'aspirante')
            if(veri2){
                texto = 'aspirante';
            }else{
                texto = 'coordinador';
            }
        }
    }
    return texto;
})
