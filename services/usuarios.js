const { query } = require('express');
const conexion = require('../conexion.js')


class usuarios {

    constructor() {
        this.users = [];
        this.message_success = "success";
        this.estatus;
        this.nombre;
        this.apellido1;
        this.apellido2;
        this.email;
        this.telefono;
        this.genero;
        this.fecha_nacimiento;
        this.edad;
        this.estado;
        this.municipio;
        this.nivel_estudios;
        this.carrera;
        this.ocupacion;
        this.nivel_ingresos;
        this.estado_civil;
        this.tiene_hijos;
        this.tiene_hijos_menores18;
        this.numero_automoviles;
        this.tiene_internet;
        this.numero_personas_hogar;
        this.numero_personas_trabajaron;
        this.comentarios;
    }

    getUsuarios(call) {
        const get_usuarios = 'SELECT * FROM usuarios';
        conexion.query(get_usuarios, (err, res, fields) => {
            if (err) {
                throw err;
            }
            call(res)
        })
    }



    createUser(data, callback) {
        const newUser = { ...data };
        this.nombre = newUser.Nombre;
        this.apellido1 = newUser.Apellido_1;
        this.apellido2 = newUser.Apellido_2;
        this.email = newUser.Correo;
        this.telefono = newUser.Telefono;
        this.genero = newUser.Genero;
        this.fecha_nacimiento = newUser.Fecha_nacimiento
        this.edad = newUser.Edad;
        this.estado = newUser.Estado;
        this.municipio = newUser.Municipio;
        this.nivel_estudios = newUser.Nivel_estudios;
        this.carrera = newUser.Carrera_completo;
        this.ocupacion = newUser.Ocupacion;
        this.nivel_ingresos = newUser.Ingresos_mensual;
        this.estado_civil = newUser.Estado_civil;
        this.tiene_hijos = newUser.Tiene_hijos;
        this.tiene_hijos_menores18 = newUser.Tiene_hijos_men_18;
        this.numero_automoviles = newUser.Automoviles_hogar;
        this.tiene_internet = newUser.Internet;
        this.numero_personas_hogar = newUser.Personas_hogar;
        this.numero_personas_trabajaron = newUser.Personas_hogar_trabajaron;

        const query = `INSERT INTO usuarios VALUES (NULL,'`+this.nombre+`','`+this.apellido1+`','`+this.apellido2+`','`+this.email+`','`+this.telefono+`','`+this.genero+`','`+this.fecha_nacimiento+`','`+this.edad+`','`+this.estado+`','`+this.municipio+`','`+this.nivel_estudios+`','`+this.carrera+`','`+this.ocupacion+`','`+this.nivel_ingresos+`','`+this.estado_civil+`','`+this.tiene_hijos+`','`+this.tiene_hijos_menores18+`','`+this.numero_automoviles+`','`+this.tiene_internet+`','`+this.numero_personas_hogar+`','`+this.numero_personas_trabajaron+`','...')`;
        const checkCorreo = `SELECT * FROM usuarios WHERE Correo LIKE "`+this.email+`%"`
        const checkNumero = `SELECT * FROM usuarios WHERE Telefono LIKE "`+this.telefono+`%"`

        conexion.query(checkCorreo, (error, res, fields)=>{
            if(error){
                throw error
            }

            if(res.length > 0){
                console.log('correo ya en uso')
                callback('Este correo ya a sido registrado', "0")
            } else {
                conexion.query(checkNumero, (error, res, fields)=>{
                    if(error){
                        throw error
                    }
                    if(res.length > 0){
                        console.log('telefono ya en uso')
                        callback('Este numero ya sido registrado', "1")
                    } else {
                        conexion.query(query) 
                        console.log("usuario registrado")
                        callback('Usuario registrado correctamente', "2")
                    }
                })
            }
        })
        return this.message_success;
    }

    deleteUser(id, callback){
        const delete_usuario = `DELETE FROM usuarios WHERE id_usuario = ${id}`;
        conexion.query(delete_usuario, (err, res, field)=>{
            if(err){
                throw err
            }
            if(res.affectedRows > 0){
                callback("usuario eliminado","0"); 
            } else {
                callback("usuario no existe", "1")
            }
        })
    }

    getUser(id, callback){
        const get_usuario = `SELECT * FROM usuarios WHERE id_usuario = ${id}`;

        conexion.query(get_usuario, (err, res, field)=>{
            if(err){
                throw err
            }

            callback(res)
        })
    }
}

module.exports = usuarios;

