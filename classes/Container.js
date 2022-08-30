const fs = require('fs');

class Container {
    fileName;

    constructor(fileName) {
        this.fileName = `../data/${fileName}.txt`;
    }

    async getAll() {
        let content;
        try {
            content = await fs.promises.readFile(this.fileName, 'utf-8');
        } catch ( err ) {
            await fs.promises.writeFile(this.fileName, '[]');
            content = '[]';
        }
        return JSON.parse(content);
    }

    async save(product) {
        const products = await this.getAll();
        const lastProductIndex = products.length-1;
        const nextId = products[lastProductIndex] ? (products[lastProductIndex].id + 1) : 1;
        const productToAdd = {
            ...product,
            id: nextId,
        }
        products.push(productToAdd);
        await fs.promises.writeFile(this.fileName, JSON.stringify(products));
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find( product => product.id == id);
    }

    

    async deleteById(id) {
        const products = await this.getAll();
        const prodIndex = products.findIndex(product => product.id == id);
        if(prodIndex !== -1) {
            products.splice(prodIndex, 1);
            fs.promises.writeFile(this.fileName, JSON.stringify(products));
        }
    }

    async deleteAll() {
        await fs.promises.unlink(this.fileName);
    }
}

module.exports = Container;