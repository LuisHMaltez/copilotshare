// login.js

// Función para decodificar el token JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.error('Error al iniciar sesión:', result.error);
                alert('Error al iniciar sesión: ' + result.error);
            } else {
                console.log('Usuario autenticado:', result);
                localStorage.setItem('token', result.token);

                // Decodificar el token para obtener el rol del usuario
                const decodedToken = parseJwt(result.token);
                const userRole = decodedToken.rol_id;
                let redirectUrl = '';

                switch (userRole) {
                    case 'user':
                        redirectUrl = 'user/products.php';
                        break;
                    case 'admin':
                        redirectUrl = 'admin/products.php';
                        break;
                    case 'superadmin':
                        redirectUrl = 'superadmin/products.php';
                        break;
                    default:
                        console.error('Rol desconocido:', userRole);
                        alert('Error: Rol desconocido');
                        return;
                }

                alert('Inicio de sesión exitoso');
                window.location.href = redirectUrl;
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: ' + error);
        });
    });
});
