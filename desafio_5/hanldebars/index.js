const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

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

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
    res.render('main');
});

const PORT = process.env.PORT || 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto http://localhost:${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});