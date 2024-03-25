document.getElementById('btnPay').addEventListener('click', () => { pay() });

function pay() {

    let productList = JSON.parse(localStorage.getItem('productos'));
    let cartList = JSON.parse(localStorage.getItem('carrito'))

    const tdcInput = document.getElementById('tdc').value;
    const nameInput = document.getElementById('name').value;
    const cvvInput = document.getElementById('cvv').value;

    //Regex
    const tdcRegex = /^[0-9]{2}$/;
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
}

function totalPay() {
    let cartList = JSON.parse(localStorage.getItem('carrito'))
    let t = 0;
    cartList.forEach(p => {
        t += p.price * p.cantidad;
    })
    return t;
}