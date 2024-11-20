const { getDB } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const getUserById = (userId, callback) => {
    const db = getDB();
    db.collection('users').findOne({ _id: new ObjectId(userId) }, (err, user) => {
        if (err) return callback(err);
        callback(null, user);
    });
};

const updateUser = (userId, nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id, password, callback) => {
    const db = getDB();
    const updatedUser = { nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id };

    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            updatedUser.password = hashedPassword;

            db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser }, (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            });
        });
    } else {
        db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser }, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

const deleteUser = (userId, callback) => {
    const db = getDB();
    db.collection('users').deleteOne({ _id: new ObjectId(userId) }, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

module.exports = {
    getUserById,
    updateUser,
    deleteUser, // Exportar deleteUser
};
