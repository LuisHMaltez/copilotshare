// register.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.error('Error al registrar:', result.error);
                alert('Error al registrar: ' + result.error);
            } else {
                console.log('Usuario registrado:', result);
                alert('Usuario registrado con éxito');
                window.location.href = 'login.php'; // Redirigir al inicio de sesión
            }
        })
        .catch(error => {
            console.error('Error al registrar:', error);
            alert('Error al registrar: ' + error);
        });
    });
});
