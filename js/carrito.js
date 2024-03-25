cartDisplay()

document.getElementById('btnClearCart').addEventListener('click', clearCart)

function cartDisplay() {
    const cartList = JSON.parse(localStorage.getItem('carrito')) || []
    const container = document.getElementById('cartListContainer');
    container.innerHTML = ' ';

    let totalToPay = 0;

    cartList.forEach(producto => {
        const element = document.createElement('div')
        element.classList.add('productoCarrito');
        element.style.display = 'flex'
        element.style.gap = '20px'
        const totalProduct = producto.price * producto.cantidad;
        totalToPay += totalProduct;

        element.innerHTML = `
        <img src="${producto.imgUrl}">
        <p> Nombre : ${producto.name}</p> 
        <p> Cantidad : ${producto.cantidad}</p> 
        <p> Precio Unitario : ${producto.price}</p> 
        <p> Total : ${totalProduct}</p> 
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
    document.getElementById('totalToPay').textContent = `${totalToPay}$`
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
