const Container = require('../classes/Container');

const executeTests = async () => {
    const container = new Container('products_example');

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
        await container.save(product);
    }

    console.log("all products", await container.getAll());
    console.log("getById 1", await container.getById(1));
    console.log("deleteById 2", await container.deleteById(2));
    console.log("all products", await container.getAll());
    console.log("product does not exist", await container.getById(2));
    console.log("delete all", await container.deleteAll());
    console.log("all products", await container.getAll());
}

executeTests();





