const User = require('../classes/User.js');

const notepad = {
    name: 'Death Note',
    author: 'Shinigami',
}

const pets = [ 'Ryuk' ];

const user = new User('Light', 'Yagami', [notepad], pets);

user.addBook('Fake Death Note', 'Shinigami');

user.addPet('Misa');

console.log(user.getFullName());
console.log(user.getBookNames());
console.log(user.countPets());