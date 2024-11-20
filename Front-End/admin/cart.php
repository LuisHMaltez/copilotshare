<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito - Supermercado Seguro</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

    <header>
        <h1>Carrito</h1>
        <div class="header-inner">
            <img class="header-img" src="../assets/img/cart.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="products.php">Productos</a></li>
                <li><a href="index.php">Cerrar Sesión</a></li>
                <li><a href="suppliers.php">Proveedores</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
                <li><a href="edit-users.php">Editar Usuarios</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="cart">
            <h2 class="page-title">Tu Carrito</h2>
        <div class="product-inner-list">
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 1">
                <h3>Producto 1</h3>
                <p>Precio: $10.00</p>
                <p>Cantidad: 2</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 2">
                <h3>Producto 2</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 3">
                <h3>Producto 3</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 4">
                <h3>Producto 4</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            <div class="cart-item">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Precio: $20.00</p>
                <p>Cantidad: 1</p>
                <p>Total: $20.00</p>
                <button class="delete-btn">Retirar</button>
            </div>
            
            <!-- Más productos aquí -->
        </div>
            <h3 class="total-text">Total a Pagar: $40.00</h3>
        </section>
    </main>

    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>

</body>
</html>
