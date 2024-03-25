import { Producto } from "./classes.js";


const btnForm = document.getElementById('btnForm');



//Mostramos las categorias con sus productos
function menuDisplay() {

    const productList = JSON.parse(localStorage.getItem('productos')) || [
        // Hamburguesas
        new Producto('Hamburguesa Clásica', 'Deliciosa hamburguesa con carne de res, lechuga, tomate y salsa especial', 'hamburguesa_clasica.jpg', 8.99, 20, 'Hamburguesas'),
        new Producto('Hamburguesa BBQ', 'Hamburguesa con salsa BBQ, cebolla caramelizada y queso cheddar', 'hamburguesa_bbq.jpg', 9.99, 15, 'Hamburguesas'),
        new Producto('Hamburguesa Vegetariana', 'Hamburguesa vegetariana con queso de cabra, espinacas y aguacate', 'hamburguesa_vegetariana.jpg', 7.99, 25, 'Hamburguesas'),
        new Producto('Hamburguesa Doble', 'Hamburguesa doble con doble de carne, queso, tocino y salsa especial', 'hamburguesa_doble.jpg', 10.99, 18, 'Hamburguesas'),
        new Producto('Hamburguesa de Pollo', 'Hamburguesa de pollo crujiente con lechuga, tomate y mayonesa', 'hamburguesa_pollo.jpg', 8.49, 22, 'Hamburguesas'),
        new Producto('Hamburguesa Mexicana', 'Hamburguesa con guacamole, jalapeños, queso pepper jack y salsa picante', 'hamburguesa_mexicana.jpg', 9.49, 17, 'Hamburguesas'),
        new Producto('Hamburguesa Hawaiana', 'Hamburguesa con piña a la parrilla, jamón, queso suizo y salsa de mango', 'hamburguesa_hawaiana.jpg', 9.99, 20, 'Hamburguesas'),
        new Producto('Hamburguesa de Pescado', 'Hamburguesa de pescado empanizado con aderezo tártaro y lechuga', 'hamburguesa_pescado.jpg', 9.99, 14, 'Hamburguesas'),
        new Producto('Hamburguesa de Camarones', 'Hamburguesa de camarones a la parrilla con aguacate y salsa de chipotle', 'hamburguesa_camarones.jpg', 11.99, 12, 'Hamburguesas'),
        new Producto('Hamburguesa de Ternera', 'Hamburguesa gourmet con carne de ternera, queso brie y cebolla caramelizada', 'hamburguesa_ternera.jpg', 10.99, 16, 'Hamburguesas'),

        // Entradas
        new Producto('Aros de Cebolla', 'Aros de cebolla crujientes acompañados de salsa BBQ', 'aros_cebolla.jpg', 5.99, 30, 'Entradas'),
        new Producto('Papas Fritas', 'Papas fritas con sal y condimentos, acompañadas de kétchup y mayonesa', 'papas_fritas.jpg', 4.99, 35, 'Entradas'),
        new Producto('Palitos de Queso', 'Palitos de queso mozzarella empanizados y fritos, con salsa marinara', 'palitos_queso.jpg', 6.99, 25, 'Entradas'),
        new Producto('Alitas de Pollo', 'Alitas de pollo crujientes con salsa picante y aderezo ranch', 'alitas_pollo.jpg', 8.99, 20, 'Entradas'),
        new Producto('Nachos Supreme', 'Nachos cubiertos con carne de res, queso, jalapeños, guacamole y crema agria', 'nachos_supreme.jpg', 9.99, 18, 'Entradas'),
        new Producto('Rollitos de Primavera', 'Rollitos de primavera rellenos de vegetales, acompañados de salsa agridulce', 'rollitos_primavera.jpg', 7.49, 22, 'Entradas'),
        new Producto('Quesadillas', 'Quesadillas de pollo o carne asada con queso cheddar derretido, servidas con guacamole y salsa', 'quesadillas.jpg', 8.49, 25, 'Entradas'),
        new Producto('Tacos de Camarón', 'Tacos de camarón al estilo Baja, servidos con repollo, salsa de cilantro y lima', 'tacos_camaron.jpg', 10.49, 20, 'Entradas'),
        new Producto('Ensalada César', 'Ensalada fresca con pollo a la parrilla, crutones, queso parmesano y aderezo César', 'ensalada_cesar.jpg', 7.99, 28, 'Entradas'),
        new Producto('Sopa de Tortilla', 'Sopa caliente de pollo, tomate, tortilla crujiente, aguacate y queso', 'sopa_tortilla.jpg', 6.99, 30, 'Entradas')

    ];

    const productsContainer = document.getElementById('productsContainer');
    //Lista de categorias
    const categoryList = {};
    productList.forEach(p => {
        if (!categoryList[p.category]) {
            categoryList[p.category] = [];
        }
        categoryList[p.category].push(p);
        console.log(categoryList);
    });

    for (const category in categoryList) {
        if (categoryList.hasOwnProperty(category)) {

            const productCategory = categoryList[category];

            const categoryContainer = document.createElement('div');
            categoryContainer.innerHTML = `<h2>${category}</h2>`;
            categoryContainer.style.display = "flex"

            productCategory.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.classList.add('producto');
                const btnAdd = document.createElement('button');
                btnAdd.classList.add('btnCarrito');
                btnAdd.addEventListener("click", () => {
                    addToCart(producto.id)
                });
                btnAdd.innerHTML = `Añadir al Carrito`
                productoElement.innerHTML = `
                <img src="${producto.imgUrl}" alt="${producto.name}">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p>Precio: $${producto.price}</p>
                <p>Stock: ${producto.stock}</p>
                <p> Categoria: ${producto.category} </p>
                `;
                productoElement.appendChild(btnAdd);
                categoryContainer.appendChild(productoElement)
            });

            productsContainer.appendChild(categoryContainer);
        }
    }


    //Guardamos el menu (esto para evitar que el menu guardado este vacido)
    localStorage.setItem('productos', JSON.stringify(productList));
}

