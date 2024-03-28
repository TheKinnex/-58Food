document.getElementById('btnPay').addEventListener('click', () => { pay() });
displayAll()

function pay() {

    let productList = JSON.parse(localStorage.getItem('productos'));
    let cartList = JSON.parse(localStorage.getItem('carrito'))

    const tdcInput = document.getElementById('tdc').value;
    const nameInput = document.getElementById('name').value;
    const cvvInput = document.getElementById('cvv').value;

    //Regex
    const tdcRegex = /^[0-9]{16}$/;
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    const cvvRegex = /^[0-9]{3}$/;

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
        productList: purchasedProducts.map(p => ({producto: p.name, cantidad: p.cantidad, total: p.price * p.cantidad}))
    };

    payList.push(pay);

    cartList.forEach(p => {
        const product = productList.find( item => item.id === p.id);
        console.log(product.stock + product.name)
        const index = productList.findIndex( item => item.id === p.id);
        if (product) {
            product.stock = product.stock - p.cantidad;
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

function displayAll() {
    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartListContainer');
    container.innerHTML = ` `;

    let totalToPay = 0;

    cartList.forEach(producto => {

        const element = document.createElement('div')
        element.classList.add('productoCarrito', 'mt-4');
        totalToPay += producto.cantidad * producto.price;
        element.innerHTML = `
        <div class="border border-gray-300  p-5 mb-4 rounded flex justify-between items-center">
            <div>
                <h3 class="text-pantone font-bold">${producto.name}</h3>
                <p class=" pt-2 pb-1 text-white w-full md:w-96">${producto.description}</p>
                <p class=" text-pantone font-semibold">Precio: <span class="text-white font-normal">$${producto.price} c/u</span></p>
                <p class=" text-pantone font-semibold">Total: <span class="text-white font-normal">$${(producto.price * producto.cantidad).toFixed(2)}</span></p>
                <p class=" text-pantone font-semibold">Cantidad: <span class="text-white font-normal">${producto.cantidad}</span></p>
            </div>
            <div>
                <img class=" w-28 h-28 object-cover" src="${producto.imgUrl}" alt="">
            </div>
        </div>
        `
        container.appendChild(element);
    })
    document.getElementById('totalToPay').textContent = `${totalToPay.toFixed(2)}$`
}

function totalPay() {
        let cartList = JSON.parse(localStorage.getItem('carrito'))
        let t = 0;
        cartList.forEach(p => {
            t += p.price * p.cantidad;
        })
        return t.toFixed(2);
}