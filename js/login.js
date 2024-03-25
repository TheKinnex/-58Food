import { Cliente } from "./classes.js";


const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', () => {


    const name = document.getElementById('nameInputL').value;
    const password = document.getElementById('passwordInputL').value;


    let clientListSave = JSON.parse(localStorage.getItem('clientes')) || [{ name: 'admin', password: 'admin', rol: 'admin' }]

    const cliente = clientListSave.find( client => (client.name.toLowerCase() === name.toLowerCase() || client.email === name ) && client.password === password );

    /*
    let f = new Date()
    f.setTime(f.getTime() + 60000);
    document.cookie = `usuario = ${JSON.stringify(cliente)} ; expires = ${f.toUTCString()}`;
    */
    localStorage.setItem('usuario', JSON.stringify(cliente));

})


