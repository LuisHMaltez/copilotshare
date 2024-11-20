// catalog.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    fetch('http://localhost:3000/products', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <button onclick="window.location.href='edit-product.php?id=${product._id}'">Editar</button>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

function deleteProduct(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Producto eliminado:', result);
        location.reload(); // Recargar la lista de productos
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}
