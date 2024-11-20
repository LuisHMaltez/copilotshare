const http = require('http');
const url = require('url');
const cors = require('cors');
const { registerUser, loginUser, getProfile, authenticateToken, authorizeRole, getAllUsers, updateUser, deleteUser } = require('./auth');
const { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require('./suppliers');
const { createProduct, getAllProducts, updateProduct, deleteProduct, advancedSearch } = require('./products');
const { connectDB } = require('./db');
const { ObjectId } = require('mongodb');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('./category');

const PORT = 3000;
require('dotenv').config();

// Función helper para manejar respuestas
const sendResponse = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

// Función helper para manejar errores
const handleError = (res, error, defaultMessage = 'Error en el servidor') => {
    console.error('Error:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || defaultMessage;
    const errorResponse = {
        error: message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
    sendResponse(res, statusCode, errorResponse);
};

// Wrapper para manejar autenticación como Promise
const authenticate = (req) => {
    return new Promise((resolve, reject) => {
        authenticateToken(req, (error, user) => {
            if (error) reject(error);
            else resolve(user);
        });
    });
};

// Wrapper para manejar autorización como Promise
const authorize = (roles, user) => {
    return new Promise((resolve, reject) => {
        authorizeRole(roles, user, (error) => {
            if (error) {
                reject(new Error(error.error || 'No autorizado'));
            } else {
                resolve();
            }
        });
    });
};

// Función para validar datos obligatorios
const validateRequiredFields = (data, fields) => {
    for (const field of fields) {
        if (!data[field]) {
            const error = new Error(`Campo requerido: ${field}`);
            error.statusCode = 400;
            throw error;
        }
    }
};

// Conectar a la base de datos
connectDB();

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') {
        return sendResponse(res, 204, null);
    }

    // Función para obtener el cuerpo de la petición
    const getRequestBody = async () => {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch (error) {
                    const parseError = new Error('Invalid JSON');
                    parseError.statusCode = 400;
                    reject(parseError);
                }
            });
            req.on('error', reject);
        });
    };

    try {
        const body = await getRequestBody();

        // Rutas de autenticación
        if (path === '/auth/register' && method === 'POST') {
            try {
                validateRequiredFields(body, ['nombre_usuario', 'nombre', 'email', 'telefono', 'fecha_nacimiento', 'password', 'rol_id']);
                const result = await new Promise((resolve, reject) => {
                    registerUser(body.nombre_usuario, body.nombre, body.email, body.telefono, body.fecha_nacimiento, body.password, body.rol_id, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                });
                sendResponse(res, 201, { message: 'Usuario registrado exitosamente', userId: result.id });
            } catch (error) {
                handleError(res, error, 'Error en el registro de usuario');
            }
            return;
        }

        if (path === '/auth/login' && method === 'POST') {
            try {
                validateRequiredFields(body, ['email', 'password']);
                const result = await new Promise((resolve, reject) => {
                    loginUser(body.email, body.password, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                });
                if (!result) {
                    const error = new Error('Credenciales incorrectas');
                    error.statusCode = 401;
                    throw error;
                }
                sendResponse(res, 200, { message: 'Inicio de sesión exitoso', token: result.token });
            } catch (error) {
                handleError(res, error, 'Error en el inicio de sesión');
            }
            return;
        }

        // Rutas protegidas
        if (path.startsWith('/suppliers') || path.startsWith('/products') || path.startsWith('/category') || path.startsWith('/users')) {
            try {
                const user = await authenticate(req);

                // ==================== RUTAS DE USUARIOS ====================
                if (path === '/users' && method === 'GET') {
                    try {
                        await authorize(['superadmin'], user);
                        const users = await new Promise((resolve, reject) => {
                            getAllUsers((error, users) => {
                                if (error) reject(error);
                                else resolve(users);
                            });
                        });
                        sendResponse(res, 200, users);
                    } catch (error) {
                        handleError(res, error, 'Error al obtener usuarios');
                    }
                    return;
                }

                const userIdMatch = path.match(/^\/users\/([^/]+)$/);
                if (userIdMatch) {
                    const userId = userIdMatch[1];

                    if (method === 'PUT') {
                        try {
                            await authorize(['superadmin', 'admin'], user);
                            validateRequiredFields(body, ['nombre_usuario', 'nombre', 'email', 'telefono', 'fecha_nacimiento', 'rol_id']);
                            const result = await new Promise((resolve, reject) => {
                                updateUser(userId, body.nombre_usuario, body.nombre, body.email, body.telefono, body.fecha_nacimiento, body.rol_id, (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result);
                                });
                            });
                            sendResponse(res, 200, result);
                        } catch (error) {
                            handleError(res, error, 'Error al actualizar usuario');
                        }
                        return;
                    }

                    if (method === 'DELETE') {
                        try {
                            await authorize(['superadmin'], user);
                            const result = await new Promise((resolve, reject) => {
                                deleteUser(userId, (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result);
                                });
                            });
                            sendResponse(res, 200, result);
                        } catch (error) {
                            handleError(res, error, 'Error al eliminar usuario');
                        }
                        return;
                    }
                }
                app.get('/auth/profile', getProfile);
// ==================== RUTAS DE PROVEEDORES ====================
if (path === '/suppliers' && method === 'GET') {
    try {
        const suppliers = await new Promise((resolve, reject) => {
            getAllSuppliers((error, suppliers) => {
                if (error) reject(error);
                else resolve(suppliers);
            });
        });
        sendResponse(res, 200, suppliers);
    } catch (error) {
        handleError(res, error, 'Error al obtener proveedores');
    }
    return;
}

if (path === '/suppliers' && method === 'POST') {
    try {
        await authorize(['superadmin', 'admin'], user);
        validateRequiredFields(body, ['name', 'contact_info', 'direccion', 'registro', 'encargado', 'telefono']);
        const result = await new Promise((resolve, reject) => {
            createSupplier(body.name, body.contact_info, body.direccion, body.registro, body.encargado, body.telefono, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
        sendResponse(res, 201, result);
    } catch (error) {
        handleError(res, error, 'Error al crear proveedor');
    }
    return;
}

const supplierIdMatch = path.match(/^\/suppliers\/([^/]+)$/);
if (supplierIdMatch) {
    const supplierId = supplierIdMatch[1];

    if (method === 'GET') { // Añadir esta sección
        try {
            const supplier = await new Promise((resolve, reject) => {
                getSupplierById(supplierId, (error, supplier) => {
                    if (error) reject(error);
                    else resolve(supplier);
                });
            });
            if (!supplier) {
                sendResponse(res, 404, { error: 'Proveedor no encontrado' });
            } else {
                sendResponse(res, 200, supplier);
            }
        } catch (error) {
            handleError(res, error, 'Error al obtener proveedor');
        }
        return;
    }

    if (method === 'PUT') {
        try {
            await authorize(['superadmin', 'admin'], user);
            validateRequiredFields(body, ['name', 'contact_info', 'direccion', 'registro', 'encargado', 'telefono']);
            const result = await new Promise((resolve, reject) => {
                updateSupplier(supplierId, body.name, body.contact_info, body.direccion, body.registro, body.encargado, body.telefono, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
            sendResponse(res, 200, result);
        } catch (error) {
            handleError(res, error, 'Error al actualizar proveedor');
        }
        return;
    }

    if (method === 'DELETE') {
        try {
            await authorize(['superadmin'], user);
            const result = await new Promise((resolve, reject) => {
                deleteSupplier(supplierId, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
            sendResponse(res, 200, result);
        } catch (error) {
            handleError(res, error, 'Error al eliminar proveedor');
        }
        return;
    }
}

                // ==================== RUTAS DE CATEGORÍAS ====================
                if (path === '/category' && method === 'GET') {
                    try {
                        const categories = await new Promise((resolve, reject) => {
                            getAllCategories((error, categories) => {
                                if (error) reject(error);
                                else resolve(categories);
                            });
                        });
                        sendResponse(res, 200, categories);
                    } catch (error) {
                        handleError(res, error, 'Error al obtener categorías');
                    }
                    return;
                }

                if (path === '/category' && method === 'POST') {
                    try {
                        await authorize(['superadmin', 'admin'], user);
                        validateRequiredFields(body, ['name', 'descripcion', 'ubicacion', 'disponible', 'tipo', 'area']);
                        const result = await new Promise((resolve, reject) => {
                            createCategory(body.name, body.descripcion, body.ubicacion, body.disponible, body.tipo, body.area, (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            });
                        });
                        sendResponse(res, 201, result);
                    } catch (error) {
                        handleError(res, error, 'Error al crear categoría');
                    }
                    return;
                }

                const categoryIdMatch = path.match(/^\/category\/([^/]+)$/);
                if (categoryIdMatch) {
                    const categoryId = categoryIdMatch[1];

                    if (method === 'PUT') {
                        try {
                            await authorize(['superadmin', 'admin'], user);
                            validateRequiredFields(body, ['name', 'descripcion', 'ubicacion', 'disponible', 'tipo', 'area']);
                            const result = await new Promise((resolve, reject) => {
                                updateCategory(categoryId, body.name, body.descripcion, body.ubicacion, body.disponible, body.tipo, body.area, (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result);
                                });
                            });
                            sendResponse(res, 200, result);
                        } catch (error) {
                            handleError(res, error, 'Error al actualizar categoría');
                        }
                        return;
                    }

                    if (method === 'DELETE') {
                        try {
                            await authorize(['superadmin'], user);
                            const result = await new Promise((resolve, reject) => {
                                deleteCategory(categoryId, (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result);
                                });
                            });
                            sendResponse(res, 200, result);
                        } catch (error) {
                            handleError(res, error, 'Error al eliminar categoría');
                        }
                        return;
                    }
                }

                // ==================== RUTAS DE PRODUCTOS ====================
if (path === '/products/search' && method === 'GET') {
    try {
        const results = await new Promise((resolve, reject) => {
            advancedSearch(parsedUrl.query, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        sendResponse(res, 200, results);
    } catch (error) {
        handleError(res, error, 'Error en la búsqueda avanzada de productos');
    }
    return;
}

if (path === '/products' && method === 'GET') {
    try {
        const products = await new Promise((resolve, reject) => {
            getAllProducts((error, products) => {
                if (error) reject(error);
                else resolve(products);
            });
        });
        sendResponse(res, 200, products);
    } catch (error) {
        handleError(res, error, 'Error al obtener productos');
    }
    return;
}

if (path === '/products' && method === 'POST') {
    try {
        const user = await authenticate(req);
        await authorize(['superadmin', 'admin'], user);

        validateRequiredFields(body, ['name', 'price', 'category_id', 'description', 'stock', 'supplier_id']);

        const result = await new Promise((resolve, reject) => {
            createProduct(
                body.name, body.price, body.category_id, body.description, body.stock, body.supplier_id,
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        });

        sendResponse(res, 201, { message: 'Producto creado exitosamente', productId: result.id });
    } catch (error) {
        handleError(res, error, 'Error creando producto');
    }
    return;
}

const productIdMatch = path.match(/^\/products\/([^/]+)$/);
if (productIdMatch) {
    const productId = productIdMatch[1];

    if (method === 'PUT') {
        try {
            const user = await authenticate(req);
            await authorize(['superadmin', 'admin'], user);

            validateRequiredFields(body, ['name', 'description', 'category_id', 'price', 'stock', 'supplier_id']);

            const result = await new Promise((resolve, reject) => {
                updateProduct(
                    productId, body.name, body.description, body.category_id, body.price, body.stock, body.supplier_id,
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
            });

            sendResponse(res, 200, { message: 'Producto actualizado exitosamente', updatedProduct: result });
        } catch (error) {
            handleError(res, error, 'Error actualizando producto');
        }
        return;
    }

    if (method === 'DELETE') {
        try {
            const user = await authenticate(req);
            await authorize(['superadmin'], user);

            const result = await new Promise((resolve, reject) => {
                deleteProduct(productId, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });

            sendResponse(res, 200, { message: 'Producto eliminado exitosamente', deletedProductId: result.id });
        } catch (error) {
            handleError(res, error, 'Error eliminando producto');
        }
        return;
    }
}



            } catch (error) {
                handleError(res, error, 'Error de autenticación');
            }
        }

        // Ruta no encontrada
        const notFoundError = new Error('Ruta no encontrada');
        notFoundError.statusCode = 404;
        throw notFoundError;

    } catch (error) {
        handleError(res, error);
    }
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Aquí podrías agregar lógica para notificar al equipo de desarrollo
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    // Aquí podrías agregar lógica para notificar al equipo de desarrollo
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});