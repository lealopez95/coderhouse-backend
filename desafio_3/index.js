const http = require('http');

//create server
const server = http.createServer((request, response) => {
    response.write('hola mundo');
    response.end();
});

//listen
server.listen(8080);