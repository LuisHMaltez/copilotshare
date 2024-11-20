// add-supplier.js

document.getElementById('addSupplierForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:3000/suppliers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Proveedor agregado:', result);
        window.location.href = 'suppliers.php'; // Redirige de vuelta a la lista de proveedores
    })
    .catch(error => console.error('Error al agregar el proveedor:', error));
});
