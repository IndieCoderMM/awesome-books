import { Book } from './modules/book.js';
import { Library } from './modules/library.js';
import { DateTime } from './modules/luxon.js';

const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const booksContainer = document.querySelector('#book-list');
const clockElement = document.querySelector('#clock');
const navLinks = document.querySelectorAll('.nav-link');
const librarySection = document.querySelector('#library-section');
const formSection = document.querySelector('#book-form-section');
const contactSection = document.querySelector('#contact-section');

const updateBookDisplay = (bookList) => {
  booksContainer.textContent = '';
  bookList.forEach((book) => {
    const bookItem = createBookItem(book);
    booksContainer.appendChild(bookItem);
  });
};

const createBookItem = (book) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  li.classList.add('book-item');
  btn.classList.add('remove-btn');
  btn.setAttribute('type', 'button');
  btn.setAttribute('id', book.id);
  btn.addEventListener('click', (e) => {
    myLibrary.removeBook(e.target.id);
    updateBookDisplay(myLibrary.bookList);
  });
  btn.textContent = 'Remove';
  p.innerHTML = `<strong>${book.title}</strong> by <em>${book.author}</em>`;
  li.appendChild(p);
  li.appendChild(btn);
  return li;
};

// Init library data & show in page
const myLibrary = new Library();
myLibrary.loadLocalData();
updateBookDisplay(myLibrary.bookList);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  // Skip empty input value
  if (title.length === 0 || author.length === 0) return;
  const book = new Book({ title: title, author: author });
  myLibrary.addNewBook(book);
  updateBookDisplay(myLibrary.bookList);
  form.reset();
});

navLinks.forEach((link) =>
  link.addEventListener('click', (e) => {
    e.preventDefault();
    librarySection.classList.add('hide');
    formSection.classList.add('hide');
    contactSection.classList.add('hide');
    switch (e.target.id) {
      case 'library-link':
        librarySection.classList.remove('hide');
        break;
      case 'form-link':
        formSection.classList.remove('hide');
        break;
      case 'contact-link':
        contactSection.classList.remove('hide');
        break;
    }
  })
);

setInterval(() => {
  const now = DateTime.now();
  clockElement.textContent = now
    .setLocale('en-US')
    .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
}, 1000);
