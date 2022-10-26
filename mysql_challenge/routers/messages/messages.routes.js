const express = require('express');
const Container = require('../../classes/Container.js');

const router = express.Router();
const messagesService = new Container('messages');

router.get('/', (req, res) => {
    messagesService.getAll()
    .then( messagesResponse => {
        return res.json({success: true, result: messagesResponse });
    } )
})

router.post('/', (req, res) => {
    const { email, message, timestamp } = req.body;
    if ( !email || !message || !timestamp ) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newMessage = {
        email,
        message,
        timestamp,
    };
    messagesService.save(newMessage).then( () => res.redirect('/'));
});

module.exports = router;