// edit-user.js

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
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('nombre_usuario').value = user.nombre_usuario || '';
        document.getElementById('nombre').value = user.nombre || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('telefono').value = user.telefono || '';
        document.getElementById('fecha_nacimiento').value = user.fecha_nacimiento || '';
        document.getElementById('rol_id').value = user.rol_id || '';
    })
    .catch(error => console.error('Error al cargar los detalles del usuario:', error));

    document.getElementById('editUserForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Usuario actualizado:', result);
            window.location.href = 'edit-users.php'; // Redirige de vuelta a la lista de usuarios
        })
        .catch(error => console.error('Error al actualizar el usuario:', error));
    });
});

function cancelEdit() {
    window.location.href = 'edit-users.php'; // Redirige de vuelta a la lista de usuarios
}

function deleteUser() {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Usuario eliminado:', result);
        window.location.href = 'edit-users.php'; // Redirige de vuelta a la lista de usuarios
    })
    .catch(error => console.error('Error al eliminar el usuario:', error));
}
