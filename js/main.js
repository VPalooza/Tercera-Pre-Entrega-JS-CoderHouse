// Carrito 

function recuperarCarrito(){
    return JSON.parse(localStorage.getItem("miCarrito"))
}

const carrito = recuperarCarrito()

// Enlazarse con elementos 

const contenedor = document.querySelectorAll("div.caja")

const btnCarrito = document.querySelector("i#carrito-icon")

// Funciones para hacer dinámico el código HTML+CSS

function retornarItemLista(producto){
return ` <div class="caja caja1">
<h2>${producto.nombre}</h2>
<ul>
<img src=${producto.imagen} />
<li class="item-ingredientes"><b>Ingredientes</b>: ${producto.ingredientes}</li>
<li class="item-porciones"><b>Porciones</b>: ${producto.porciones}</li>
<li class="item-precio"><b>Precio</b>:${producto.precio}</li>
</ul>
<button class="comprar" id="${producto.id}">AÑADIR AL CARRITO</button>
</div>`
}

function devuelveError(){
    return
    `<div class="error-carta">
    <i class="fa-solid fa-circle-exclamation fa-beat"></i>
    <p class="text-error-carta">
        ¡Lo sentimos! Lorem ipsum dolor sit.
    </p>
</div>`
}

// Funciones para filtro de búsqueda

const searchInput = document.querySelector("#buscar-cosas"); 

function performSearch() {
    const searchTerm = searchInput.value.trim().toUpperCase();
    const resultado = productos.filter((producto) =>
        producto.nombre.toUpperCase().includes(searchTerm) ||
        producto.ingredientes.toUpperCase().includes(searchTerm)
    );

    if (resultado.length > 0) {
        llenarCarrito(resultado);
    } else {
        llenarCarrito([]);
    }
}

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== "") {
        performSearch();
    }
});

document.querySelector("#buscar-item-boton").addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
        performSearch();
    }
});

searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
        llenarCarrito(productos);
    }
});


// Funciones para la compra y añadidura de elementos al carrito

function clickBotonesComprar() {
    const botonesCompra = document.querySelectorAll("button.comprar");

    for (let boton of botonesCompra) {
        boton.addEventListener("click", () => {
            const productoSeleccionado = productos.find((producto) => producto.id === parseInt(boton.id));
            carrito.push(productoSeleccionado);
            updateCartBadge(); 
            localStorage.setItem("miCarrito", JSON.stringify(carrito));
        });
    }
}

// Funciones para crear las cartas de los productos
function createCajaElement(producto) {
    const cajaElement = document.createElement("div");
    cajaElement.classList.add("caja", "caja1"); 

    cajaElement.innerHTML = retornarItemLista(producto);
    
    return cajaElement;
}

function llenarCarrito(array) {
    const container = document.querySelector(".container");

    container.innerHTML = '';

    if (array.length > 0) {
        array.forEach((producto) => {
            const cajaElement = createCajaElement(producto);
            container.appendChild(cajaElement);
        });

        clickBotonesComprar();
    } else {
        const errorCaja = document.createElement("div");
        errorCaja.innerHTML = devuelveError();
        container.appendChild(errorCaja);
    }
}

llenarCarrito(productos);

// Tooltip para mostrar info sobre el icono del carrito
btnCarrito.addEventListener("mousemove", ()=>{
    if (carrito.length > 0){
        btnCarrito.title= carrito.length + " producto(s) en el carrito"
    } else {
        btnCarrito.title = "Ir al carrito"
    }
})

btnCarrito.addEventListener("click", ()=>{
    if (carrito.length > 0 ){
location.href= "./pages/checkout.html"
    } else {
        alert("⛔¡Debes agregar al menos un producto!")
    }
})

// Funciones para el tooltip que señala cuantos items hay en el carrito
function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");

    if (!cartBadge) {
        const marketIcon = document.querySelector(".market-icon");
        const badgeElement = document.createElement("span");
        badgeElement.className = "cart-badge";
        marketIcon.appendChild(badgeElement);
    }

    const updatedBadge = document.querySelector(".cart-badge");
    if (carrito.length > 0) {
        updatedBadge.style.display = "block";
        updatedBadge.textContent = carrito.length;
    } else {
        updatedBadge.style.display = "none";
    }
}

updateCartBadge();