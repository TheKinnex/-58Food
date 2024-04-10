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

//Mostrar la lista de productos del carrito
cartDisplay()

//Estar pendiente al llamado del btn para limpiar el carrito
document.getElementById('btnClearCart').addEventListener('click', () => {clearCart()})

//Revisamos que hay productos en el carrito para ir a pagar
document.getElementById('btnPay').addEventListener('click', () => {
    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    if (cartList.length == 0) {
        alert("No hay productos que pagar");
        return;
    } else {
        location.replace('./pago.html')
    }
})

/* ============================================
    LLAMADOS PARA MOSTRAR
    ===========================================
*/

// Función para mostrar visualmente los productos del carrito
function cartDisplay() {

    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartListContainer');
    container.innerHTML = ` `;

    let totalToPay = 0;

    cartList.forEach(producto => {

        const element = document.createElement('div')
        element.classList.add('productoCarrito', 'mt-4');
        totalToPay += producto.amount * producto.price;
        element.innerHTML = `
        <div class="flex md:grid md:grid-cols-2 gap-x-3">
            <div class=" w-2/3 md:w-full  ">
                <p class=" text-pantone mb-2 text-2xl md:text-4xl">${producto.name}</p>
                <p class="mb-2">Cantidad: ${producto.amount}</p>
                <p class="mb-2">Total: ${(producto.amount * producto.price).toFixed(2)} | ${producto.price} c/u </p>
                <p class="mb-2">${producto.description}</p>
                <button class="btnAñadir">
                    <lord-icon src="https://cdn.lordicon.com/zrkkrrpl.json" trigger="hover"
                        style="width:50px;height:50px" colors="primary:#0000,secondary:#ffc700">
                    </lord-icon>
                </button>
                <button class="btnEliminar">
                    <lord-icon src="https://cdn.lordicon.com/dykoqszm.json" trigger="hover"
                        style="width:50px;height:50px" colors="primary:#0000,secondary:#ffc700">
                    </lord-icon>
                </button>
            </div>
            <div class=" flex justify-center items-center">
                <img class=" object-cover w-44 h-44 md:w-48 md:h-48 " src="${producto.imgUrl}">
            </div>
        </div>
        
        `
        const btnEliminar = element.querySelector('.btnEliminar');
        btnEliminar.addEventListener('click', () => {
            removeToCart(producto.id);
        })
        const btnAdd = element.querySelector('.btnAñadir');
        btnAdd.addEventListener('click', () => {
            addToCart(producto.id);
        })

        container.appendChild(element);
    })
    document.getElementById('totalToPay').textContent = `${totalToPay.toFixed(2)}$`
}

/* ============================================
    FUNCIONES DEL CARRITO
    ===========================================
*/

//Funcion para remover productos
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
    cartDisplay();
}

//Funcion para añadir productos
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
            cartList.push({ ...producto, cantidad: 1 });
            localStorage.setItem('carrito', JSON.stringify(cartList));
        } else {
            console.error("No se consiguio el producto")
        }
    }
    cartDisplay();
}

//Funcion para limpiar el carrito
function clearCart() {
    let cartList = JSON.parse(localStorage.getItem('carrito')) || [];
    cartList = [];
    localStorage.setItem('carrito', JSON.stringify(cartList));
    cartDisplay();
}