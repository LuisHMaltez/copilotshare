// products.js

// Función para cargar productos con filtros
function loadProducts(filters = {}) {
    let url = 'http://localhost:3000/products/search';

    if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                params.append(key, value);
            }
        }
        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = '<p>No se encontraron productos con los filtros seleccionados</p>';
            return;
        }

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="../assets/img/Products.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Proveedor: ${product.supplier_name || 'Proveedor desconocido'}</p>
                <p>Categoría: ${product.category_name || 'Categoría desconocida'}</p>
                <!-- <button>Agregar al Carrito</button> -->
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        const container = document.getElementById('productsContainer');
        container.innerHTML = '<p>Error al cargar los productos. Por favor, intenta nuevamente.</p>';
    });
}

// Función para cargar opciones en los selectores
function loadSelectOptions(url, selectElementId) {
    const selectElement = document.getElementById(selectElementId);
    if (selectElement) {
        selectElement.innerHTML = '<option value="">Selecciona una opción</option>'; // Limpiar el select para evitar duplicados
    }

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(items => {
        if (selectElement) {
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item._id;
                option.textContent = item.name;
                selectElement.appendChild(option);
            });
        }
    })
    .catch(error => console.error(`Error al cargar ${selectElementId}:`, error));
}

// Función para manejar los filtros
function handleFilters(event) {
    if (event) {
        event.preventDefault();
    }

    const nameFilter = document.getElementById('productName')?.value || '';
    const minPriceFilter = document.getElementById('minPrice')?.value || '';
    const maxPriceFilter = document.getElementById('maxPrice')?.value || '';
    const supplierFilter = document.getElementById('providerSelect')?.value || '';
    const categoryFilter = document.getElementById('categorySelect')?.value || '';

    const filters = {};

    if (nameFilter.trim()) filters.name = nameFilter.trim();
    if (minPriceFilter) filters.minPrice = minPriceFilter;
    if (maxPriceFilter) filters.maxPrice = maxPriceFilter;
    if (supplierFilter) filters.supplier = supplierFilter;
    if (categoryFilter) filters.category = categoryFilter;

    loadProducts(filters);
}

// Función para mostrar/ocultar el formulario de filtros
function toggleFilter() {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.style.display = filterForm.style.display === 'none' ? 'block' : 'none';
    }
}

// Función para eliminar todos los filtros
function clearFilters() {
    document.getElementById('productName').value = '';
    document.getElementById('providerSelect').value = '';
    document.getElementById('categorySelect').value = '';
    handleFilters(); // Cargar productos sin filtros
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const filterButton = document.getElementById('filterButton');
    if (filterButton) {
        filterButton.addEventListener('click', handleFilters);
    }

    const clearFilterButton = document.getElementById('clearFilterButton');
    if (clearFilterButton) {
        clearFilterButton.addEventListener('click', clearFilters);
    }

    const inputs = ['productName', 'minPrice', 'maxPrice', 'providerSelect', 'categorySelect'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', handleFilters);
        }
    });
});
