<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proveedores - Supermercado Seguro</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    
    <header>
        <h1>Proveedores</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/suppliers.png" alt="suppliers"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="products.php">Productos</a></li>
                <li><a class="logout" href="../index.php">Cerrar Sesión</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="suppliers-list">
            <h2 class="page-title">Lista de Proveedores</h2>

            <div class="supplier-inner-list" id="suppliersContainer">
                <!-- Los proveedores se cargarán aquí dinámicamente -->
            </div>
            <button id="add-supplier-btn" onclick="window.location.href='add-supplier.php'">Agregar Proveedor</button>
        </section>
    </main>

    <script src="../js/auth.js"></script>
    <script src="../js/suppliers.js"></script>
    <script src="../js/main.js"></script>
</body>
</html>
