const socket = io();

socket.on('products', products => {
    const productsList = document.getElementById('products-list');
    let content = `<tr><th>Nombre</th><th>Precio</th><th>foto</th></tr>`;    
    for (const product of products) {
        content += `<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" /></td>
        </tr>`;
    }
    productsList.innerHTML = content;
})


const addProduct = () => {
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image').value,
    };
    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then( () => {
        socket.emit('add-new-product', product);
    });
    return false;
}



socket.on('add-new-product-complete', product => {
    const productsList = document.getElementById('products-list');
    var row = productsList.insertRow(1);
    var name = row.insertCell(0);
    var price = row.insertCell(1);
    var image = row.insertCell(2);
    name.innerHTML = product.name;
    price.innerHTML = product.price;
    image.innerHTML = `<img src="${product.image}" />`;
})