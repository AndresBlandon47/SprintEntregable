const fs = require('fs');
const hbs = require('hbs');

const guardar = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoEstudiantesCursos.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
}


hbs.registerHelper('eliminarAspi',(jaja, cedu)=>{
    
    let listacursito = require('./listadoCursos');
    let cursoid = listacursito.find(me=>me.nombre == jaja);
    
    let listarCombinado = require('./listadoEstudiantesCursos.json');
    let cursoSanos = listarCombinado.filter(bus=>bus.idMateria!=cursoid.id);
    let cursoBorrar = listarCombinado.filter(bus=>bus.idMateria==cursoid.id);
    let borrar = cursoBorrar.filter(borr=>borr.cedu != cedu);
    borrar.forEach(cursito=>{
        cursoSanos.push(cursito);
    });
    guardar(cursoSanos);
});


hbs.registerHelper('anadirEstudiante',(ced, curso)=>{
    bandera = false;
    
    let texto = "";
    let listacursito = require('./listadoCursos');
    let listabuena = listacursito.find(mat=>mat.nombre==curso);
    let listarCombinado = require('./listadoEstudiantesCursos.json');
    listarCombinado.forEach(materia=>{
        if(materia.cedu==ced && materia.idMateria==listabuena.id){
            bandera = true;    
        }
    });
    if(!bandera){

        texto = texto + "<h3> Te has registrado con exito</h3>"
        let nuevo={
            cedu:ced,
            idMateria:listabuena.id
        };
        listarCombinado.push(nuevo);
        guardar(listarCombinado);
    }else{
        texto = texto +"<h3> Ya te encuentras registrado en este curso</h3>";
    }
    return texto;
});

// Este metodome sirve para usar un espacio para seleccionar el nombre del usuario
hbs.registerHelper('prueba',()=>{
    let listarCursos = require('./listadoCursos.json');
    let texto="<select class='form-control' name='cursoins'>";
    let listaDiponible = listarCursos.filter(x=>x.estado == "disponible");
    listaDiponible.forEach(curso=>{
        texto = texto + 
        `<option>${curso.nombre}</option>`
    
    });
    texto = texto + '</select>';
    return texto;
})

