<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Proveedor - Supermercado Seguro</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Agregar Proveedor</h1>
        <img class="header-img-index" src="../assets/img/add-supplier.png" alt="add-supplier">
    </header>

    <main>
        <section id="add-supplier">
            <h2 class="page-title">Agregar Nuevo Proveedor</h2>
            <form id="addSupplierForm">
                <input type="text" name="name" placeholder="Nombre del Proveedor" required>
                <input type="email" name="contact_info" placeholder="Email" required>
                <input type="text" name="direccion" placeholder="Dirección" required>
                <input type="text" name="registro" placeholder="Registro" required>
                <input type="text" name="encargado" placeholder="Nombre del Encargado" required>
                <input type="number" id="phone" name="telefono" placeholder="Telefono" required>
                <button type="submit">Agregar Proveedor</button>
                <button type="button" onclick="window.location.href='suppliers.php'">Cancelar</button>
            </form>
        </section>
    </main>
    <script src="../js/add-supplier.js"></script>
</body>
</html>
