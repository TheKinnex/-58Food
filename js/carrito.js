
window.onload = () => {
    if (!JSON.parse(localStorage.getItem('usuario'))) {
        location.replace('./login.html')
    }

    if (JSON.parse(localStorage.getItem('usuario')).rol === 'admin') {
        document.getElementById('navOptionAdmin').classList.remove('hidden')
    }
}

cartDisplay()


function cartDisplay() {

    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartListContainer');
    container.innerHTML = ` `;

    let totalToPay = 0;

    cartList.forEach(producto => {

        const element = document.createElement('div')
        element.classList.add('productoCarrito', 'mt-4');
        totalToPay += producto.cantidad * producto.price;
        element.innerHTML = `
        <div class="flex md:grid md:grid-cols-2 gap-x-3">
            <div class=" w-2/3 md:w-full  ">
                <p class=" text-pantone mb-2 text-2xl md:text-4xl">${producto.name}</p>
                <p class="mb-2">Cantidad: ${producto.cantidad}</p>
                <p class="mb-2">Total: ${(producto.cantidad * producto.price).toFixed(2)} | ${producto.price} c/u </p>
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
                <img class=" w-44 h-44 md:w-48 md:h-48 " src="${producto.imgUrl}">
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
