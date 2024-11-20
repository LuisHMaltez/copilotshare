// edit-users.js

function loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    fetch('http://localhost:3000/users', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('usersContainer');
        container.innerHTML = '';
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.innerHTML = `
                <p>Nombre de Usuario:</span></p>
                <h1><span>${user.nombre_usuario}</h1>
                <p>Email: <span>${user.email}</span></p>
                <p>Rol: <span>${user.rol_id}</span></p>
                <button onclick="window.location.href='edit-user.php?id=${user._id}'">Editar</button>
            `;
            container.appendChild(userDiv);
        });
    })
    .catch(error => console.error('Error al cargar los usuarios:', error));
}

document.addEventListener('DOMContentLoaded', loadUsers);
