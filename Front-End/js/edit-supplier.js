// edit-supplier.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const supplierId = urlParams.get('id');

    if (supplierId) {
        console.log('Cargando datos para el proveedor:', supplierId);
        fetch(`http://localhost:3000/suppliers/${supplierId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(supplier => {
            if (supplier) {
                document.getElementById('supplierId').value = supplier._id;
                document.getElementById('name').value = supplier.name;
                document.getElementById('contact_info').value = supplier.contact_info;
                document.getElementById('direccion').value = supplier.direccion;
                document.getElementById('registro').value = supplier.registro;
                document.getElementById('encargado').value = supplier.encargado;
                document.getElementById('phone').value = supplier.telefono;
            } else {
                console.error('Proveedor no encontrado');
                alert('Proveedor no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar el proveedor:', error));
    }

    document.getElementById('editSupplierForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const token = localStorage.getItem('token');
        console.log('Enviando datos para actualizar el proveedor:', data);

        fetch(`http://localhost:3000/suppliers/${supplierId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log('Proveedor actualizado:', result);
            window.location.href = 'suppliers.php'; // Redirige de vuelta a la lista de proveedores
        })
        .catch(error => console.error('Error al actualizar el proveedor:', error));
    });
});
