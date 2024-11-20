// edit-profile.js

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    const user = parseJwt(token);

    fetch(`http://localhost:3000/users/${user.userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(userData => {
        const nombre_usuario = document.getElementById('nombre_usuario');
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const fecha_nacimiento = document.getElementById('fecha_nacimiento');

        if (!nombre_usuario || !nombre || !email || !telefono || !fecha_nacimiento) {
            console.error('One or more elements not found');
            return;
        }

        nombre_usuario.value = userData.nombre_usuario || '';
        nombre.value = userData.nombre || '';
        email.value = userData.email || '';
        telefono.value = userData.telefono || '';
        fecha_nacimiento.value = userData.fecha_nacimiento || '';
    })
    .catch(error => console.error('Error al cargar el perfil del usuario:', error));

    document.getElementById('editProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Perfil actualizado:', result);
            window.location.href = 'profile.php'; // Redirige de vuelta al perfil
        })
        .catch(error => console.error('Error al actualizar el perfil:', error));
    });
});
