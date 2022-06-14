const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'thinkformulario.somosthink.com',
    database: 'somosthi_formularios',
    user: 'somosthi_form_us',
    password: 'SithhMastahh189!'
});

conexion.connect((error)=>{
    if(error){
        throw error;
    } else {
        console.log('conexion exitosa c:')
    }
});


module.exports = conexion;

//conexion.end();