const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const apiRoutes = require('./routers/app.routers')
const { products } = require('./data/data');

const app = express();
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.resolve(__dirname, './views/layouts/'),
        partialsDir: path.resolve(__dirname, './views/partials/'),
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/products', (req, res) => {
    let productsResponse = [...products];
    res.render('products', { products: productsResponse });
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