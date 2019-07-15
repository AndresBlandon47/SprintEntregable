const express = require('express')
const app = express ()
const path = require ('path')
const hbs = require('hbs')
const Curso = require('./../models/cursos')
const Estudiante = require('./../models/estudiante')
const Inter = require('./../models/inter')
// const bcrypt = require('bcrypt');
const session = require('express-session')

const dirViews = path.join(__dirname, '../../templates/views')
const dirPartials = path.join(__dirname, '../../templates/partials')


require('./../helpers/helpers')

app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)


// app.use(session({
//     secret: 'Keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }))

app.get('/', (req,res) =>{    
    Curso.find({estado:"abierto"}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('index',{
            listado2 : respuesta,
            titulo: 'Inicio'
        })
    })
});

app.post('/registroExitoso', (req,res)=>{
    let estudiante = new Estudiante({
        cc: req.body.cc,
        nombre: req.body.nombre,
        cargo: "aspirante",
        correo: req.body.correo,
        tel: req.body.tel,
        //  pass : bcrypt.hashSync(req.body.pass, 10)
        pass : req.body.pass
    })
    estudiante.save( (err,resultado) => {
        if(err){
            res.render('registroExitoso',{
                mostrar: err
            })
        }
        res.render('registroExitoso', {
            mostrar : resultado
        })
    })
});


app.get('/crearCurso', (req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('crearCurso',{
            listado3 : respuesta,
        })
    })
})

app.post('/crearCurso', (req,res)=>{
    let curso = new Curso({
        idCurso: req.body.idCurso,
        nombreCurso: req.body.nombreCurso,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidad: req.body.intensidad,
        estado:"abierto",
    })
    curso.save( (err,resultado) => {
        if(err){
            res.render('cursoCreado',{
                mostrar: err
            })
        }
        res.render('cursoCreado', {
            mostrar : resultado
        })
    })
});


app.get('/verEstudiantes',(req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('verEstudiantes',{
            listado : respuesta
        })
    })
})


app.get('/actualizarEstudiante', (req,res)=>{
    res.render('actualizarEstudiante')
})

app.post('/actualizarEstudiante', (req,res)=>{
    Estudiante.findOne({nombre : req.body.nombre}, (err,resultados)=>{
        if(err){
            return console.log(err)
        }

        res.render('actualizarEstudiante',{
            cc: resultados.cc,
            nombre: resultados.nombre,
            correo: resultados.correo,
            cargo: resultados.cargo,
            tel: resultados.tel
        })
    })
})

//No funciona este método

app.post('/estActualizado', (req,res)=>{
    Estudiante.findOneAndUpdate({cc: req.body.cc}, req.body,{new : true, runValidators: true, context: 'query' }, (err,resultados)=>{
        if(err){
            return console.log(err)
        }
        res.render('estActualizado', {
            cc : req.body.cc,
            nombreE: req.body.nombre,
            correoE: req.body.correo,
            cargoE: req.body.cargo,
            telE: req.body.tel
            
        })
    })
})

app.post('/eliminarEstudiante', (req,res)=>{
    Estudiante.findOneAndDelete({nombre : req.body.nombre},req.body, (err,resultados)=>{
        if(err){
            return console.log(err)
        }

        res.render('eliminarEstudiante',{
            nombre: req.body.nombre
        })
    })
})

app.get('/verEstudiantesAct',(req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('verEstudiantesAct',{
            listado : respuesta
        })
    })
})

app.get('/registrarCurso',(req,res)=>{
    Curso.find({estado:"abierto"}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('registrarCurso',{
            lista3 : respuesta
        })
    })
})

//Este no funciona aún

app.get('/registroExitosoAlCurso',(req,res)=>{
    let inter = new Inter({
        idCurso: req.body.idCurso,
        cc: req.body.cc
    })

    inter.save( (err,resultado) => {
        if(err){
            res.render('registrarCurso',{
                mostrar: err
            })
        }
        res.render('registrarCurso', {
            mostrar : resultado
        })
    })
})


app.get('/coordinador',(req,res)=>{
    Curso.find({estado:"abierto"}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        Curso.find({estado:"cerrado"}).exec((err,respuestaa)=>{
            if(err){
                return console.log(err)
            }
            
            res.render('coordinador',{
                lista3: respuesta,
                lista4: respuestaa
            })
        })
    })
})

app.get('/cargoActualizado',(req,res)=>{
    res.render('cargoActualizado')
})

app.post('/cargoActualizado',(req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        Estudiante.findOneAndUpdate({cc:req.body.cc}, req.body, {new : true}, (err,resultado)=>{
            if(err){
               return console.log(err)
            }
            res.render('cargoActualizado',{
                cc: resultado.cc,
                cargo: resultado.cargo,
                listado3: respuesta
            }
            )
        })
    })
    
})
    

app.get('/actualizarCargos', (req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('actualizarCargos',{
            listado3: respuesta
        })
    })
})


app.post('/actualizarCargos', (req,res)=>{
    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        Estudiante.findOneAndUpdate({cc:req.body.cc}, req.body, {new : true}, (err,resultado)=>{
            if(err){
               return console.log(err)
            }
            res.render('actualizarCargos',{
                cc: resultado.cc,
                cargo: resultado.cargo,
                listado3: respuesta
            }
            )
        })
    })
    
})

app.post('/ingresoExitoso', (req,res)=>{
    Estudiante.findOne({cc : req.body.cc}, (err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        console.log('reqbody ' + req.body.pass + 'YYyyyy respuesta ' + respuesta )
        if(req.body.pass){
            console.log('Contraseña correcta');
            res.render('ingresoExitoso',{
                lista: respuesta
            })
        }else{
            console.log('no correcta')
        }
    })
})




app.get('*',(req,res)=>{
    res.render('error', {
        titulo: "Error 404",
    })
});

module.exports = app
