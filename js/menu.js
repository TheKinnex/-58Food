import { Producto } from "./classes.js";



window.onload = () => {
    if (!JSON.parse(localStorage.getItem('usuario'))) {
        location.replace('./login.html')
    }

    const sesion = JSON.parse(localStorage.getItem('usuario'));

    if (!sesion) {
        return;
    } else {
        document.getElementById('navNoSesion').classList.add('hidden');
        document.getElementById('navSesion').classList.remove('hidden');
        document.getElementById('navDropDownNoSession').classList.add('hidden');
        document.getElementById('navDropDownSession').classList.remove('hidden');
        if (sesion.name === 'admin') {
            document.getElementById('navAdminOption').classList.remove('hidden');
            document.getElementById('navDropDownSessionAdmin').classList.remove('hidden');
        }
    }
}


document.querySelectorAll('.logOut').forEach((e) => {
    e.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        location.replace('./index.html');
    })
})

document.getElementById('btnNavToggle').addEventListener('click', () => {
    const navDropDown = document.getElementById('navDropDown');
    if (navDropDown.className.includes('hidden')) {
        navDropDown.classList.remove('hidden');
        navDropDown.classList.add('animate__animated', 'animate__fadeInDown');
    } else {
        navDropDown.classList.remove('animate__fadeInDown');
        navDropDown.classList.add('animate__animated', 'animate__fadeOutUp');
        setTimeout(() => {
            navDropDown.classList.add('hidden');
            navDropDown.classList.remove('animate__fadeOutUp');
        }, 550);
    }
});


/* ============================================
    LLAMADOS INICIADORES
    ===========================================
*/

displayCartList()
menuDisplay()


/* ============================================
    FUNCIONES DE MOSTRAR
    ===========================================
*/

