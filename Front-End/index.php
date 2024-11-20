<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Supermercado Seguro</h1>
        <img class="header-img-index" src="assets/img/shopping-cart.png" alt="home">
    </header>

    <main>
        <section>
            <h2 class="welcome">Bienvenido a Supermercado Seguro</h2>
            <p class="welcome">Por favor, elija una opción para continuar.</p>
            <div class="buttons">
                <a href="register.php" class="button">Registro</a>
                <a href="login.php" class="button">Inicio de Sesión</a>
            </div>
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
