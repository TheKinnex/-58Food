import { Producto } from "./classes.js";

window.onload = () => {
    if (!JSON.parse(localStorage.getItem('usuario'))) {
        location.replace('./login.html')
    }

    if (JSON.parse(localStorage.getItem('usuario')).rol === 'admin') {
        document.getElementById('navOptionAdmin').classList.remove('hidden')
    }
}


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

    //Obtenemos el contenedor principal
    const categoriesContainer = document.getElementById('categoriesContainer');

    //Creo una array vacia en la cual guardare todas mis categorias
    const categoriesList = {};

    //recorriendo la lista de productos y obteniendo la lista de productos de cada categoria
    productList.forEach(p => {
        if (!categoriesList[p.category]) {
            categoriesList[p.category] = [];
        }
        categoriesList[p.category].push(p);
    });

    //Recorremos todas las categorias de mi lista 
    for (const category in categoriesList) {
        //Comprobamos que el objeto que obtenemos tenga el mismo valor en categoria
        if (categoriesList.hasOwnProperty(category)) {

            //Guardamos los productos
            const products = categoriesList[category];

            //Creamos un div que sera el contenedor de nuestra categoria
            const categoryContainer = document.createElement('div');
            categoryContainer.innerHTML = `
            <h2 class=" py-4">
                <span class=" text-3xl font-semibold md:text-4xl text-pantone">
                    ${category}
                </span>
            </h2>`;

            //añadimos estilo a nuestro contenedor
            categoryContainer.classList.add('p-2', 'bg-black');

            const productContainer = document.createElement('div');
            productContainer.classList.add('flex', 'gap-x-4', 'overflow-scroll', 'productContainer');

            //Recorremos todos nuestros productos
            products.forEach(producto => {

                //creamos un div por producto
                const productoElement = document.createElement('div');

                //Añadimos estilos
                productoElement.classList.add('relative', 'bg-pantone_gunpowder', 'producto', 'text-white', 'h-[28rem]');

                //Creamos el btn para añadir al carrito
                const btnAdd = document.createElement('button');
                //Damos estilos
                btnAdd.classList.add('btnCarrito', 'absolute', 'bottom-0', 'top-[90%]', 'left-0', 'right-0', 'py-2', 'px-1', 'bg-pantone', 'text-pantone_gunpowder', 'font-bold');
                //Colocamos un evento
                btnAdd.addEventListener("click", () => {
                    addToCart(producto.id)
                });
                btnAdd.textContent = `Añadir al Carrito`;


                productoElement.innerHTML = `
                <div class=" w-52 h-52 flex-shrink-0">
                    <img class=" w-full h-full object-cover object-center" src="${producto.imgUrl}" alt="">
                </div>
                <h3 class="mb-2 mt-2 text-pantone ">${producto.name}</h3>
                <p class="mb-2 w-52">${producto.description}</p>
                <p><span class="text-pantone">Precio:</span> $${producto.price}</p>
                <p><span class="text-pantone">Stock:</span> ${producto.stock}</p>

                `;
                productoElement.appendChild(btnAdd);
                productContainer.appendChild(productoElement);
                categoryContainer.appendChild(productContainer);
            });

            categoriesContainer.appendChild(categoryContainer);
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
            alert('No hay stock')
        }
    }
    displayCartList();
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
    displayCartList();
}

function clearCart() {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    cartList = [];
    displayCartList();
    localStorage.setItem('carrito', JSON.stringify(cartList));
    
}

function displayCartList() {
    const cartPopupContainer = document.getElementById('cartPopupContainer');
    const cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalToPay = 0;
    let countProducts = 0;

    cartPopupContainer.innerHTML = ' ';

    if (cartList.length == 0) {
        cartPopupContainer.innerHTML = `
        <div class=" flex w-full h-full justify-center items-center">
        <h2 class=" text-3xl"> El Carrito Esta Vacio</h2>  
        </div>
        `
        document.getElementById('countProducts').textContent = ` `;
        document.getElementById('totalToPayText').textContent = `Total a Pagar: $${totalToPay.toFixed(2)}`;


        document.getElementById('bubbleCartIcon').classList.add('hidden')
        document.getElementById('btnPay').classList.add('hidden');
        document.getElementById('btnClear').classList.add('hidden');
    } else {

        document.getElementById('bubbleCartIcon').classList.remove('hidden');
        document.getElementById('bubbleCartIcon').classList.add('block');

        document.getElementById('btnClear').classList.remove('hidden');
        document.getElementById('btnClear').classList.add('block');

        document.getElementById('btnPay').classList.remove('hidden');
        document.getElementById('btnPay').classList.add('block');

        

        cartList.forEach(producto => {
            const element = document.createElement('div')
            element.classList.add('productoCarrito', 'mt-4');
            element.innerHTML = `
            <p class=" text-pantone">${producto.name}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Total: ${(producto.price * producto.cantidad).toFixed(2)} | ${producto.price} c/u </p>
            `

            totalToPay += (producto.price * producto.cantidad);
            countProducts += 1;

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
            btnAdd.innerHTML = `
            <lord-icon src="https://cdn.lordicon.com/zrkkrrpl.json" trigger="hover"
            style="width:40px;height:40px" colors="primary:#0000,secondary:#ffc700">
            </lord-icon>
            `;
            btnEliminar.innerHTML = `
            <lord-icon src="https://cdn.lordicon.com/dykoqszm.json" trigger="hover"
            style="width:40px;height:40px" colors="primary:#0000,secondary:#ffc700">
            </lord-icon>
            `;
            element.appendChild(btnAdd);
            element.appendChild(btnEliminar);
            cartPopupContainer.appendChild(element);
            
        })

        document.getElementById('countProducts').textContent = `${countProducts}`;
        document.getElementById('totalToPayText').textContent = `Total a Pagar: $${totalToPay.toFixed(2)}`;
    }

}

function cartPopupDisplay() {
    const cartPopup = document.getElementById('cartPopup');
    displayCartList();
    cartPopup.classList.remove('hidden');
    cartPopup.classList.add('block');
}



document.getElementById('cartPopupClose').addEventListener('click', () => {cartPopup.classList.add('hidden'); cartPopup.classList.remove('block');});

document.getElementById('btnClear').addEventListener('click', () => {clearCart()});

document.getElementById('showCart').addEventListener('click', () => { cartPopupDisplay() })

//Mostramos siempre al iniciar la pagina el menu
displayCartList()
menuDisplay()
