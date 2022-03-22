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

// Carrito de compras
let carrito = [];


// Eventos
let botonesCompra = document.getElementsByClassName("btnCompra");
for (let i = 0; i < botonesCompra.length; i++) {
    botonesCompra[i].addEventListener("click", agregarProducto.bind(this, i + 1));
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
}


// Muestra productos agregados al carrito
function mostrarCarrito() {
    document.getElementById("ventanaCarrito").style.display = "block";

    let lista = document.getElementById("listadoCarrito");
    // if (carrito.length > 0) {
        lista.innerHTML = "";
    // }

    for (const producto of carrito) {
        let prod = document.createElement("div");
        prod.className = "productoCarrito";
        prod.innerHTML = `<img class=\"imagenCarrito\" src=\"${producto.imagen}\" alt=\"${producto.nombre}\">
        <p class=\"textoCarrito\">${producto.nombre}</p>
        <p class=\"textoCarrito\">${producto.cantidad}</p>
        <p class=\"textoCarrito\">$ ${producto.precio * producto.cantidad}</p>
        `;
        lista.append(prod);
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