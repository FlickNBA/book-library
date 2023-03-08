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

function removeBook(book) {
    // let bookToRemove = myLibrary.find(book => book.title == book.title);
    // console.log(bookToRemove);

    let bookToRemove = (libraryBook) => libraryBook.title == book.title;

    let bookIndex = myLibrary.findIndex(bookToRemove);

    let bookDiv = document.querySelector(`[data-book="${book.title}, ${book.read}"]`);
    
    bookDiv.remove();

    myLibrary.splice(bookIndex, 1);

    // delete myLibrary[bookIndex];

    // myLibrary.filter(x => x);

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

const mainContainer = document.querySelector("main");

function addBookToLibrary(book) {
    myLibrary.push(book);
    let newBook = document.createElement("div");
    let newBookBg = document.createElement("bg");
    newBook.setAttribute("data-book", `${book.title}, ${book.read}`);
    newBook.classList.add("book");
    newBookBg.classList.add("bg");
    newBookBg.style["background-image"] = `url(${book.cover})`;
    newBook.appendChild(newBookBg);

    let removeButton = document.createElement("button");

    removeButton.classList.add("removeBook");

    removeButton.textContent = "Remove book";

    removeButton.addEventListener("click", () => {
        removeBook(book);
    })

    newBook.appendChild(removeButton);

    let H1 = document.createElement("h1");
    H1.textContent = book.title;

    newBook.appendChild(H1);

    let H2 = document.createElement("h2");
    H2.textContent = `by ${book.author} in ${book.published}`;

    newBook.appendChild(H2);

    let H3 = document.createElement("h3");

    let readPages;
    let readText;
    let notReadText = "";
    let readPercentage;

    let read = document.createElement("div");
    read.classList.add("read");

    let notRead = document.createElement("div");
    notRead.classList.add("notRead");

    if (book.read === true) {
        readPages = book.pages;
        readText = "100% read";
        readPercentage = 100;
        read.style["border-bottom-right-radius"] = "0.5rem";
    } else if (book.read === false) {
        readPages = 0;
        readText = "";
        notReadText = "not read";
        notRead.style["border-bottom-left-radius"] = "0.5rem";
        readPercentage = 0;
    } else {
        if (book.read > book.pages) {
            readPages = book.pages;
            readText = "100% read";
            readPercentage = 100;
            read.style["border-bottom-right-radius"] = "0.5rem";
        } else {
            readPages = book.read;
            readPercentage = Math.round((book.read / book.pages) * 100);
            readText = readPercentage > 25 ? `${readPercentage}% read` : `${readPercentage}%`;
        }
    }

    read.textContent = readText;

    H3.textContent = `read ${readPages} of ${book.pages} pages`;

    newBook.appendChild(H3);

    console.log(readPercentage);

    read.style["width"] = `${readPercentage}%`;

    notRead.style["width"] = `${100 - readPercentage}%`;

    notRead.textContent = notReadText;

    newBook.appendChild(read);

    newBook.appendChild(notRead);

    mainContainer.appendChild(newBook);
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

let addBookButton = document.querySelector("#addBook");

addBookButton.addEventListener("click", () => {
    let bookTitle = prompt("What's the book title?");
    let bookAuthor = prompt("Who wrote the book?");
    let bookRead = prompt("Did you read the book? (Type yes, no, or how much pages did you read");
    bookRead = bookRead == "yes" ? true :
        bookRead == "no" ? false : Number(bookRead);
    
    new Book(bookTitle, bookAuthor, bookRead).getMore();
});