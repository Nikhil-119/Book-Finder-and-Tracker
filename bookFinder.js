let books = JSON.parse(localStorage.getItem('books')) || [
    {
        isbn: '9780134093413',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        authors: ['Robert C. Martin'],
        publisher: 'Prentice Hall',
        pages: 464
    },
    {
        isbn: '9781449373320',
        title: 'JavaScript: The Good Parts',
        authors: ['Douglas Crockford'],
        publisher: "O'Reilly Media",
        pages: 176
    },
    {
        isbn: '9780596805524',
        title: 'Eloquent JavaScript: A Modern Introduction to Programming',
        authors: ['Marijn Haverbeke'],
        publisher: 'No Starch Press',
        pages: 472
    }
];

function searchBook() {
    const title = document.getElementById('titleInput').value.trim().toLowerCase();
    if (title === '') {
        alert('Please enter a book title.');
        return;
    }

    const book = books.find(b => b.title.toLowerCase().includes(title));
    if (!book) {
        alert('Book not found!');
        return;
    }

    displayBookInfo(book);
}

function displayBookInfo(book) {
    const bookInfoDiv = document.getElementById('bookInfo');
    bookInfoDiv.innerHTML = `
        <h2>${book.title}</h2>
        <p>Authors: ${book.authors.join(', ')}</p>
        <p>Publisher: ${book.publisher}</p>
        <p>Pages: ${book.pages}</p>
    `;
}

function addBook() {
    const isbn = document.getElementById('isbn').value.trim();
    const title = document.getElementById('title').value.trim();
    const authors = document.getElementById('authors').value.trim().split(',');
    const publisher = document.getElementById('publisher').value.trim();
    const pages = parseInt(document.getElementById('pages').value.trim());

    if (isbn === '' || title === '' || authors.length === 0 || publisher === '' || isNaN(pages)) {
        alert('Please fill in all fields.');
        return;
    }

    const newBook = {
        isbn,
        title,
        authors,
        publisher,
        pages
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    alert('Book added successfully!');
    clearForm();
}

function clearForm() {
    document.getElementById('isbn').value = '';
    document.getElementById('title').value = '';
    document.getElementById('authors').value = '';
    document.getElementById('publisher').value = '';
    document.getElementById('pages').value = '';
}

function displayBooks() {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = '';

    storedBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>ISBN: ${book.isbn}</p>
            <button onclick="viewBookDetails('${book.isbn}')">View Details</button>
        `;
        bookListDiv.appendChild(bookItem);
    });
}

function viewBookDetails(isbn) {
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
        alert('Book not found!');
        return;
    }

    localStorage.setItem('bookDetails', JSON.stringify(book));
    window.location.href = 'book-details.html';
}

function loadBookDetails() {
    const book = JSON.parse(localStorage.getItem('bookDetails'));
    if (!book) {
        alert('No book details available.');
        return;
    }

    displayBookInfo(book);
}

function login() {
    const userId = document.getElementById('userId').value.trim();
    const password = document.getElementById('password').value.trim();

    if (userId === '' || password === '') {
        alert('Please enter both user ID and password.');
        return;
    }

    // For simplicity, we assume a static user ID and password.
    if (userId === 'user' && password === 'password') {
        localStorage.setItem('loggedInUser', userId);
        alert('Login successful!');
        window.location.href = 'search.html';
    } else {
        alert('Invalid user ID or password.');
    }
}

function checkAuth() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('navbarUser').innerText = `Logged in as: ${loggedInUser}`;
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
