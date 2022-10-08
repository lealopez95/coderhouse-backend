const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://localhost:8080/messages.json')
    .then( response => response.json())
    .then( messagesResponse => {
        return res.json({success: true, result: messagesResponse });
    } )
})

router.post('/', (req, res) => {
    const { email, message, timestamp } = req.body;
    if ( !email || !message || !timestamp ) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    fetch(`http://localhost:8080/messages.json`)
    .then( response => response.json())
    .then( messages => {
        const newMessage = {
            email,
            message,
            timestamp,
        };
        messages.push(newMessage);
        fs.promises.writeFile(path.resolve(__dirname, '../../public/messages.json'), JSON.stringify(messages, null, 4));
        return res.redirect('/');
    });
});

module.exports = router;