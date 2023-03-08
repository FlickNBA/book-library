let myLibrary = []

function Book(title, author, read, pages) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
    this.published;
    this.cover;
    this.getMore = () => {
        return getOpenLibrary(this);
    }
}

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = () => {
//         let readString = read ? "read" : "not read";
//         return `${title} by ${author}, ${pages} pages, ${readString}`;
//     }
// }

function addBookToLibrary(book) {
    myLibrary.push(book);
}

async function getOpenLibrary(book) {
    await fetch(`https://openlibrary.org/search.json?title=${book.title.replaceAll(" ", "+")}&author=${book.author.replaceAll(" ", "+")}`)
        .then((response) => response.json())
        .then((data) => {
            data = data.docs[0];
            console.log(data);
            book.title = data.title;
            book.pages = data.number_of_pages_median;
            book.author = data.author_name[0];
            book.published = data.first_publish_year;
            book.cover = `https://covers.openlibrary.org/b/isbn/${data.isbn[0]}-L.jpg`;
        })
    addBookToLibrary(book);
}

let icePrincess = new Book("The Ice Princess", "Camilla Lackberg", true).getMore();

let atomicHabits = new Book("Atomic Habits", "James Clear", false).getMore();