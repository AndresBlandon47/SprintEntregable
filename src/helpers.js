const fs = require('fs');
const hbs = require('hbs');


let listaCursosssss = require('./listadoCursos.json');
let listaUsuariosss = require('./listadoUsuarios.json');
let listaCombinada = require('./listadoEstudiantesCursos.json')

const guardar = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoEstudiantesCursos.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
    listaCombinada = listica;
}

hbs.registerHelper('actulizaDatos',(ced,email,nomb,tele,contra)=>{
    let auxUsuarios = listaUsuariosss;
    auxUsuarios.forEach(usua=>{
        if(usua.cc==ced){
            console.log('jajajaaj');
            usua.nombre = nomb;
            usua.correo = email;
            usua.pass=contra;
            usua.tel= tele;
        }
        else
            console.log("jijiji");
    });
    guardarUsuario(auxUsuarios);
});


hbs.registerHelper('eliminarAspi',(jaja, cedu)=>{
    
    let cursoid = listaCursosssss.find(me=>me.nombre == jaja);
    let cursoSanos = listaCombinada.filter(bus=>bus.idMateria!=cursoid.id);
    let cursoBorrar = listaCombinada.filter(bus=>bus.idMateria==cursoid.id);
    let borrar = cursoBorrar.filter(borr=>borr.cedu != cedu);
    borrar.forEach(cursito=>{
        cursoSanos.push(cursito);
    });
    guardar(cursoSanos);
});

hbs.registerHelper('listarUsuarios',()=>{
    let texto = "<div class='accordion text-center' id='accordionExample' style='width:50vw'>";
    i = 0;
    listaUsuariosss.forEach(usu=>{
        
        texto = texto +
        `<div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        Cedula: <b>${usu.cc}</b><br> Nombre: ${usu.nombre}
                        <a href="/actualizarUsu?cc=${usu.cc}" method="get" class="btn btn-sm " type="button" name="funciona" >Actualizar</a>
                    </button>
                    </h2>
                </div>

                <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">
                    Cargo: ${usu.cargo}<br>Correo: ${usu.correo}<br> Telefono: ${usu.tel}.
                    </div>
                </div>
            </div>`
            i=i+1;

    });
    texto = texto + '</div>';
    return texto;
    
});

hbs.registerHelper('formuDatos',(id)=>{
    let usuarioActu = listaUsuariosss.find(x=>x.cc==id);
    let texto ="";
    texto = texto +
    `<form action = "/veriUpdate" method="get" style="width: 50vw" >
                    <div class="row">
                        <div class="col">
                            <label>cedula</label><br>
                            <input type="number" name ="cedula" value=${usuarioActu.cc} readonly >
                        </div>
                        <div class="col">    
                            <label>Correo electronico</label><br>
                            <input type="email" placeholder="name@example.com" name ="correo" value=${usuarioActu.correo} required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">    
                            <label>Nombre</label><br>
                            <input type="text" name ="nombre" value=${usuarioActu.nombre} required>
                        </div>
                        <div class="col">
                            <label>telefono</label><br>
                            <input type="number" name ="telefono" value=${usuarioActu.tel} required><br>
                        </div>
                    </div>
                    <div class="row">   
                        
                        <div class="col">
                            <label>Contraseña</label><br>
                            <input type="password" name="pass" value=${usuarioActu.pass} required><br>
                        </div>
                    </div>
                    <br>
                    <button type="submit" class="button btn-success ">Actualizar</button>
                    <br>
                </form>`;

    return texto;


});


