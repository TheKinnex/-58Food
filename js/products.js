import { Producto } from "./classes.js";


displayProduct(JSON.parse(localStorage.getItem('productos')));
handleCategories()



document.querySelector('#newProductCategory').addEventListener('change', () => {

    const newCategorySelect = document.querySelector('#newCategoryInput');
    newCategorySelect.style.display = 'none';

    if (document.querySelector('#newProductCategory').value == 'createNewCategoryProduct') {
        newCategorySelect.style.display = 'block';
    } else {
        newCategorySelect.style.display = 'none';
    }

});


document.getElementById('btnFind').addEventListener('click', () => { findProduct(); });
document.getElementById('btnNewProduct').addEventListener('click', () => { AddProduct(); });
document.getElementById('newProductImgFile').addEventListener('change', handleImage);

function AddProduct() {

    //products
    const productList = JSON.parse(localStorage.getItem('productos'));

    //Inputs
    const name = document.getElementById('newProductName').value;
    const description = document.getElementById('newProductDescripcion').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const stock = parseInt(document.getElementById('newProductStock').value);
    const category = document.getElementById('newProductCategory').value;

    let newCategory;

    if (category === 'createNewCategoryProduct') {
        newCategory = document.getElementById('newCategoryName').value;
    } else {
        newCategory = category;
    }

    console.log(newCategory)
    //Obtenemos la direccion de la imgPreview
    const imgUrl = document.getElementById('newProductImgPreview').src;

    //Comprobamos que no esten vacios los inputs
    if (!name || !description || !imgUrl || isNaN(price) || isNaN(stock) || !newCategory) {
        alert('Completa todos los campos');
        return;
    }

    if (productList.find( p => p.name == name)) {
        alert('Ya existe');
        return;
    }

    const newProduct = new Producto(name, description, imgUrl, price, stock, newCategory);
    productList.push(newProduct);
    alert('Producto Agregado Correctamente');
    localStorage.setItem('productos', JSON.stringify(productList));
    document.getElementById('productsList').innerHTML = ' ';
    displayProduct(JSON.parse(localStorage.getItem('productos')));

}


function findProduct() {
    const input = document.getElementById('nameProduct').value.toLowerCase();




    const productList = JSON.parse(localStorage.getItem('productos'))

    const res = productList.filter(p => {
        return p.name.toLowerCase().includes(input) || p.id.toString().includes(input) || p.description.toString().includes(input);
    })

    displayProduct(res);
}

