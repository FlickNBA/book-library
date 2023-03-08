let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        let readString = read ? "read" : "not read";
        return `${title} by ${author}, ${pages} pages, ${readString}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}


// let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

// let atomicHabits = new Book("Atomic Habits", "James Clear", 320, false);

// let icePrincess = new Book("The Ice Princess", "Camilla Lackberg", 416, true);

// let thePreacher = new Book("The Preacher", "Caimlla Lackberg", 436, true);

// console.log(theHobbit.info());
// console.log(atomicHabits.info());

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
addBookToLibrary("The Ice Princess", "Camilla Lackberg", 416, true);
addBookToLibrary("The Preacher", "Caimlla Lackberg", 436, true);

console.log(myLibrary);
console.log(myLibrary[1]);
console.log(myLibrary[2].info());