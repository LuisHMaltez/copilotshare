<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuarios</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Usuarios</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/edit-users.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="products.php">Productos</a></li>
                <li><a class="logout" href="../index.php">Cerrar Sesión</a></li>
                <li><a href="suppliers.php">Proveedores</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="users">
            <div class="product-inner-list" id="usersContainer">
                <!-- Lista de usuarios se cargará aquí dinámicamente -->
            </div>
        </section>
    </main>
    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>
    <script src="../js/auth.js"></script>
    <script src="../js/edit-users.js"></script>
</body>
</html>
