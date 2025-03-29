const express = require('express');
const router = express.Router();
const usuarios = require('./data'); // Importamos los datos desde el archivo data.js

// Endpoint: Obtener todos los usuarios y aplicar filtros
router.get('/usuarios', (req, res) => {
    let filteredUsuarios = usuarios;
    // Filtrar por nombre (si se pasa el parámetro 'nombre' en el query string)
    if (req.query.nombre) {
    filteredUsuarios = filteredUsuarios.filter(u => u.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()));
    }
    // Filtrar por edad (si se pasa el parámetro 'edad' en el query string)
    if (req.query.edad) {
    const edadFilter = parseInt(req.query.edad);
    filteredUsuarios = filteredUsuarios.filter(u => u.edad === edadFilter);
    }
    // Si no se encuentra ningún usuario, devolver un mensaje adecuado
    if (filteredUsuarios.length === 0) {
    return res.status(404).json({ mensaje: 'No se encontraron usuarios con los parámetros de búsqueda.' 
        
    });
    }
    res.status(200).json(filteredUsuarios);
    res.send('Lista de usuarios');
});

// Endpoint: Obtener un usuario por ID
router.get('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.status(200).json(usuario);
    res.send(`Detalles del usuario con ID: ${req.params.id}`);
});

// Endpoint: Agregar un usuario
router.post('/usuarios', (req, res) => {
    res.send('Usuario creado');
});

// Endpoint: Modificar un usuario por ID
router.put('/usuarios/:id', (req, res) => {

});

// Endpoint: Eliminar un usuario por ID
router.delete('/usuarios/:id', (req, res) => {

});

module.exports = router;