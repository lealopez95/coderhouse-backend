const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const { maxPrice, search } = req.query;
    fetch(`http://localhost:8080/products.json`)
    .then( response => response.json())
    .then( productsResponse => {
        if (Object.keys(req.query).length > 0) {
            if (maxPrice) {
            if (isNaN(+maxPrice)) {
                return res.status(400).json({success: false, error: 'maxPrice must be a valid number'});
            }
            productsResponse = productsResponse.filter(product => product.price <= +maxPrice);
            }
            if (search) {
            productsResponse = productsResponse.filter(product => product.name.toLowerCase().startsWith(search.toLowerCase()))
            }
            return res.json({success: true, result: productsResponse });
        }
        return res.json({success: true, result: productsResponse });
    });
});
  
router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    fetch(`http://localhost:8080/products.json`)
    .then( response => response.json())
    .then( productsResponse => {
        const product = productsResponse.find(product => product.id === +productId);
        if (!product) {
            return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!`});
        }
        return res.json({ success: true, result: product });
        
    });
});

router.post('/', (req, res) => {
    const { name, description, price, image } = req.body;
    if ( !name || !description || !price || !image) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    fetch(`http://localhost:8080/products.json`)
    .then( response => response.json())
    .then( products => {
        const newProduct = {
            id: products.length + 1,
            name,
            description,
            price,
            image
        };
        products.push(newProduct);
        fs.promises.writeFile(path.resolve(__dirname, '../../public/products.json'), JSON.stringify(products, null, 4));
        return res.redirect('/');
    });
});

module.exports = router;