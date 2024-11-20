const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// Función para enviar respuestas HTTP consistentes
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Función para registrar un usuario
const registerUser = async (nombre_usuario, nombre, email, telefono, fecha_nacimiento, password, rol_id, callback) => {
    try {
        if (!nombre_usuario || !nombre || !email || !telefono || !fecha_nacimiento || !password || !rol_id) {
            callback({ error: 'Faltan datos para el registro', statusCode: 400 });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = { nombre_usuario, nombre, email, telefono, fecha_nacimiento, password: hashedPassword, rol_id };

        const result = await getDB().collection('users').insertOne(user);
        callback(null, { id: result.insertedId });
    } catch (err) {
        callback({ error: err.message, statusCode: 500 });
    }
};

const updateUser = async (id, nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id, callback) => {
    try {
        const db = getDB();
        const query = {
            $set: {
                nombre_usuario,
                nombre,
                email,
                telefono,
                fecha_nacimiento,
                rol_id
            }
        };

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            query
        );
        
        if (result.matchedCount === 0) {
            callback({ error: 'Usuario no encontrado', statusCode: 404 });
            return;
        }
        
        callback(null, result);
    } catch (err) {
        callback({ error: err.message, statusCode: 500 });
    }
};

const deleteUser = async (id, callback) => {
    try {
        const db = getDB();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            callback({ error: 'Usuario no encontrado', statusCode: 404 });
            return;
        }
        
        callback(null, result);
    } catch (err) {
        callback({ error: err.message, statusCode: 500 });
    }
};

const getAllUsers = async (callback) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find({}).toArray();
        callback(null, users);
    } catch (err) {
        callback({ error: err.message, statusCode: 500 });
    }
};

// Función para iniciar sesión
const loginUser = async (email, password, callback) => {
    try {
        if (!email || !password) {
            callback({ error: 'Faltan datos para el inicio de sesión', statusCode: 400 });
            return;
        }

        const user = await getDB().collection('users').findOne({ email });
        if (!user) {
            callback({ error: 'Credenciales inválidas', statusCode: 401 });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            callback({ error: 'Credenciales inválidas', statusCode: 401 });
            return;
        }

        const token = jwt.sign({ userId: user._id, rol_id: user.rol_id }, jwtSecret, { expiresIn: '1h' });
        callback(null, { token });
    } catch (err) {
        callback({ error: err.message, statusCode: 500 });
    }
};

// Obtención del perfil del usuario 
const getProfile = async (req, res) => { 
    const token = req.headers['authorization'].split(' ')[1]; 
    const decoded = jwt.verify(token, 'secret'); 
    const db = getDB(); 
    try { 
        const user = await db.collection('users').findOne({ _id: new ObjectId(decoded._id) }); 
        if (!user) { 
            return res.status(404).send({ error: 'Usuario no encontrado' }); 
        } 
        res.send({ 
            nombre_usuario: user.nombre_usuario, 
            nombre: user.nombre, 
            email: user.email, 
            telefono: user.telefono, 
            fecha_nacimiento: user.fecha_nacimiento, 
            rol_id: user.rol_id 
        }); 
    } catch (error) { 
        res.status(500).send({ error: 'Error obteniendo el perfil' });
    }
};

// Middleware para autenticar el token
const authenticateToken = (req, callback) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        callback({ error: 'Token no proporcionado', statusCode: 401 });
        return;
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            callback({ error: 'Token inválido', statusCode: 403 });
            return;
        }
        callback(null, user);
    });
};

// Middleware para autorizar roles
const authorizeRole = (roles, user, callback) => {
    if (!user || !roles.includes(user.rol_id)) {
        callback({ error: 'No autorizado', statusCode: 403 });
        return;
    }
    callback(null);
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    authenticateToken,
    authorizeRole,
    updateUser,
    deleteUser,
    getAllUsers,
    sendResponse
};