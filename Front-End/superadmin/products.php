<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Productos - Supermercado Seguro</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    
    <header>
        <h1>Productos</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/product-list.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="suppliers.php">Proveedores</a></li>
                <li><a class="logout" href="../index.php">Cerrar Sesión</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
                <li><a href="edit-users.php">Editar Usuarios</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="product-list">
            <h2 class="page-title">Lista de Productos</h2>
            
            <!-- Botón de Filtro -->
            <button class="filter-button" onclick="toggleFilter()">☰ Filtro</button>
            
            <!-- Formulario de Filtro -->
            <div class="filter-form" id="filterForm" style="display: none;">
                <input type="text" id="productName" placeholder="Nombre del Producto">
    
                <select id="providerSelect">
                <option value="">Selecciona un proveedor</option>
                </select>

                <select id="categorySelect">
                <option value="">Selecciona una categoría</option>
                </select>

                <button type="button" id="filterButton">Aplicar filtros</button>
                <button class="delete-btn" type="button" id="clearFilterButton">Eliminar Filtros</button>
            </div>

            <div class="product-inner-list" id="productsContainer">
                <!-- Los productos se cargarán aquí dinámicamente -->
            </div>
        </section>
    </main>

    <script src="../js/auth.js"></script>
    <script src="../js/products.js"></script>
    <script src="../js/filter.js"></script>
    <script src="../js/main.js"></script>
</body>
</html>