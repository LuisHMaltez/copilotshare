//suppliers.js
const { getDB } = require('./db');
const { ObjectId } = require('mongodb'); // Asegúrate de importar ObjectId

// Crear un nuevo proveedor
const createCategory = (name, descripcion, ubicacion, disponible, tipo, area, callback) => {
    const db = getDB();
    const query = {
        name,
        descripcion,
        ubicacion,
        disponible,
        tipo,
        area,
        createdAt: new Date()
    };

    db.collection('category').insertOne(query)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Obtener todos los proveedores
const getAllCategories = (callback) => {
    const db = getDB();
    db.collection('category').find({}).toArray()
        .then(suppliers => callback(null, suppliers))
        .catch(err => callback(err));
};

// Actualizar un proveedor
const updateCategory = (id, name, descripcion, ubicacion, disponible, tipo, area, callback) => {
    const db = getDB();
    const query = {
        $set: {
            name,
            descripcion,
            ubicacion,
            disponible,
            tipo,
            area,
            updatedAt: new Date()
        }
    };

    db.collection('category').updateOne(
        { _id: new ObjectId(id) }, 
        query
    )
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Eliminar un proveedor
const deleteCategory = (id, callback) => {
    const db = getDB();
    db.collection('category').deleteOne({ _id: new ObjectId(id) })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Exportar todas las funciones
module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};
