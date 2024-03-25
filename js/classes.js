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
        this.id = Math.random().toString(30).substring(2);
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

}