import { Cliente } from "./classes.js";


const btnRegister = document.getElementById('btnRegister');




//Validaciones con Regex
function validarName(name) {
    const regex = /^[a-zA-Z]+$/;
    const coincide = regex.test(name);

    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        console.log('Fallo Input Nombre', name)
        return coincide
    };
}
function validarPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*[a-z])[A-Za-z0-9\d\W]+$/;
    const coincide = regex.test(password);

    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        console.log('Fallo Input contraseña', password)
        return coincide
    };
}
function validarEmail(email) {
    const regex = /(?:[a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const coincide = regex.test(email);

    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        console.log('Fallo Input Email', email)
        return coincide
    };
}
function validarPhone(phone) {
    const regex = /^\d+$/;
    const coincide = regex.test(phone);

    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        console.log('Fallo Input numero', phone)
        return coincide
    };
}



//Registro
btnRegister.addEventListener('click', () => {

    //clientes
    let clientListSave = JSON.parse(localStorage.getItem('clientes')) || [{ name: 'admin', password: 'admin', rol: 'admin' }]
    console.log(clientListSave);

    const name = document.getElementById('nameInputR').value;
    const password = document.getElementById('passwordInputR').value;
    const email = document.getElementById('emailInputR').value;
    const phone = document.getElementById('phoneInputR').value;

    if (!validarName(name) || !validarPassword(password) || !validarEmail(email) || !validarPhone(phone)) {
        alert("Algun Input Fallo");
        return;
    }

    //Guardamos Cliente
    let cliente = new Cliente(name, password, email, phone, 'client');

    const exist = clientListSave.some(client => client.name.toLowerCase() === name.toLowerCase() || client.email === email || client.phone === phone);
    if (exist) {
        alert("Ya existe");
        return;
    } else {
        clientListSave.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientListSave));
        /*let f = new Date()
        f.setTime(f.getTime() + 60000);
        document.cookie = `usuario = ${JSON.stringify(cliente)} ; expires = ${f.toUTCString()}`; */
        localStorage.setItem('usuario', JSON.stringify(cliente));
    }
})