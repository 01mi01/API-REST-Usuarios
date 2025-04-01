require('dotenv').config();


const express = require('express');
const app = express();
// Importar las Rutas
const routes = require('./routes');

// Importamos los datos desde el archivo data.js
let usuarios = require('./data'); 

//Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json());

// Usar las rutas
// app.use('/api',routes);  // Las rutas se manejaran bajo "/api"


app.get('/',(req, res) => {
    res.send("SERVIDOR FUNCIONANDO!!!!");
});

// Endpoint: Obtener todos los usuarios y aplicar filtros
app.get('/api/usuarios',(req, res) => {
    let filteredUsuarios = usuarios;
    // Filtrar por nombre (si se pasa el parámetro 'nombre' en el query string) 
    if (req.query.nombre) {
        filteredUsuarios = filteredUsuarios.filter(u => 
            u.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()));
    }

    // Filtrar por edad (si se pasa el parámetro 'edad' en el query string)
    if (req.query.edad) {
        const edadFilter = parseInt(req.query.edad);
        filteredUsuarios = filteredUsuarios.filter(u => u.edad === edadFilter);
        }
    
    // Si no se encuentra ningún usuario, devolver un mensaje adecuado
    if (filteredUsuarios.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron usuarios con los parámetros de búsqueda.' });
    }

    res.status(200).json(filteredUsuarios);
})

// Endpoint: Obtener un usuario por ID
//http://localhost:3000/api/usuarios/2
app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    
    res.status(200).json(usuario);
});

// Endpoint: Agregar un usuario
app.post('/api/usuarios', (req, res) => {
    let usuario = req.body

// Validar que vengan los datos necesarios
    if (!req.body.nombre || !req.body.edad) {
        return res.status(400).json({ 
            error: 'Nombre y edad son requeridos' 
        });
    }

// Crear nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length + 1, // Generar nuevo ID
        nombre: req.body.nombre,
        edad: req.body.edad
    };

// Agregar a nuestro "array base de datos"
    usuarios = [...usuarios, nuevoUsuario];

// Responder con el usuario creado
    res.status(201).json({
        message: 'Usuarios agregado correctamente',
        usuario: nuevoUsuario
    });
})

// Endpoint: Actualizar un usuario
app.put('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(usu => usu.id === usuarioId);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!req.body.nombre || !req.body.edad) {
        return res.status(400).json({ error: 'Nombre y edad son requeridos' });
    }

    usuarios[usuarioIndex] = { ...req.body };
    res.status(201).json({
        message: "Usuario actualizado correctamente"
    });
});

// Endpoint: Eliminar un usuario por ID 
app.delete('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    
    // Buscar el índice del usuario con el ID proporcionado
    const indiceUsuario = usuarios.findIndex(usu => usu.id === usuarioId);
    
    // Si no se encuentra el usuario
    if (indiceUsuario === -1) {
        return res.status(404).json({ 
            error: 'Usuario no encontrado' 
        });
    }
    
    // Eliminar el usuario del array
    const usuarioEliminado = usuarios.splice(indiceUsuario, 1);

    res.status(200).json({
        message: "Ususario elimnado correctamente",
        usuario: usuarioEliminado
    });
})


// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});

