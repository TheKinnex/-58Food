import { Cliente } from "./classes.js";


const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', () => {


    const name = document.getElementById('nameInputL').value;
    const password = document.getElementById('passwordInputL').value;


    let clientListSave = JSON.parse(localStorage.getItem('clientes')) || [{ name: 'admin' , password: 'admin', email: 'admin@gmail.com', phone: '00000000' , rol: 'admin' }];

    const cliente = clientListSave.find( client => (client.name === name || client.email === name ) && client.password === password );

    if (!cliente) {
        alert("Los datos son erroneos vuelva a intentarlo");
        return;
    } else {
        localStorage.setItem('usuario', JSON.stringify(cliente));
        alert("Ingresaste Correctamente!")
        location.replace('./index.html');
    }

    /*
    let f = new Date()
    f.setTime(f.getTime() + 60000);
    document.cookie = `usuario = ${JSON.stringify(cliente)} ; expires = ${f.toUTCString()}`;
    */
    

})


