const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require ('./helpers');

const directoriopublico = path.join(__dirname,'../public');
const directoriopartials =path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false }));

//La parte de bosstrap
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

//-----------------------------------------------------------------------



app.set('view engine','hbs');

app.get('/',(req, res)=>{
    res.render('index');
});

app.get('/anadirAspirante',(req,res)=>{
    res.render('anadirAspirante',{
        cedulita: parseInt(req.query.cedulita),
        cursoins: req.query.cursoins
    })
});

app.get('/aspirantes',(req, res)=>{
    res.render('aspirantes',{
        cedulita: parseInt(req.query.cedulita)
    })
    
});

app.get('/eliminarAspirante',(req, res)=>{
    res.render('eliminarAspirante',{
        
        cedulita: parseInt(req.query.cedulita),
        holis: req.query.holis   
    });
    
});

app.listen(3000,() =>{
    console.log('Escuchando el puerto 3000');
})

app.get('/autenticar',(req,res) =>{
    res.render('autenticar',{
        usuario:req.query.usuario,
        pass:req.query.pass
    });
});

app.get('/registroExitoso',(req,res)=>{
    res.render('registroExitoso',{
        cedula: parseInt(req.query.cedula),
        correo: req.query.correo,
        nombre: req.query.nombre,
        telefono: parseInt(req.query.telefono),
        cursoins: req.query.cursoins,
        pass:req.query.pass
    })
});

//gringo

app.get('/anadirCurso', (req, res) => {
    res.render('anadirCurso');
});

app.get('/inscritos', (req, res) => {
    res.render('inscritos');
})


app.get('/eliminado', (req, res) => {
    res.render('eliminado', {
        idCurso: parseInt(req.query.idCurso),
        cc: parseInt(req.query.cc)
        
    });
});

app.post('/cursos', (req, res) => {
    res.render('cursos', {
        nombre: req.body.nombre,
        id: parseInt(req.body.id),
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad)
    });
});

app.get('/coordinador',(req, res)=>{
    res.render('coordinador',{
        cedulita: parseInt(req.query.cedulita)
    })
    
});