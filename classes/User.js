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

module.exports = User;