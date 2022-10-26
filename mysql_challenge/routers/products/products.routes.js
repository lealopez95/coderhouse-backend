const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const Container = require('../../classes/Container.js');
const path = require('path');

const router = express.Router();
const productsService = new Container('products');


router.get('/', (req, res) => {
    const { maxPrice, search } = req.query;
    productsService.getAll().then( productsResponse => {
        console.log("productsResponse", productsResponse)
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
    productsService.getById(productId).then( product => {
        console.log("Product.getById", product)
        if (!product) {
            return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!`});
        }
        return res.json({ success: true, result: product });
    })
});

router.post('/', (req, res) => {
    const { name, description, price, image } = req.body;
    if ( !name || !description || !price || !image) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
        name,
        description,
        price,
        image
    };
    productsService.save(newProduct).then( () => res.redirect('/') );
});

module.exports = router;