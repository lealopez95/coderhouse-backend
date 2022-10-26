const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const apiRoutes = require('./routers/app.routers')
const Container = require('./classes/Container.js');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productsService = new Container('products');
const messagesService = new Container('messages');

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
    productsService.getAll().then( products => {
        console.log("products", products)
        res.render('products', { products });
    });
});

app.get('*', (request, response) => { // cae aca si no poasa ninguna regla de arriba
    response.send('<h1>NOT FOUND</h1>')
});


const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto http://localhost:${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});

io.on('connection', (socket) => {
    productsService.getAll().then( products => {
        console.log("products", products)
        socket.emit('products', products);
    });

    messagesService.getAll().then( messages => {
        console.log("messages", messages)
        socket.emit('messages', messages);
    });

    socket.on('add-new-product', product => {
        io.sockets.emit("add-new-product-complete", product)
    });

    socket.on('add-new-message', message => {
        io.sockets.emit("add-new-message-complete", message)
    });

    
});



