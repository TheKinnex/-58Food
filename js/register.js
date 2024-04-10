import { Cliente } from "./classes.js";


const btnRegister = document.getElementById('btnRegister');




//Validaciones con Regex
function validarName(name) {
    const regex = /^[a-zA-Z]+$/;
    const coincide = regex.test(name);
    document.getElementById('nameInputR').classList.remove('shadow-red-500');
    document.getElementById('errorTextName').classList.add('hidden');
    if (coincide) {
        return coincide
    } else {
        document.getElementById('nameInputR').classList.add('shadow-red-500');
        document.getElementById('errorTextName').classList.remove('hidden');
        return coincide
    };
}
function validarPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*[a-z])[A-Za-z0-9\d\W]+$/;
    const coincide = regex.test(password);
    document.getElementById('passwordInputR').classList.remove('shadow-red-500');
    document.getElementById('errorTextPassword').classList.add('hidden');
    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        document.getElementById('errorTextPassword').classList.remove('hidden');
        document.getElementById('passwordInputR').classList.add('shadow-red-500');
        return coincide
    };
}
function validarEmail(email) {
    const regex = /(?:[a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const coincide = regex.test(email);
    document.getElementById('emailInputR').classList.remove('shadow-red-500');
    document.getElementById('errorTextEmail').classList.add('hidden');
    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        document.getElementById('errorTextEmail').classList.remove('hidden');
        document.getElementById('emailInputR').classList.add('shadow-red-500');
        return coincide
    };
}
function validarPhone(phone) {
    const regex = /^[0-9]{11}$/;
    const coincide = regex.test(phone);
    document.getElementById('phoneInputR').classList.remove('shadow-red-500');
    document.getElementById('errorTextPhone').classList.add('hidden');
    if (coincide) {
        return coincide
    } else {
        // Añadir Texto abajo
        document.getElementById('errorTextPhone').classList.remove('hidden');
        document.getElementById('phoneInputR').classList.add('shadow-red-500');
        return coincide
    };
}



//Registro
btnRegister.addEventListener('click', () => {

    //clientes
    let clientListSave = JSON.parse(localStorage.getItem('clientes')) || [{ name: 'admin' , password: 'admin', email: 'admin@gmail.com', phone: '00000000' , rol: 'admin' }]
    console.log(clientListSave);

    const name = document.getElementById('nameInputR').value;
    const password = document.getElementById('passwordInputR').value;
    const email = document.getElementById('emailInputR').value;
    const phone = document.getElementById('phoneInputR').value;

    if (!validarName(name) || !validarPassword(password) || !validarEmail(email) || !validarPhone(phone)) {
        return;
    }

    //Guardamos Cliente
    let cliente = new Cliente(name, password, email, phone, 'client');

    const exist = clientListSave.some(client => client.email === email || client.phone === phone);
    if (exist) {
        alert("El correo o el telefono esta vinculada a otra cuenta.");
        return;
    } else {
        clientListSave.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientListSave));
        alert("Se creo el usuario perfectamente.");
        /*let f = new Date()
        f.setTime(f.getTime() + 60000);
        document.cookie = `usuario = ${JSON.stringify(cliente)} ; expires = ${f.toUTCString()}`; */
        location.replace('./login.html');
    }
})