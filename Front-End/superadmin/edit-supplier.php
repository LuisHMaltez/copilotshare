<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Proveedor - Supermercado Seguro</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Proveedor</h1>
        <img class="header-img-index" src="../assets/img/edit-supplier.png" alt="edit-supplier">
    </header>

    <main>
        <section id="edit-supplier">
            <h2 class="page-title">Editar Proveedor</h2>
            <form id="editSupplierForm">
                <input type="hidden" id="supplierId" name="supplierId">
                <input type="text" id="name" name="name" placeholder="Nombre del Proveedor" required>
                <input type="email" id="contact_info" name="contact_info" placeholder="Email" required>
                <input type="text" id="direccion" name="direccion" placeholder="Dirección" required>
                <input type="text" id="registro" name="registro" placeholder="Registro" required>
                <input type="text" id="encargado" name="encargado" placeholder="Nombre del Encargado" required>
                <input type="text" id="phone" name="telefono" placeholder="Teléfono" required>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onclick="window.location.href='suppliers.php'">Cancelar</button>
            </form>
        </section>
    </main>

    <script src="../js/edit-supplier.js"></script>
</body>
</html>
