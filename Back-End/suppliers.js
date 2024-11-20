//suppliers.js
const { getDB } = require('./db');
const { ObjectId } = require('mongodb'); // Asegúrate de importar ObjectId

// Crear un nuevo proveedor
const createSupplier = (name, contact_info, direccion, registro, encargado, telefono, callback) => {
    const db = getDB();
    const query = {
        name,
        contact_info,
        direccion,
        registro,
        encargado,
        telefono,
        createdAt: new Date()
    };

    db.collection('suppliers').insertOne(query)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Obtener todos los proveedores
const getAllSuppliers = (callback) => {
    const db = getDB();
    db.collection('suppliers').find({}).toArray()
        .then(suppliers => callback(null, suppliers))
        .catch(err => callback(err));
};


const getSupplierById = (id, callback) => {
    const db = getDB();
    db.collection('suppliers').findOne({ _id: new ObjectId(id) }, (err, supplier) => {
        if (err) {
            return callback(err);
        }
        callback(null, supplier);
    });
};

// Actualizar un proveedor
const updateSupplier = (id, name, contact_info, direccion, registro, encargado, telefono, callback) => {
    const db = getDB();
    const query = {
        $set: {
            name,
            contact_info,
            direccion,
            registro,
            encargado,
            telefono,
            updatedAt: new Date()
        }
    };

    db.collection('suppliers').updateOne(
        { _id: new ObjectId(id) }, 
        query
    )
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Eliminar un proveedor
const deleteSupplier = (id, callback) => {
    const db = getDB();
    db.collection('suppliers').deleteOne({ _id: new ObjectId(id) })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Exportar todas las funciones
module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById, 
    updateSupplier,
    deleteSupplier
};
