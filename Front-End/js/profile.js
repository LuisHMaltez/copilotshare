// profile.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/auth/profile', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ruta no encontrada');
        }
        return response.json();
    })
    .then(profile => {
        if (profile.error) {
            console.error('Error al obtener el perfil:', profile.error);
            alert('Error al obtener el perfil');
        } else {
            document.getElementById('username').textContent = profile.nombre_usuario || 'N/A';
            document.getElementById('name').textContent = profile.nombre || 'N/A';
            document.getElementById('email').textContent = profile.email || 'N/A';
            document.getElementById('phone').textContent = profile.telefono || 'N/A';
            document.getElementById('birthdate').textContent = profile.fecha_nacimiento || 'N/A';
            document.getElementById('role').textContent = profile.rol_id || 'N/A';
        }
    })
    .catch(error => {
        console.error('Error al cargar el perfil:', error);
        alert('Error al cargar el perfil');
    });
});
