<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Producto</h1>
    </header>
    <main>
        <section id="editProduct">
            <form id="editProductForm">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
                <label for="price">Precio:</label>
                <input type="double" id="price" name="price" required>
                <label for="category_id">Categoría:</label>
                    <select id="categorySelect" name="category_id" required>
                        <option value="">Selecciona una categoría</option>
                    </select>
                <label for="description">Descripción:</label>
                <textarea id="description" name="description" required></textarea>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required>
                <label for="supplier_id">Proveedor:</label>
                    <select id="providerSelect" name="supplier_id" required>
                        <option value="">Selecciona un proveedor</option>
                    </select>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onclick="cancelEdit()">Cancelar</button>
                <button type="button" class="delete-btn" onclick="deleteProduct()">Eliminar</button>
            </form>
        </section>
    </main>
    <script src="../js/filter.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/edit-product.js"></script>
</body>
</html>
