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
    return texto;
})
