<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Producto</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Añadir Producto</h1>
    </header>
    <main>
        <section id="addProduct">
            <form id="addProductForm">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
                <label for="price">Precio:</label>
                <input type="double" id="price" name="price" required>
                <label for="category">Categoría:</label>
                <select id="categorySelect" name="category_id" required>
                    <option value="">Selecciona una categoría</option>
                    <!-- Las opciones se cargarán dinámicamente aquí -->
                </select>
                <label for="description">Descripción:</label>
                <textarea id="description" name="description" required></textarea>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required>
                <label for="supplier">Proveedor:</label>
                <select id="supplierSelect" name="supplier_id" required>
                    <option value="">Selecciona un proveedor</option>
                    <!-- Las opciones se cargarán dinámicamente aquí -->
                </select>
                <button type="submit">Añadir Producto</button>
                <button type="button" onclick="cancelAdd()">Cancelar</button>
            </form>
        </section>
    </main>
    <script src="../js/auth.js"></script>
    <script src="../js/add-product.js"></script>
</body>
</html>
