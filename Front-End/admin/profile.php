<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Usuario</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<header>
        <h1>Perfil</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/profile-view.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="products.php">Productos</a></li>
                <li><a href="suppliers.php">Proveedores</a></li>
                <li><a class="logout" href="../index.php">Cerrar Sesión</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
                <!-- <li><a href="cart.php">Carrito</a></li> -->
            </ul>
        </nav>
    </header>
    <main>
        <section id="profile">
            <h2 class="page-title">Tu Perfil</h2>
            <img src="../assets/img/profile.png" alt="Foto de Perfil">
            <div id="profileDetails">
            
                <!-- Los detalles del perfil se cargarán dinámicamente aquí -->
            </div>
            <button onclick="window.location.href='edit-profile.php'">Editar Perfil</button>
        </section>
    </main>
    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>
    <script src="../js/auth.js"></script>
    <script src="../js/profile.js"></script>
</body>
</html>