function handleImage(event) {
    //Recupero datos
    if (event.target.getAttribute("id") === 'newProductImgFile') {
        console.log('a')
        const file = event.target.files[0]
        if (!file) return;
    
        //Api FileReader
        const reader = new FileReader();
        reader.onload = function (event) {
            //Buscamos la img con la etiqueta imgPreview para actualizarla
            const imgPreview = document.getElementById('newProductImgPreview');
            imgPreview.src = event.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        console.log('b')
        const file = event.target.files[0]
        if (!file) return;
    
        //Api FileReader
        const reader = new FileReader();
        reader.onload = function (event) {
            //Buscamos la img con la etiqueta imgPreview para actualizarla
            const imgPreview = document.getElementById('imgPreview');
            imgPreview.src = event.target.result;
        }
        
        reader.readAsDataURL(file);
    }

}

function handleCategories() {

    const productList = JSON.parse(localStorage.getItem('productos'));

    //Lista de Categorias Existentes
    const categoryList = productList.map(p => p.category);
    const newCategory = [...new Set(categoryList)];

    document.getElementById('newProductCategory').innerHTML = `
    ${newCategory.map(c => `<option value="${c}"> ${c} </option>`)}
    <option value="createNewCategoryProduct"> Agregar Categoria </option>
    `

}

function displayProduct(res) {

    //Contenedor Principal
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = ' ';

    //Lista de categorias
    const categoryList = {};

    res.forEach(p => {
        if (!categoryList[p.category]) {
            categoryList[p.category] = [];
        }
        categoryList[p.category].push(p);
    });


    for (const category in categoryList) {
        if (categoryList.hasOwnProperty(category)) {

            const productCategory = categoryList[category];

            const categoryContainer = document.createElement('div');
            categoryContainer.innerHTML = `<h2>${category}</h2>`;
            categoryContainer.style.display = "flex"

            productCategory.forEach(p => {
                const element = document.createElement('div');
                element.classList.add('productResult');
                element.innerHTML = `
                <img src="${p.imgUrl}" alt="${p.name}">
                <p> ID: ${p.id} - NAME: ${p.name} </p>
                <p> PRICE: ${p.price} </p>
                <p> Description: ${p.description}</p>
                `
                const btnEdit = document.createElement('button');
                btnEdit.classList.add('btnEditProduct');
                btnEdit.textContent = 'Editar Producto';
                btnEdit.addEventListener('click', () => { editProduct(p.id); });
                element.appendChild(btnEdit);
                categoryContainer.appendChild(element)
            });

            productsList.appendChild(categoryContainer);
        }
    }

}

let thisForm = null;
function editProduct(id) {



    if (thisForm) {
        thisForm.remove();
    }

    //Lista de Productos
    let productList = JSON.parse(localStorage.getItem('productos'));

    //Lista de Categorias Existentes
    const categoryList = productList.map(p => p.category);
    const newCategory = [...new Set(categoryList)];

    //Buscamos por ID
    const product = productList.find(p => p.id === id);


    const form = document.createElement('div');
    form.innerHTML = `
    <input id="name" type="text" value="${product.name}">
    <textarea id="description">${product.description}</textarea>
    <input id="price" type="number" value="${product.price}">
    <input id="stock" type="number" value="${product.stock}">
    <select id="category" required>
        ${newCategory.map(c => `<option value="${c}"> ${c} </option>`)}
        <option value="newCategory"> Agregar Categoria </option>
    </select>
    <div id="newCategoryInput">
        <input id="newCategory" type="text" required">
    </div>
    `

    const imgFile = document.createElement('input')
    imgFile.setAttribute('type', 'file');
    imgFile.setAttribute('id', 'imgFile');
    imgFile.addEventListener('change', (e) => { handleImage(e) });

    const imgPreview = document.createElement('img');
    imgPreview.setAttribute('id', 'imgPreview');
    imgPreview.src = product.imgUrl;

    const btnForm = document.createElement('button');
    btnForm.classList.add('btnForm');
    btnForm.textContent = 'Editar Producto';

    const btnDeleteProduct = document.createElement('button');
    btnDeleteProduct.classList.add('btnDeleteProduct');
    btnDeleteProduct.textContent = 'Eliminar Producto';

    const categorySelect = form.querySelector('#category');
    categorySelect.value = `${product.category}`
    const newCategorySelect = form.querySelector('#newCategoryInput');
    newCategorySelect.style.display = 'none';

    categorySelect.addEventListener('change', () => {
        if (categorySelect.value == 'newCategory') {
            newCategorySelect.style.display = 'block';
        } else {
            newCategorySelect.style.display = 'none';
        }
    })

    btnForm.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const categorySelect = document.getElementById('category').value;
        const imgUrl = document.getElementById('imgPreview').src;

        let newCategory;

        if (categorySelect === 'newCategory') {
            newCategory = document.getElementById('newCategory').value;
        } else {
            newCategory = categorySelect;
        }


        const index = productList.findIndex(p => p.id === id);
        if (index !== -1) {
            productList[index].name = name;
            productList[index].description = description;
            productList[index].price = price;
            productList[index].stock = stock;
            productList[index].category = newCategory;
            productList[index].imgUrl = imgUrl;
            localStorage.setItem('productos', JSON.stringify(productList));
            displayProduct(JSON.parse(localStorage.getItem('productos')));
        } else {
            alert("El producto no se encontro")
        }

        form.remove();
        thisForm = null;
    })

    btnDeleteProduct.addEventListener('click', () => {
        const Index = productList.findIndex(p => p.id === id);
        productList.splice(Index, 1);
        localStorage.setItem('productos', JSON.stringify(productList))
        displayProduct(JSON.parse(localStorage.getItem('productos')));
    })

    form.appendChild(imgFile);
    form.appendChild(imgPreview);
    form.appendChild(btnForm);
    form.appendChild(btnDeleteProduct);
    const container = document.getElementById('productsList');
    container.insertBefore(form, container.firstChild);
    thisForm = form;
}