hbs.registerHelper('anadirEstudiante',(ced, curso)=>{
    bandera = false;
    let texto = "";
    let listabuena = listaCursosssss.find(mat=>mat.nombre==curso);
    listaCombinada.forEach(materia=>{
        if(materia.cedu==ced && materia.idMateria==listabuena.id){
            bandera = true;    
        }
    });
    if(!bandera){

        texto = texto + `<h3> Te has registrado con exito en el cuso de ${curso} </h3>`
        let nuevo={
            cedu:ced,
            idMateria:listabuena.id
        };
        listaCombinada.push(nuevo);
        guardar(listaCombinada);
    }else{
        texto = texto +`<h3> Ya te encuentras registrado en el curso de ${curso} </h3>`;
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
    

    let texto = "<div class='accordion' id='accordionListarInscrito'>";
    i = 1; 
    
    let listains= listaCombinada.filter(estud=>estud.cedu == cedulaMan);
    //Aqui tengo que modificar dependiendo del usuario que entre
    listains.forEach(listadispo=>{
        
        let lista1 = listaCursosssss.filter(cur=>cur.estado == 'disponible');
        let lista = lista1.filter(ins=>ins.id == listadispo.idMateria);
        
            if (lista.length == 0){
                texto = '<h2>En el momento no hay cursos disponibles.</h2>';
            }else{
                texto = texto + '<div class="card" style="width:50vw" >'
                lista.forEach(curso => {
                    texto = texto + 
                        `
                            <div class="card-header" id="heading${i}">
                                <h2 class="mb-0">
                                <button class="btn btn-sucess" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                    Curso: <b> ${curso.nombre} </b>
                                    <a href="/eliminarAspirante?holis=${curso.nombre}&cedulita=${cedulaMan}" method="get" class="btn btn btn-danger btn-sm " type="button" name="funciona" >Eliminar</a>
                                </button>
                                </h2>
                            </div>
                            <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionListarInscrito">
                                <div class="card-body">
                                    ${curso.descripcion}<br>
                                    Tiene un valor de ${curso.valor}<br>
                                    y su modalidad es ${curso.modalidad}<br>
                                    
                                </div>
                            </div>  
                        ` 
                        
                        i = i+1;
                        
                });
               
                texto = texto +'</div>';
                
            }
        
    })
    texto = texto +'</div>';
    return texto;  
});

hbs.registerHelper('verificarSesion', (usuario, pass)=>{
    
    let texto = '<div class:"row">';
    let veri = listaUsuariosss.filter(buscar => buscar.nombre == usuario)
    if(veri.length == 0){
        //NO EXISTE EL USUARIO
        texto = texto + '<h2>Usuario no identificado</h2>';
    }else{
        let veriPass = veri.find(contra => contra.pass == pass)
        if(!veriPass){
            //Contraseña incorrecta
            texto = texto + '<h2>nopassword</h2>';
        }else{
            //Verifica el cargo del usuario
            let veri2 = veri.find(carg => carg.cargo == 'aspirante')
            console.log(veri2);
            if(veri2){
                texto = texto + `<h3 class="text-center"> ¡¡Hola ${veri2.nombre}!! <br> Tu cargo es: ${veri2.cargo}</h3><br><br>` +
                `<div class="text-center"><a href="/aspirantes?cedulita=${veriPass.cc}" method="get" class="btn btn btn-info btn-lg" type="button" name="funciona" >Continuar</a></div><br><br>`;

            }else{
                // texto = 'coordinador';
                let veri2 = veri.find(carg => carg.cargo == 'coordinador')
                if(veri2){
                    texto = texto + `<h3 class="text-center"> ¡¡Hola ${veri2.nombre}!! <br> Tu cargo es: ${veri2.cargo}</h3><br><br>` +
                    `<div class="text-center"><a href="/coordinador?cedulita=${veriPass.cc}" method="get" class="btn btn btn-info btn-lg " type="button" name="funciona" >Continuar</a></div><br><br>`;
                }
                
            }
        }
    }
    texto = texto + '</div>'
    return texto;
})



//Listando cursos con el collapse

hbs.registerHelper('listar2',()=>{
    
    let texto = "<div class='accordion text-center' id='accordionExample'>";
    i = 1;
    let lista = listaCursosssss.filter(cur=>cur.estado == 'disponible');
    if (lista.length == 0){
        texto = '<h2>En el momento no hay cursos disponibles.</h2>';
    }else{
        lista.forEach(curso1 => {
            texto = texto +
            `<div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
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
        
        texto = texto + '</div><br><br>';
    }
    return texto;
});

const guardarUsuarioCurso = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoEstudiantesCursos.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
    listaCombinada = listica;
}

const guardarUsuario = (listica)=> {
    let datos = JSON.stringify(listica);
    fs.writeFile('./src/listadoUsuarios.json',datos,(err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    });
    listaUsuariosss = listica;
}

hbs.registerHelper('registrarUsuario',(ced, corr, nomb,tele,curso,pas)=>{
    bandera = false;
    let texto = "";
   
    let listarInterseccion = listaCombinada;

    let listarPosUsu = listaUsuariosss;
    
    let encontro = listaCursosssss.find(y=>y.nombre == curso);
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
        intensidad: intensidad,
        estado:'disponible'
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
//Elimina la combinatoria
hbs.registerHelper('eliminar', (id, cedul) => {
    let cursoSanos = listaCombinada.filter(bus=>bus.idMateria!=id);
    let cursoBorrar = listaCombinada.filter(bus=>bus.idMateria==id);
    let borrar = cursoBorrar.filter(borr=>borr.cedu != cedul);
    borrar.forEach(cursito=>{
            cursoSanos.push(cursito);
        });

        guardar(cursoSanos);

    return `<h1>Eliminado con éxito</h1>`;
});

hbs.registerHelper('listarCursosInscritosCoor', () =>{
    let texto = '';
    //listo los cursos disponibles
    let lista = listaCursosssss.filter(cur=>cur.estado == 'disponible');
    //"lista" cursos disponibles

    if (lista.length == 0){
        texto = texto + '<h2>En el momento no hay cursos disponibles.</h2>'
    }else{
        //si hay cursos disponibles
        let i = 0;
        //en "lista" están los cursos disponibles
        lista.forEach(curso => {
            texto = texto + `<br><h2>Curso: ${curso.nombre}. </h2>`
            texto = texto + 
            `<table class="table">
                <thead class="thead-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Cargo</th>
                <th scope="col">Correo</th>
                <th scope="col">Eliminar</th>
                </thead>
                <tbody>` 
            listaCombinada.forEach(inter=>{

                if(curso.id == inter.idMateria){
                    listaUsuariosss.forEach(estudiant =>{
                        if(estudiant.cc == inter.cedu){
                            //console.log('Curso: ' + curso.nombre + '. Estudiante: ' + estudiant.nombre);
                            // texto = texto + `<h3> ${estudiant.nombre}, </h3>`

                            texto = texto + `<tr>
                                               <td>${estudiant.nombre}</td>
                                               <td>${estudiant.cargo}</td>
                                               <td>${estudiant.correo}</td>
                                               <td>
                                                <a href="/eliminado?idCurso=${curso.id}&cc=${estudiant.cc}" method="get" class="btn btn-danger btn-sm " type="button" name="idCurso" >Eliminar</a> 
                                               </td>
                                             </tr>`
                        }
                    });
                }
            });  
            texto = texto + `</tbody></table>`;
        });
    }
    return texto;
});


hbs.registerHelper('listarCursosInscritosCoorCerrados', () =>{
    let texto = '';
    //listo los cursos disponibles
    let lista = listaCursosssss.filter(cur=>cur.estado == 'cerrado');
    //"lista" cursos disponibles

    if (lista.length == 0){
        texto = texto + '<h2>En el momento no hay cursos disponibles.</h2>'
    }else{
        //si hay cursos disponibles
        let i = 0;
        //en "lista" están los cursos disponibles
        lista.forEach(curso => {
            texto = texto + `<br><h2>Curso: ${curso.nombre}. </h2>`
            texto = texto + 
            `<table class="table">
                <thead class="thead-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Cargo</th>
                <th scope="col">Correo</th>
                <th scope="col">Eliminar</th>
                </thead>
                <tbody>` 
            listaCombinada.forEach(inter=>{

                if(curso.id == inter.idMateria){
                    listaUsuariosss.forEach(estudiant =>{
                        if(estudiant.cc == inter.cedu){
                            //console.log('Curso: ' + curso.nombre + '. Estudiante: ' + estudiant.nombre);
                            // texto = texto + `<h3> ${estudiant.nombre}, </h3>`

                            texto = texto + `<tr>
                                               <td>${estudiant.nombre}</td>
                                               <td>${estudiant.cargo}</td>
                                               <td>${estudiant.correo}</td>
                                               <td>
                                                <a href="/eliminado?idCurso=${curso.id}&cc=${estudiant.cc}" method="get" class="btn btn-danger btn-sm " type="button" name="idCurso" >Eliminar</a> 
                                               </td>
                                             </tr>`
                        }
                    });
                }
            });  
            texto = texto + `</tbody></table>`;
        });
    }
    return texto;
});
