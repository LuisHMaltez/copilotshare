// suppliers.js

function loadSuppliers() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    fetch('http://localhost:3000/suppliers', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(suppliers => {
        const container = document.getElementById('suppliersContainer');
        container.innerHTML = '';
        suppliers.forEach(supplier => {
            const supplierDiv = document.createElement('div');
            supplierDiv.classList.add('supplier');
            supplierDiv.innerHTML = `
                <h3>${supplier.name}</h3>
                <p>${supplier.contact_info}</p>
                <button onclick="window.location.href='edit-supplier.php?id=${supplier._id}'">Editar</button>
                <button class="delete-btn" onclick="deleteSupplier('${supplier._id}')">Eliminar</button>
            `;
            container.appendChild(supplierDiv);
        });
    })
    .catch(error => console.error('Error al cargar los proveedores:', error));
}

function deleteSupplier(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer.')) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    fetch(`http://localhost:3000/suppliers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Proveedor eliminado:', result);
        loadSuppliers(); // Recargar la lista de proveedores
    })
    .catch(error => console.error('Error al eliminar el proveedor:', error));
}

document.addEventListener('DOMContentLoaded', loadSuppliers);
