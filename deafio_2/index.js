const fs = require('fs');

class Container {
    fileName;
    products = [];

    constructor(fileName) {
        this.fileName = `./${fileName}.txt`;
        try {
            const content = fs.readFileSync(this.fileName);
            this.products = JSON.parse(content);
        } catch( err ) {
            console.log("Error on construct", err)
            this.products = [];
        }
    }

    save(product) {
        const lastProductIndex = this.products.length-1;
        const nextId = this.products[lastProductIndex] ? (this.products[lastProductIndex].id + 1) : 1;
        const productToAdd = {
            ...product,
            id: nextId,
        }
        this.products.push(productToAdd);
        fs.writeFileSync(this.fileName, JSON.stringify(this.products))
    }

    getById(id) {
        return this.products.find( product => product.id == id);
    }

    getAll() {
        return this.products;
    }

    deleteById(id) {
        const prodIndex = this.products.findIndex(product => product.id == id);
        if(prodIndex !== -1) {
            this.products.splice(prodIndex, 1);
            fs.writeFileSync(this.fileName, JSON.stringify(this.products));
        }
    }

    deleteAll() {
        fs.unlinkSync(this.fileName);
        this.products = [];
    }
}

const container = new Container('products');

const products = [
    {
        title: 'Nintendo Switch',
        price: 200,
        thumbnail: 'https://www.atajo.com.ar/images/00000HAD-S-KABAA65619HAD-S-KABAA-Consola-Nintendo-Switch-Neon-01.jpg',
    },
    {
        title: 'Attack on titan computer case',
        price: 80,
        thumbnail: 'https://ae01.alicdn.com/kf/H198a206a928b4c6d845f62dcf81ff377W/Pegatinas-de-Anime-de-Attack-on-Titan-para-funda-de-PC-calcoman-a-de-decoraci-n.jpg',
    },
    {
        title: 'Meta Quest 2',
        price: 600,
        thumbnail: 'https://m.media-amazon.com/images/I/61tE7IcuLmL._SL1500_.jpg',
    },
];
for (const product of products) {
    container.save(product);
}

console.log("all products", container.getAll());

console.log("getById 1", container.getById(1));

console.log("deleteById 2",container.deleteById(2));

console.log("all products", container.getAll());

console.log("product does not exist", container.getById(2));

console.log("delete all", container.deleteAll());

console.log("all products after delete", container.getAll());

