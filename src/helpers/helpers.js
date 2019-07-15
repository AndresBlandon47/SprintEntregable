const hbs = require('hbs');

hbs.registerHelper('listarEstudiantes', (listado) =>{
    let texto = `<div class="container-fluid">
    <form action="/eliminarEstudiante" method="post">
    <table class='table table-striped table-hover'>
    <thead class='thead-dark'>
        <th>Cédula</th>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Correo</th>
        <th>telefono</th>
        <th></th>
    </thead>
    <tbody>`;
    listado.forEach(estudiante =>{
        texto = texto + 
        `<tr>
        <td>${estudiante.cc}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.cargo}</td>
        <td>${estudiante.correo}</td>
        <td>${estudiante.tel}</td>
        <td><button class="btn btn-danger" name="nombre" value="${estudiante.nombre}">ELIMINAR</button></td>
        </tr>`;
    })
    texto = texto + `<tbody></table></div></form>`;
    return texto;
})

hbs.registerHelper('listarEstudiantes2', (listado) =>{
    let texto = `<div class="container-fluid">
    <form action="/actualizarEstudiante" method="post">
    <table class='table table-striped table-hover'>
    <thead class='thead-dark'>
        <th>Cédula</th>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Correo</th>
        <th>telefono</th>
        <th></th>
    </thead>
    <tbody>`;

    listado.forEach(estudiante =>{
        texto = texto + 
        `<tr>
            <td>${estudiante.cc}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cargo}</td>
            <td>${estudiante.correo}</td>
            <td>${estudiante.tel}</td>
            <td><button class="btn btn-success" name="nombre" value="${estudiante.nombre}">ACTUALIZAR</button></td>        
        </tr>`;
    })
    texto = texto + `<tbody></table></div></form>`;
    return texto;
})


hbs.registerHelper('listarEstudiantes3', (listado3) =>{
    let texto = `<div class="container-fluid">
    <table class='table table-striped table-hover'>
    <thead class='thead-dark'>
        <th>Cédula</th>
        <th>Nombre</th>
        <th>Cargo</th>
    </thead>
    <tbody>`;

    listado3.forEach(estudiante =>{
        texto = texto + 
        `<tr>
            <td>${estudiante.cc}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cargo}</td>        
        </tr>`;
    })
    texto = texto + `<tbody></table></div>`;
    return texto;
})

hbs.registerHelper('listarCursosDisponibles', (lista3)=>{
    i = 1;
    let texto = "<div class='accordion text-center' id='accordionExample'>";
    lista3.forEach(curso =>{
        texto = texto + 
        `<div class="card">
            <div class="card-header" id="heading${i}">
                <h2 class="mb-0">
                <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    Curso: <b>${curso.nombreCurso}</b><br>Descripción: ${curso.descripcion}<br>Valor: ${curso.valor}.
                </button>
                </h2>
            </div>
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                <div class="card-body">
                    Modalidad: ${curso.modalidad}<br> Descripción: ${curso.descripcion}<br>Intensidad horaria: ${curso.intensidad} horas a la semana.
                </div>
            </div>
        </div>`
    i=i+1;
    })
    texto= texto + "</div>";
    return texto;
})


hbs.registerHelper('listarCursosDisponiblesInscribir', (lista3)=>{
    i = 1;
    let texto = `<div class='container text-center'>
    <form action="/actualizarEstudiante" method="post">
    <table class='table table-striped table-hover'>
    <thead class='thead-dark'>
        <th>ID Curso</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Valor</th>
        <th>Modalidad</th>
        <th>Intensidad</th>
    </thead>
    <tbody>`;

    lista3.forEach(curso =>{
        texto = texto + 
        `<tr>
            <td>${curso.idCurso}</td>
            <td>${curso.nombreCurso}</td>
            <td>${curso.descripcion}</td>
            <td>${curso.valor}</td>
            <td>${curso.modalidad}</td>
            <td>${curso.intensidad}</td>
        </tr>`;
    })
    texto = texto + `<tbody></table></div></form>`;
    return texto;
})


hbs.registerHelper('listarCursosCoordinador', (lista)=>{
    i = 1;
    let texto = "<div class='accordion text-center' id='accordionExample'>";
    lista.forEach(curso =>{
        texto = texto + 
        `<div class="card">
            <div class="card-header" id="heading${i}">
                <h2 class="mb-0">
                <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    Curso: <b>${curso.nombreCurso}</b><br>Descripción: ${curso.descripcion}<br>Valor: ${curso.valor}.
                </button>
                </h2>
            </div>
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                <div class="card-body">
                    Modalidad: ${curso.modalidad}<br> Descripción: ${curso.descripcion}<br>Intensidad horaria: ${curso.intensidad} horas a la semana.
                </div>
            </div>
        </div>`
    i=i+1;
    })
    texto= texto + "</div>";
    return texto;
})

