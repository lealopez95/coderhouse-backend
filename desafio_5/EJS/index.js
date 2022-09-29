const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/app.routers')
const { products } = require('./data/data');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/products', (req, res) => {
    let productsResponse = [...products];
    res.render('pages/products', { products: productsResponse });
});

app.get('*', (request, response) => { // cae aca si no poasa ninguna regla de arriba
    response.send('<h1>NOT FOUND</h1>')
});


const PORT = process.env.PORT || 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto http://localhost:${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});