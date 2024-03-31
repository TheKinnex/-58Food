

displaySales();


function displaySales() {
    const sales = JSON.parse(localStorage.getItem('pagos'));
    const containerList = document.getElementById('salesList');

    if (!sales) {
        containerList.innerHTML = `
        <h3 class="text-7xl text-red-400 font-bold"> No hay ninguna venta</h3>
        `
        return;
    }

    

    sales.forEach(sale => {
        
        const containerSale = document.createElement('div');
        containerSale.classList.add('text-xl', 'text-white',  'w-[45rem]', 'md:w-[75rem]', 'mb-12');

        const containerInfo = document.createElement('div');
        containerInfo.classList.add('flex', 'justify-between', 'gap-12');
        containerInfo.innerHTML = `
            <p>${sale.id}</p>
            <p>${sale.client.name}</p>
            <p>${sale.client.email}</p>
            <p>${sale.client.phone}</p>
        `

        const containerProducts = document.createElement('div');
        containerProducts.classList.add('mt-4', 'bg-[#1f1f1f]', 'hidden');
        containerProducts.innerHTML = `
        <h3 class=" text-pantone text-2xl font-semibold text-center pt-4">Productos</h3>
        `

        const innerProductsContainer = document.createElement('div');
        innerProductsContainer.classList.add('mt-6', 'flex', 'flex-col');

        sale.productList.forEach(p => {

            const productElement = document.createElement('div');
            productElement.classList.add('flex', 'justify-between', 'border', 'border-solid', 'border-black', 'p-4', 'px-4');
            productElement.innerHTML = ` 
            <p> Producto: ${p.name} </p>
            <p> Cantidad: ${p.amount} </p>
            <p> Total: ${p.total}$ </p>
            `

            innerProductsContainer.appendChild(productElement);
        })

        containerProducts.appendChild(innerProductsContainer);


        const btnShow = document.createElement('button');
        btnShow.textContent = 'Ver Más'
        btnShow.classList.add('w-auto');
        btnShow.addEventListener('click', () => {
            if(containerProducts.classList.contains('hidden')) {
                containerProducts.classList.remove('hidden');
                containerProducts.classList.add('block');
            } else {
                containerProducts.classList.add('hidden');
                containerProducts.classList.remove('block');
            }
        })

        containerInfo.appendChild(btnShow)

        containerSale.appendChild(containerInfo);
        containerSale.appendChild(containerProducts)

        containerList.appendChild(containerSale);
    });


}