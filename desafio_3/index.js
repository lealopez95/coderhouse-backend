const Container = require('../classes/Container');
const { randomIntFromInterval } = require('../helpers/utils');

const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const container = new Container('products');

app.get('/', (request, response) => {
    response.send('Pagina de inicio')
});

app.get('/productos', async (request, response) => {
    response.send(await container.getAll());
});

app.get('/productosRandom', async (request, response) => {
    const randomId = randomIntFromInterval(1, 3);
    response.send(await container.getById(randomId));
});


app.get('*', (request, response) => { // cae aca si no poasa ninguna regla de arriba
    response.send('<h1>NOT FOUND</h1>')
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});

connectedServer.on('error', error => {
    console.log(error);
});