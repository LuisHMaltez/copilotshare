// edit-product.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`http://localhost:3000/products/${productId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById('name').value = product.name || '';
        document.getElementById('price').value = product.price || '';
        document.getElementById('category_id').value = product.category_id || '';
        document.getElementById('description').value = product.description || '';
        document.getElementById('stock').value = product.stock || '';
        document.getElementById('supplier_id').value = product.supplier_id || '';
    })
    .catch(error => console.error('Error al cargar los detalles del producto:', error));

    document.getElementById('editProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Producto actualizado:', result);
            window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
        })
        .catch(error => console.error('Error al actualizar el producto:', error));
    });
});

function cancelEdit() {
    window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
}

function deleteProduct() {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Producto eliminado:', result);
        window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}
