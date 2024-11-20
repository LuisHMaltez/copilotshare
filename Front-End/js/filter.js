// filter.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.php'; // Redirigir al inicio de sesión si no hay token
    }

    // Cargar proveedores
    fetch('http://localhost:3000/suppliers', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(suppliers => {
        const providerSelect = document.getElementById('providerSelect');
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier._id;
            option.textContent = supplier.name;
            providerSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error al cargar los proveedores:', error));

    // Cargar categorías
    fetch('http://localhost:3000/category', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(categories => {
        const categorySelect = document.getElementById('categorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category._id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error al cargar las categorías:', error));
});