function addToCart(id) {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const productList = JSON.parse(localStorage.getItem('productos'))
    let productoIn = cartList.findIndex(producto => producto.id === id);


    if (productoIn !== -1) {
        if (cartList[productoIn].cantidad < cartList[productoIn].stock) {
            cartList[productoIn].cantidad++;
            localStorage.setItem('carrito', JSON.stringify(cartList));
        } else {
            return;
        }
    } else {

        const producto = productList.find(producto => producto.id === id);
    
        if (producto && producto.stock > 0) {
            cartList.push({ ...producto, cantidad: 1 });
            localStorage.setItem('carrito', JSON.stringify(cartList));
        } else {
            console.error("No se consiguio el producto")
        }
    }
    cartDisplay();
}

function cartDisplay() {
    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartContainer');
    container.innerHTML = ' ';
    cartList.forEach(producto => {
        const element = document.createElement('div')
        element.classList.add('productoCarrito');
        element.innerHTML = `
        <p> ${producto.name} - Cantidad ${producto.cantidad} - Total ${producto.price * producto.cantidad} | ${producto.price} c/u </p> 
        `
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btnEliminar');
        btnEliminar.addEventListener('click', () => {
            removeToCart(producto.id);
        })
        const btnAdd = document.createElement('button');
        btnAdd.classList.add('btnAñadir');
        btnAdd.addEventListener('click', () => {
            addToCart(producto.id);
        })
        btnAdd.textContent = '+';
        btnEliminar.textContent = '-';
        element.appendChild(btnAdd);
        element.appendChild(btnEliminar);
        container.appendChild(element);
    })
}

function removeToCart(id) {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    let index = cartList.findIndex(producto => producto.id === id);
    if (index !== -1) {
        if (cartList[index].cantidad > 1) {
            cartList[index].cantidad--;
        } else {
            cartList.splice(index, 1);
        }

    } else {
        alert("El producto no se encontro")
    }
    localStorage.setItem('carrito', JSON.stringify(cartList));
    cartDisplay();
}

//Mostramos siempre al iniciar la pagina el menu
menuDisplay()
cartDisplay()