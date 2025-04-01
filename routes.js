const express = require('express');
const router = express.Router();
// Importamos los datos desde el archivo data.js
const usuarios = require('./data'); 

// Endpoint: Obtener todos los usuarios y aplicar filtros
router.get('/usuarios', (req, res) => {  
    let filteredUsuarios = usuarios;
    // Filtrar por nombre (si se pasa el parámetro 'nombre' en el query string) 
    // console.log(res.query.nombre);
    // if (req.query.nombre) {
    //     filteredUsuarios = filteredUsuarios.filter(u => 
    //         u.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()));
    // }

    res.status(200).json(filteredUsuarios);
})

// Endpoint: Obtener un usuario por ID 
router.get('/usuarios/:id', (req, res) => { }) 

// Endpoint: Agregar un usuario 
router.post('/usuarios', (req, res) => { })

// Endpoint: Modificar un usuario por ID
router.put('/usuarios/:id', (req, res) => { }) 

// Endpoint: Eliminar un usuario por ID 
router.delete('/usuarios/:id', (req, res) => {})