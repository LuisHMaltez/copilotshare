// products.js
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');

const createProduct = (name, price, category_id, description, stock, supplier_id, callback) => {
    const db = getDB();
    const query = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category_id: new ObjectId(category_id),
        supplier_id: new ObjectId(supplier_id),
        createdAt: new Date()
    };

    db.collection('products').insertOne(query)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

const getAllProducts = (callback) => {
    const db = getDB();
    db.collection('products').aggregate([
        {
            $lookup: {
                from: "suppliers",
                localField: "supplier_id",
                foreignField: "_id",
                as: "supplier_info"
            }
        },
        {
            $lookup: {
                from: "category",
                localField: "category_id",
                foreignField: "_id",
                as: "category_info"
            }
        },
        {
            $project: {
                name: 1,
                price: 1,
                category_id: 1,
                category_name: { $arrayElemAt: ["$category_info.name", 0] },
                description: 1,
                stock: 1,
                supplier_id: 1,
                supplier_name: { $arrayElemAt: ["$supplier_info.name", 0] }
            }
        }
    ]).toArray()
        .then(products => callback(null, products))
        .catch(err => callback(err));
};

const updateProduct = (id, name, description, price, stock, category_id, supplier_id, callback) => {
    const db = getDB();
    const query = {
        $set: {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            supplier_id: new ObjectId(supplier_id),
            category_id: new ObjectId(category_id),
            updatedAt: new Date()
        }
    };

    db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        query
    )
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

const deleteProduct = (id, callback) => {
    try {
        const db = getDB();
        db.collection('products').deleteOne({ _id: new ObjectId(id) })
            .then(result => callback(null, result))
            .catch(err => callback(err));
    } catch (error) {
        callback(error);
    }
};

const advancedSearch = (searchParams, callback) => {
    try {
        const db = getDB();
        let query = {};

        // Construir la consulta basada en los parámetros recibidos
        if (searchParams.category) {
            try {
                query.category_id = new ObjectId(searchParams.category);
            } catch (error) {
                return callback(new Error('ID de categoría inválido'));
            }
        }

        if (searchParams.supplier) {
            try {
                query.supplier_id = new ObjectId(searchParams.supplier);
            } catch (error) {
                return callback(new Error('ID de proveedor inválido'));
            }
        }

        if (searchParams.name) {
            query.name = new RegExp(searchParams.name, 'i');
        }

        if (searchParams.minPrice || searchParams.maxPrice) {
            query.price = {};
            if (searchParams.minPrice) {
                query.price.$gte = parseFloat(searchParams.minPrice);
            }
            if (searchParams.maxPrice) {
                query.price.$lte = parseFloat(searchParams.maxPrice);
            }
        }

        db.collection('products').aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "supplier_id",
                    foreignField: "_id",
                    as: "supplier_info"
                }
            },
            {
                $lookup: {
                    from: "category",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category_info"
                }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    category_id: 1,
                    category_name: { $arrayElemAt: ["$category_info.name", 0] },
                    description: 1,
                    stock: 1,
                    supplier_id: 1,
                    supplier_name: { $arrayElemAt: ["$supplier_info.name", 0] }
                }
            }
        ]).toArray()
            .then(products => callback(null, products))
            .catch(err => callback(err));

    } catch (error) {
        callback(error);
    }
};



module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    advancedSearch
};