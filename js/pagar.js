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

document.getElementById('cardNumber').addEventListener('keypress', (e) => {

    if (e.key === "Backspace" || e.key === "Delete" ) {
        return;
    }

    let longitud = e.target.value;

    if (longitud.length == 4 || longitud.length == 9 || longitud.length == 14) {
        e.target.value += ' ';
    }

    if (longitud[0] === '4') {
        document.getElementById('logoVisa').classList.add('block');
        document.getElementById('logoVisa').classList.remove('hidden');
    } else if (longitud[0] === '5') {
        document.getElementById('logoMasterCard').classList.add('block')
        document.getElementById('logoMasterCard').classList.remove('hidden');
    }   else if (longitud[0] === '3' && (longitud[1] === '4' || longitud[1] === '7') ) {
        document.getElementById('logoAmex').classList.add('block')
        document.getElementById('logoAmex').classList.remove('hidden');
    }  else {
        document.getElementById('logoVisa').classList.remove('block');
        document.getElementById('logoMasterCard').classList.remove('block')
        document.getElementById('logoAmex').classList.remove('block')
        document.getElementById('logoVisa').classList.add('hidden');
        document.getElementById('logoAmex').classList.add('hidden');
        document.getElementById('logoMasterCard').classList.add('hidden')
    }

})

document.getElementById('expiry').addEventListener('keypress', (e) => {

    if (e.code === "Backspace") {
        return;
    }

    let longitud = e.target.value;

    if (longitud.length == 2) {
        e.target.value += '/';
    }

})

/* ============================================
    LLAMADOS INICIADORES
===========================================
*/


//Esperar llamado del btn para pagar
document.getElementById('btnPay').addEventListener('click', () => { pay() });

//Llamamos para mostrar todos los productos del carrito
displayAll();


/* ============================================
    FUNCIONES DEL FORMULARIO
===========================================
*/

//Funcion que comprueba los inputs, envia y guarda los datos de la compra o venta
function pay() {

    let productList = JSON.parse(localStorage.getItem('productos'));
    let cartList = JSON.parse(localStorage.getItem('carrito'))

    const tdcInput = document.getElementById('cardNumber').value.replace(/ /g, "");
    const expiryInput = document.getElementById('expiry').value.replace("/", "");
    const nameInput = document.getElementById('holderName').value;
    const cvvInput = document.getElementById('cvv').value

    //Regex
    const tdcRegex = /^[0-9]{16}$/;
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    const cvvRegex = /^[0-9]{3}$/;
    const expiryRegex = /^[0-9]{4}$/;

    if (!expiryRegex.test(expiryInput)) {
        alert("Ingrese una fecha de vencimiento valida (solo numeros)")
        return;
    }

    if (!tdcRegex.test(tdcInput)) {
        alert("Ingrese un numero de tarjeta de credito valido (16 digitos)")
        return;
    }
    if (!nameRegex.test(nameInput)) {
        alert("Ingrese un nombre valido (solo letras y espacios)")
        return;
    }
    if (!cvvRegex.test(cvvInput)) {
        alert("Ingrese un CVV valido (3 digitos)")
        return;
    }


    const purchasedProducts = [...cartList];
    let payList = JSON.parse(localStorage.getItem('pagos')) || [];


    const pay = {
        id: '_' + Math.random().toString(30).substring(2),
        client: JSON.parse(localStorage.getItem('usuario')),
        total: totalPay(),
        productList: purchasedProducts.map(p => ({name: p.name, amount: p.amount, total: p.price * p.amount}))
    };

    payList.push(pay);

    cartList.forEach(p => {
        const product = productList.find( item => item.id === p.id);
        console.log(product.stock + product.name)
        const index = productList.findIndex( item => item.id === p.id);
        if (product) {
            product.stock = product.stock - p.amount;
            productList[index].stock = product.stock;
            localStorage.setItem('productos', JSON.stringify(productList));
        }
    })


    alert("Pago Existoso");
    localStorage.setItem('pagos', JSON.stringify(payList));
    const cartVoid = []
    localStorage.setItem('carrito', JSON.stringify(cartVoid));

    location.replace('./index.html')
}

//Funcion que calcula el total a pagar
function totalPay() {
    let cartList = JSON.parse(localStorage.getItem('carrito'))
    let t = 0;
    cartList.forEach(p => {
        t += p.price * p.amount;
    })
    return t.toFixed(2);
}

//Funcion que muestra todo los productos
function displayAll() {
    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartListContainer');
    container.innerHTML = ` `;

    let totalToPay = 0;

    if (cartList.length == 0) {
        container.innerHTML = `<h3 class="text-7xl text-red-400 font-bold"> No hay nada en el carrito</h3>`
        return;
    }

    cartList.forEach(producto => {

        const element = document.createElement('div')
        element.classList.add('productoCarrito', 'mt-4');
        totalToPay += producto.amount * producto.price;
        element.innerHTML = `
        <div class="border border-gray-300 gap-x-3 p-5 mb-4 rounded flex justify-between items-center">
            <div>
                <h3 class="text-pantone font-bold">${producto.name}</h3>
                <p class="hidden md:block pt-2 pb-1 text-white w-full md:w-96">${producto.description}</p>
                <p class=" text-pantone font-semibold">Precio: <span class="text-white font-normal">$${producto.price} c/u</span></p>
                <p class=" text-pantone font-semibold">Total: <span class="text-white font-normal">$${(producto.price * producto.amount).toFixed(2)}</span></p>
                <p class=" text-pantone font-semibold">Cantidad: <span class="text-white font-normal">${producto.amount}</span></p>
            </div>
            <div>
                <img class=" w-32 h-32 object-cover" src="${producto.imgUrl}" alt="">
            </div>
        </div>
        `
        container.appendChild(element);
    })
    document.getElementById('totalToPay').textContent = `${totalToPay.toFixed(2)}$`
}

