// add-product.js

// Función para cargar opciones en los selectores
function loadSelectOptions(url, selectElementId) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(items => {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) {
            console.error(`Elemento select con id ${selectElementId} no encontrado`);
            return;
        }
        selectElement.innerHTML = '<option value="">Selecciona una opción</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item._id;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error(`Error al cargar ${selectElementId}:`, error));
}

// Inicializar el formulario
document.addEventListener('DOMContentLoaded', () => {
    // Cargar las opciones de los selectores
    loadSelectOptions('http://localhost:3000/suppliers', 'supplierSelect');
    loadSelectOptions('http://localhost:3000/category', 'categorySelect');
    
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.error('Error al añadir producto:', result.error);
                alert('Error al añadir producto: ' + result.error);
            } else {
                console.log('Producto añadido:', result);
                alert('Producto añadido con éxito');
                window.location.href = 'edit-catalog.php'; // Redirigir al catálogo
            }
        })
        .catch(error => {
            console.error('Error al añadir producto:', error);
            alert('Error al añadir producto: ' + error);
        });
    });
});

function cancelAdd() {
    window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
}
