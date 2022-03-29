/**************************************************************/
/********************** TIENDA ONLINE *************************/
/**************************************************************/
// Inicializa objeto producto
class Producto {
    constructor(nombre, imagen, cantidad, precio) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

// Inicializa carrito de compras
let carrito = [];

// Cargo carrito
document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('carrito') && (carrito = JSON.parse(localStorage.getItem('carrito')));
})

// Manejar eventos
// Botones de compra
let botonesCompra = document.getElementsByClassName("btnCompra");
for (let i = 0; i < botonesCompra.length; i++) {
    botonesCompra[i].addEventListener("click", agregarProducto.bind(this, i + 1));
}

// Mostrar y ocultar carrito
document.getElementById("carritoIcon").onclick = mostrarCarrito;
document.getElementById("cerrarCarrito").onclick = cerrarCarrito;


// Funciones
// Muestra productos agregados al carrito
function mostrarCarrito() {
    document.getElementById("ventanaCarrito").style.display = "block";

    let lista = document.getElementById("listadoCarrito");
    lista.innerHTML = "";
    let i = 0;

    // Armo HTML para los productos agregados al carrito
    for (const producto of carrito) {
        let prod = document.createElement("div");
        prod.className = "productoCarrito";
        prod.innerHTML = `<img class=\"imagenCarrito\" src=\"${producto.imagen}\" alt=\"${producto.nombre}\">
        <p class=\"textoCarrito\" id=\"carritoItem${i}\">${producto.nombre}</p>
        <button class="btnCarrito" id=\"disminuirItem${i}\">-</button>
        <p class=\"textoCarrito\">${producto.cantidad}</p>
        <button class="btnCarrito" id=\"aumentarItem${i}\">+</button>
        <p class=\"textoCarrito\">$ ${producto.precio * producto.cantidad}</p>
        `;
        lista.append(prod);

        // Añado manejo de eventos para oider aumentar y disminuir la cantidad
        document.getElementById(`disminuirItem${i}`).addEventListener("click", disminuirCantidad.bind(this, i));
        document.getElementById(`aumentarItem${i}`).addEventListener("click", aumentarCantidad.bind(this, i));
        i++;
    }

    // Calcula total de productos agregados
    const total = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.cantidad), 0);
    let totalCarrito = document.createElement("p");
    totalCarrito.innerHTML = `Total: $ ${total}`;
    lista.append(totalCarrito);
}


// Cierra la ventana con productos del carrito
function cerrarCarrito() {
    document.getElementById("ventanaCarrito").style.display = "none";
}


// Agrega producto al carrito
function agregarProducto(item) {
    // Obtengo datos
    let nombre = document.getElementById(`item${item}`).innerText;
    let imagen = document.getElementById(`imgItem${item}`).src;
    let cantidad = document.getElementById(`cantItem${item}`).value;
    let precio = parseInt((document.getElementById(`precioItem${item}`).innerText).split(' ')[1]);

    if (cantidad <= 0) {
        alert("Debe ingresar cantidad mayor a cero");
        return;
    }

    // Buscar si está en carrito.
    let noExiste = carrito.every((prod) => {
        if (prod.nombre == nombre) {
            // Si está, actualizo cantidad
            prod.cantidad += parseInt(cantidad);
            return false;
        }
        return true;
    })

    // Si no está, lo agrega
    if (noExiste) {
        const productoNuevo = new Producto(nombre, imagen, parseInt(cantidad), precio);
        carrito.push(productoNuevo);
    }

    // Guardo carrito en LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Disminuye en una unidad la cantidad del producto
function disminuirCantidad(i) {
    let producto = document.getElementById(`carritoItem${i}`).innerText;
    let indice = carrito.findIndex((prod) => prod.nombre == producto);

    ((carrito[indice].cantidad - 1) == 0) ? carrito.splice(indice, 1): carrito[indice].cantidad--;

    // Actualizo carrito
    mostrarCarrito();
    // Actualizo en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Aumenta en una unidad la cantidad del producto
function aumentarCantidad(i) {
    let producto = document.getElementById(`carritoItem${i}`).innerText;

    let indice = carrito.findIndex((prod) => prod.nombre == producto);
    carrito[indice].cantidad++;

    // Actualizo carrito
    mostrarCarrito();
    // Actualizo en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
