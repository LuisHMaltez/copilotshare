<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Productos</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<header>
        <h1>Editar Catálogo</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/edit-catalog.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="products.php">Productos</a></li>
                <li><a class="logout" href="../index.php">Cerrar Sesión</a></li>
                <li><a href="suppliers.php">Proveedores</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="products-list">
            <h2 class="page-title">Catalogo</h2>
            <div class="product-inner-list" id="productsContainer">
            <!-- Lista de productos se cargará dinámicamente aquí -->
            </div>
            <button id="add-product-btn" onclick="window.location.href='add-product.php'">Agregar Producto</button>
        </section>
    </main>
    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>
    <script src="../js/auth.js"></script>
    <script src="../js/catalog.js"></script>
</body>
</html>
