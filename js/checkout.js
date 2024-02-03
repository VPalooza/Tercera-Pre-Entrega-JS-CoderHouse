const tableBody = document.querySelector("table tbody");

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) || [];
}

const carrito = recuperarCarrito();

function armarFilaHTML(producto) {
    return `<tr>
        <td><img src=${producto.imagen} /></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td data-id="${producto.id}" class="eliminar-item" title="Eliminar"><i class="fa-solid fa-circle-xmark"></i></td>
    </tr>`;
}


if (carrito.length > 0) {
    carrito.forEach((producto) => {
        tableBody.innerHTML += armarFilaHTML(producto);
    });
} else {
    // Puedes mostrar un mensaje o realizar alguna acción si el carrito está vacío
    tableBody.innerHTML = "<tr><td colspan='4'>El carrito está vacío</td></tr>";
}


function calcularTotal() {
    let total = 0;

    if (carrito) {
        carrito.forEach((producto) => {
            total += producto.precio || 0; // Asegura que el precio esté definido
        });
    }

    return total.toFixed(2); // Redondea el total a 2 decimales
}

function actualizarTotalEnTabla() {
    const totalElement = document.querySelector("table tfoot tr td:nth-child(3)");
    totalElement.textContent = `$ ${calcularTotal()}`;
}

// Añade esta función después de la definición de actualizarTotalEnTabla()

document.querySelector("table tbody").addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar-item")) {
        const itemId = parseInt(event.target.dataset.id);
        eliminarItemDelCarrito(itemId);
        actualizarTotalEnTabla();
    }
});

function eliminarItemDelCarrito(itemId) {
    const indice = carrito.findIndex((producto) => producto.id === itemId);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        llenarCarrito(carrito);  // Asegúrate de actualizar la visualización del carrito
    }
}


// Llama a esta función cada vez que actualices el carrito
actualizarTotalEnTabla();


