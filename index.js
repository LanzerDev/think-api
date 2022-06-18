//importaciones
const express = require('express');
const app = express();
const port = 3000;
const moment = require('moment');
const usuarios = require('./services/usuarios.js')
const bodyParser = require('body-parser')
const cors = require('cors');
const { clearScreenDown } = require('readline');
//servicios
const _usuariosService = new usuarios();

//dependecias
app.set('json spaces', 2)
app.use(bodyParser.json());
//variables

app.use(cors())





app.get('/', (req, res)=>{
    res.send('think-api')
})

app.get('/api/usuarios/', (req, res)=>{
    const users = _usuariosService.getUsuarios((result)=>{
        res.json(result)
    })
})

app.get('/api/usuarios/:id', (req, res)=>{
    const id_usuario = req.params.id;
    const usuario = _usuariosService.getUser(id_usuario, (result)=>{
        res.json({
            "usuario":result
        })
    })
})

app.delete('/api/borrarusuario/:id', (req, res)=>{
    const id_usuario = req.params.id;
    const usuario = _usuariosService.deleteUser(id_usuario, (result, estatus)=>{
        res.json({
            "message": result,
            "estatus": estatus
        })
    }) 
})

app.post('/api/newuser/', (req, res)=>{
    const body = req.body;
    const newUser = _usuariosService.createUser(body, (result, estatus)=>{
        res.json({
            "message": result,
            "estatus": estatus
        });
    });
}) 

app.put('/api/comentario/:id',(req, res)=>{
    const id_usuario = req.params.id;
    const comentario = req.body.Comentarios;
    const enviar_comentario = _usuariosService.saveComentarios(comentario, id_usuario, (result)=>{
        res.json({
        "message": result
        })
    })
})

app.listen(port, ()=>{
    console.log('port' + port)
})
 