//import { customAlphabet } from 'nanoid'
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

//Clase Cliente
export class Cliente {

    constructor(name, password, email, phone, rol) {
        this.name = name
        this.password = password
        this.email = email
        this.phone = phone
        this.rol = rol

    }

}



export class Producto {

    constructor(name, description, imgUrl, price, stock, category) {
        this.id = nanoid(6).toLowerCase(); //Math.floor(Math.random()*(9000+1))+1000;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

}