//Función para mostrar los productos en el menu divididos por sus categorias
function menuDisplay() {

    const productList = JSON.parse(localStorage.getItem('productos')) || [
	
        //Entradas
        new Producto('Trigología de Patacones', 'Deliciosos patacones en presentacion mini cestas, rellenos de pollo mechado con chisps de ajo, pernil mechado con salsa de queso y ensalada rayada con piña.', './img/products/DSC06401.jpg', 5, 20, 'PARA COMPARTIR'),
        new Producto('Trigología de Arepas', 'Presentación de 3 mini arepas, rellenas de Carne Mechada, Pollo, Pernil. Acompañadas de salsa de la casa.', './img/products/DSC06464.jpg', 4, 15, 'PARA COMPARTIR'),
        new Producto('Trigología de Empanadas', 'Mini empanadas hechas de harina de maíz, rellenas de platano con queso blanco, pollo mechado y caraotas con queso blanco. Acompañadas de salsa de la casa.', './img/products/DSC06430.jpg', 2, 30, 'PARA COMPARTIR'),
        new Producto('Trigología de Tequeños', '6 deliciosos deditos de queso, forrados con harina de trigo, fritos; acompañados con salsa tártara.', './img/products/DSC06358.jpg', 3.7, 20, 'PARA COMPARTIR'),
        new Producto('Trigología de la Trigología', 'Donde puedes combinar 3 de nuestras trilogías (trilogías de patacones, empanadas, arepas o tequeños)', './img/products/DSC06478.jpg', 8, 25, 'PARA COMPARTIR'),
    
        //Ensaladas
        new Producto('Ensalda Quinoa', 'Deliciosa y fresca mezcla de Quinoa, tomate, pimenton rojo, verde y amarillo, zanahorias, aceitunas negras, cebolla morada, cilantro y queso palmita, coronado con finas rodajas de aguacate.', './img/products/DSC06741.jpg', 5.28, 15, 'Ensaldas'),
        new Producto('Ensalda Cesar', 'Delicioso mix de lechugas frescas, acompañada de crujientes crutones de pan, queso parmesano, tocino en trozos y pollo en tiras. Acompañado de nuestro delicioso aderezo cesar de la casa.', './img/products/DSC06711.jpg', 5.49, 25, 'Ensaldas'),
        new Producto('Ensalda de Atún', 'Delicioso mix de lechugas, con tomate cherry, heuvo duro, queso palmita, croquetas de atún, acompañada con exquisita vinagreta de la casa.', './img/products/DSC06770.jpg', 6, 35, 'Ensaldas'),
        new Producto('Ensalda de Berro', 'Fresco y delicioso mix de berro, con tomate cherry, queso palmito, mango, aguacate y semilla de maravilla, con su delicioso aderezo de maracuyá.', './img/products/DSC06743.jpg', 5.28, 8, 'Ensaldas'),

        //Sandwiches
        new Producto('Sándwich Mechada', 'Suculento sándwich armado en pan francés artesanal, relleno de carne mechada, tomate frescom huevo frito y queso palmita, aderezado con salsa a base de carne. Acompañado con papas fritas de la casa.', './img/products/DSC06856.jpg', 6, 45, 'Sándwiches'),
        new Producto('Sándwich +58 FooD', 'Delicioso sándwich armado en pan de brioche de la casa, relleno de pernil, queso gouda, jamón, pepinillo, aderezado con salsa de la casa y mostaza. Acompañado con papas fritas de la casa.', './img/products/DSC06937.jpg', 6.35, 30, 'Sándwiches'),
        new Producto('Sándwich Caprese', 'Exquisito sándwich armado en pan de campo de la casa, relleno de queso mozzarella, tomate, aderezado con pesto. Acompañado de papas fritas de la casa.', './img/products/DSC06891.jpg', 6.35, 14, 'Sándwiches'),
        new Producto('Sándwich Club House', 'Contundente sándwich presentado en pan de molde de la casa, relleno de milanesas de pollo, tomate, lechuga, huevo frito, jamón y queso gouda. Acompañado de papas fritas.', './img/products/DSC06911.jpg', 5.79, 54, 'Sándwiches'),


        //Hamburguesas 
        new Producto('Hamburguesa Americana', '180 grs de deliciosa carne de la casa, tocino, queso cheddar, rodajas de tomate, cebolla morada, pepinillo, y lechuga. ', './img/products/DSC06619.jpg', 6.68, 24, 'Hamburguesas'),
        new Producto('Hamburguesa a lo Pobre ', '180 grs de deliciosa carne de la casa, acompañada con cebolla estofada y coranada con un huevo frito.', './img/products/DSC06605.jpg', 5.79, 18, 'Hamburguesas'),
        new Producto('Hamburguesa +58 FooD', '250 grs de deliciosa carne de la casa, acompañada con huevo frito, queso palmita, rodajas de tomate, cebolla encurtida, pepinillos y lechugas. Acompañada de salsa de queso de la casa.', './img/products/DSC06631.jpg', 6.68, 24, 'Hamburguesas'),
        new Producto('Hamburguesa BBQ', '180 grs de deliciosa carne de la casa, tocino, champiñones, queso cheddar, cebolla caramelizada, aderezada con una deliciosa salsa barbecue.', './img/products/DSC06632.jpg', 6.3, 24, 'Hamburguesas'),

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
                productoElement.classList.add('relative', 'bg-pantone_gunpowder', 'producto', 'text-white', 'h-[32rem]');

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
                    <img class=" w-full h-full object-cover" src="${producto.imgUrl}" alt="">
                </div>
                <h3 class="mb-2 mt-2 text-pantone ">${producto.name}</h3>
                <p class="text-sm mb-2 w-52">${producto.description}</p>
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

//Función para mostrar los productos dentro del apartado carrito
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

        document.querySelectorAll('.countProducts').forEach(e => {
            e.textContent = ` `;
        })

        document.getElementById('totalToPayText').textContent = `Total a Pagar: $${totalToPay.toFixed(2)}`;

        document.querySelectorAll('.bubbleCartIcon').forEach(e => {
            e.classList.add('hidden');
        })
        document.getElementById('btnPay').classList.add('hidden');
        document.getElementById('btnClear').classList.add('hidden');
    } else {

        document.querySelectorAll('.bubbleCartIcon').forEach( e => {
            e.classList.remove('hidden');
            e.classList.add('block')
        })

        document.getElementById('btnClear').classList.remove('hidden');
        document.getElementById('btnClear').classList.add('block');

        document.getElementById('btnPay').classList.remove('hidden');
        document.getElementById('btnPay').classList.add('block');

        

        cartList.forEach(producto => {
            const element = document.createElement('div')
            element.classList.add('productoCarrito', 'mt-4');
            element.innerHTML = `
            <p class=" text-pantone">${producto.name}</p>
            <p>Cantidad: ${producto.amount}</p>
            <p>Total: ${(producto.price * producto.amount).toFixed(2)} | ${producto.price} c/u </p>
            `

            totalToPay += (producto.price * producto.amount);
            countProducts += producto.amount;

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

        document.querySelectorAll('.countProducts').forEach(e => {
            e.textContent = `${countProducts}`;
        })
        document.getElementById('totalToPayText').textContent = `Total a Pagar: $${totalToPay.toFixed(2)}`;
    }

}

//Función que muestra la cantidad de productos en el carrito
function cartPopupDisplay() {
    const cartPopup = document.getElementById('cartPopup');
    displayCartList();
    cartPopup.classList.remove('hidden');
    cartPopup.classList.add('block');
}

/* ============================================
    FUNCIONES DEL MENU
    ===========================================
*/

//Función que permite añadir un producto al carrito
function addToCart(id) {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const productList = JSON.parse(localStorage.getItem('productos'))
    let productoIn = cartList.findIndex(producto => producto.id === id);


    if (productoIn !== -1) {
        if (cartList[productoIn].amount < cartList[productoIn].stock) {
            cartList[productoIn].amount++;
            localStorage.setItem('carrito', JSON.stringify(cartList));
        } else {
            return;
        }
    } else {

        const producto = productList.find(producto => producto.id === id);

        if (producto && producto.stock > 0) {
            cartList.push({ ...producto, amount: 1 });
            localStorage.setItem('carrito', JSON.stringify(cartList));
        } else {
            console.error("No se consiguio el producto")
            alert('No hay stock')
        }
    }
    displayCartList();
}

//Función que permite eliminar un producto del carrito
function removeToCart(id) {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    let index = cartList.findIndex(producto => producto.id === id);
    if (index !== -1) {
        if (cartList[index].amount > 1) {
            cartList[index].amount--;
        } else {
            cartList.splice(index, 1);
        }

    } else {
        alert("El producto no se encontro")
    }
    localStorage.setItem('carrito', JSON.stringify(cartList));
    displayCartList();
}

//Función para eliminar todos los productos del carrito
function clearCart() {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    cartList = [];
    localStorage.setItem('carrito', JSON.stringify(cartList));
    displayCartList();
}







document.getElementById('cartPopupClose').addEventListener('click', () => {cartPopup.classList.add('hidden'); cartPopup.classList.remove('block');});
document.getElementById('btnClear').addEventListener('click', () => {clearCart()});

document.querySelectorAll('.showCart').forEach(e => {
    e.addEventListener('click', () => { cartPopupDisplay() })
})


