<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Usuario</h1>
    </header>
    <main>
        <section id="editUser">
            <form id="editUserForm">
                <label for="nombre_usuario">Nombre de Usuario:</label>
                <input type="text" id="nombre_usuario" name="nombre_usuario" required>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="telefono">Teléfono:</label>
                <input type="text" id="telefono" name="telefono" required>
                <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required>
                <label for="rol_id">Rol:</label>
                <select id="rol_id" name="rol_id" required>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="superadmin">Super Administrador</option>
                </select>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onclick="cancelEdit()">Cancelar</button>
                <button type="button" class="delete-btn" onclick="deleteUser()">Eliminar</button>
            </form>
        </section>
    </main>
    <script src="../js/auth.js"></script>
    <script src="../js/edit-user.js"></script>
</body>
</html>
