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
})


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
    if(texto=='aspirante'){
        return res.redirect('/aspirante'); 
    }
    return texto;
})


//Listando cursos con el collapse

hbs.registerHelper('listar2',()=>{
    listarCursos = require('./listadoCursos.json');
    let texto = "<div class='accordion text-center' id='accordionExample'>";
    i = 1;
    let lista = listarCursos.filter(cur=>cur.estado == 'disponible');
    if (lista.length == 0){
        texto = '<h2>En el momento no hay cursos disponibles.</h2>';
    }else{
        lista.forEach(curso1 => {
            texto = texto +
            `<div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <button class="btn btn-sucess" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    Curso: <b>${curso1.nombre}</b><br>Descripción: ${curso1.descripcion}<br>Valor: ${curso1.valor}.
                    </button>
                    </h2>
                </div>

                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">
                    Modalidad: ${curso1.modalidad}<br> Descripción: ${curso1.descripcion}<br>Intensidad horaria: ${curso1.intensidad} horas a la semana.
                    </div>
                </div>
            </div>`
            i=i+1;
        });
        texto = texto + '</div>';
    }
    return texto;
});


hbs.registerHelper('listarInscrito',()=>{
    listarCursos = require('./listadoCursos.json');
     
    let lista1 = listarCursos.filter(cur=>cur.estado == 'disponible');
    //Aqui tengo que modificar dependiendo del usuario que entre
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
    return texto;
  });