hbs.registerHelper('listarInscrito',(cedulaMan)=>{
    
    var i = 1; 
    let texto = "<div class='accordion' id='accordionListarInscrito'>";
    let listarCursos = require('./listadoCursos.json');//Llamo el JSON de los cursos para ver cuales estan disponibles
    let listaCombinado = require('./listadoEstudiantesCursos');//Llamo el JSON que relaciona estudiantes con cursos
    let listains= listaCombinado.filter(estud=>estud.cedu == cedulaMan);
    //Aqui tengo que modificar dependiendo del usuario que entre
    listains.forEach(listadispo=>{
        
        let lista1 = listarCursos.filter(cur=>cur.estado == 'disponible');
        let lista = lista1.filter(ins=>ins.id == listadispo.idMateria);
        
            if (lista.length == 0){
                texto = '<h2>En el momento no hay cursos disponibles.</h2>';
            }else{

                lista.forEach(curso => {
                    texto = texto + 
                        `<div class="card" style='width:50vw' >
                            <div class="card-header" id="heading${i}">
                                <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                    ${curso.nombre}

                                    <a href="/eliminarAspirante?holis=${curso.nombre}&cedulita=${cedulaMan}" method="get" class="btn btn btn-danger btn-sm " type="button" name="funciona" >Eliminar</a>
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
});

hbs.registerHelper('verificarSesion', (usuario, pass)=>{
    listarUsuarios = require ('./listadoUsuarios.json');
    let texto = '<div class:"row">';
    let veri = listarUsuarios.filter(buscar => buscar.nombre == usuario)
    if(veri.length == 0){
        //NO EXISTE EL USUARIO
        texto = 'Usuario no identificado';
    }else{
        let veriPass = veri.find(contra => contra.pass == pass)
        if(!veriPass){
            //Contraseña incorrecta
            texto = 'nopassword';
        }else{
            let veri2 = veri.find(carg => carg.cargo == 'aspirante')
            if(veri2){
                texto = texto + '<h3> Eres aspirante </h3>' +
                `<a href="/aspirantes?cedulita=${veriPass.cc}" method="get" class="btn btn btn-danger btn-sm " type="button" name="funciona" >Ir a plantilla</a>`;

            }else{
                // texto = 'coordinador';
                let veri2 = veri.find(carg => carg.cargo == 'coordinador')
                if(veri2){
                    texto = texto + '<h3> Eres coordinador </h3>' +
                    `<a href="/coordinador?cedulita=${veriPass.cc}" method="get" class="btn btn btn-danger btn-sm " type="button" name="funciona" >Ir a plantilla</a>`;
                }
                
            }
        }
    }
    texto = texto + '</div>'
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

                <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
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

const guardarUsuarioCurso = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoEstudiantesCursos.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
}

const guardarUsuario = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoUsuarios.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
}

hbs.registerHelper('registrarUsuario',(ced, corr, nomb,tele,curso,pas)=>{
    bandera = false;
    let texto = "";
   
    let listarInterseccion = require('./listadoEstudiantesCursos.json');

    let listarPosUsu = require('./listadoUsuarios');
    let cursoencontrado = require('./listadoCursos');
    let encontro = cursoencontrado.find(y=>y.nombre == curso);
    let encontreUsu = listarPosUsu.find(x=>x.cc == ced);
    if(!encontreUsu){
        texto = texto + `<h2>USuario creado con éxito !! </h2>`
        let nuevo1={
            cc:ced,
            nombre:nomb,
            cargo:'aspirante',
            pass:pas,
            tel:tele,
            correo:corr,            
        }
        listarPosUsu.push(nuevo1);
        guardarUsuario(listarPosUsu);
        let nuevo2={
            cedu:ced,
            idMateria:encontro.id
        }
        listarInterseccion.push(nuevo2);
        guardarUsuarioCurso(listarInterseccion);
        

    }else{
        texto = texto + "<h2> Usuario ya registrado </h2>"
    }

    return texto;
});



//gringo


/* ---------------------------------------------------- MIO ------------------------------------------------------------ */
hbs.registerHelper('anadirCurso', (nombre, id, descripcion, valor, modalidad, intensidad) => {
    listaCursos = require('./listadoCursos.json');
    let curso = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        valor: valor,
        modalidad: modalidad,
        intensidad: intensidad
    }

    let cursos = listaCursos.find(cur => cur.id == id);
    if (!cursos){
        listaCursos.push(curso);
        let datos = JSON.stringify(listaCursos);
        fs.writeFile('./src/listadoCursos.json', datos, (err)=>{
          if (err) throw (err);
          console.log('Archivo creado con exito')
        })
        return 'Guardado con éxito'
    }else{
        return `Ya existe un curso con ese id: ${cursos.nombre}`;
    }
});
/* ---------------------------------------------------- MIO ------------------------------------------------------------ */
/* ---------------------------------------------------- MIO ------------------------------------------------------------ */
hbs.registerHelper('eliminar', cc => {
    listarEstudiantesCurso = require('./listadoEstudiantesCursos.json');
    let texto = '';
    let nuevo = listarEstudiantesCurso.filter(est => est.cedu != cc);

    if (nuevo.length != listarEstudiantesCurso.length) {
        let datos = JSON.stringify(nuevo);
        fs.writeFile('./src/listadoEstudiantesCursos.json', datos, (err)=>{
            if (err) throw (err);
            console.log('Archivo creado con exito')
        });

        texto = `<h1>Eliminado con éxito</h1>`;
    }else {
        texto = `<h3>No se pudo eliminar</h3>`;
    }

    return texto;
})
/* ---------------------------------------------------- MIO ------------------------------------------------------------ */
/* ---------------------------------------------------- MIO ------------------------------------------------------------ */
hbs.registerHelper('listarCursosInscritosCoor', () =>{
    listarCursos = require('./listadoCursos.json');
    listarEstudiantesCurso = require('./listadoEstudiantesCursos.json');
    listarInscritos = require('./listadoUsuarios.json');
    let texto = '';
    let inscritosEnCurso = '';
    let nombre = '';
    let lista = listarCursos.filter(cur=>cur.estado == 'disponible');
    if (lista.length == 0){
        texto = '<h2>En el momento no hay cursos disponibles.</h2>';
    }else{
        let i = 0;
        lista.forEach(curso => {
            nombre = curso.nombre;
            let inscritos = listarEstudiantesCurso.filter(est => est.idMateria == curso.id);
            if (inscritos.length == 0) {
                inscritosEnCurso = 'No hay inscritos en este curso';
            }else {
                inscritos.forEach(inscrito => {
                    let user = listarInscritos.filter(usu => usu.cedu == inscrito.cc);
                    if (user.length > 0){
                        user.forEach(us => {
                            inscritosEnCurso =
                            `${inscritosEnCurso}
                            <tr>
                              <td>${us.nombre}</td>
                              <td>${us.cargo}</td>
                              <td>${us.correo}</td>
                              <td>
                                <form action="/eliminado" method="post">
                                    <input name="cedu" style="display: none;" value="${us.cedu}">
                                    <button class="btn btn-success">Remover</button>
                                </form>
                              </td>
                            </tr>`
                        });
                    }
                });
            }

            texto = texto +
            `<div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        ${nombre}
                    </button>
                    </h2>
                </div>
                <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionListarInscrito">
                    <div class="card-body">
                        <table>
                            <thead>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Correo</th>
                            <th></th>
                            </thead>
                            <tbody>
                                ${inscritosEnCurso}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`

            i++;

        });
    }
    return texto;
});

/* ---------------------------------------------------- MIO ------------------------------------------------------------ */