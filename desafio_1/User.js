class User {
    firstname;
    lastname;
    books;
    pets;

    constructor(firstname, lastname, books = [], pets = []) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }

    addPet( name ) {
        this.pets.push(name);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(name, author) {
        this.books.push({
            name,
            author,
        });
    }

    getBookNames() {
        return this.books.map( book => book.name);
    }
}

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