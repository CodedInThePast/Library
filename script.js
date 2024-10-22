const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Toggle the read status on the book object
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add book to library array
function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
}

// Remove book from library array
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

// Display library books in the DOM
function displayLibrary() {
    const library = document.getElementById('library');
    library.innerHTML = ''; // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button class="styled-button" onclick="removeBookFromLibrary(${index})">Remove</button>
            <button class="styled-button" onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        `;

        library.appendChild(bookCard);
    });
}

// Toggle read status of a book and update display
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayLibrary();
}

// Event listeners for adding new book
document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('bookDialog').showModal();
});

document.getElementById('newBookForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    document.getElementById('bookDialog').close(); // Close the dialog
    e.target.reset(); // Reset the form
});
