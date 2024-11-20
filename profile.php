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
                <li><a href="edit-users.php">Editar Usuarios</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="profile"> 
            <h2>Tu Perfil</h2> 
            <p>Nombre de Usuario: <span id="username"></span></p>
            <p>Nombre: <span id="name"></span></p> 
            <p>Email: <span id="email"></span></p> 
            <p>Teléfono: <span id="phone"></span></p> 
            <p>Fecha de Nacimiento: <span id="birthdate"></span></p> 
            <p>Rol: <span id="role">superadmin</span></p> 
            <button onclick="location.href='edit-profile.php'">Editar Perfil</button> 
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
