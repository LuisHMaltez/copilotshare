<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    
    <header>
        <h1>Iniciar Sesión</h1>
    </header>

    <main>
        <section id="login-section">
            <h2 class="page-title">Bienvenido</h2>
            
            <form id="loginForm">
                <input type="email" name="email" placeholder="Correo electrónico" required>
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit">Iniciar Sesión</button>
                <button type="button" onclick="window.location.href='index.php'">Cancelar</button>
            </form>
            <p>¿No tienes una cuenta? <a class="change-option" href="register.php">Regístrate</a></p>
        </section>
    </main>
    <script src="js/login.js"></script>
    
</body>
</html>
