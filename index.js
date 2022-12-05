import { Book } from './modules/book.js';
import { Library } from './modules/library.js';

const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const booksContainer = document.querySelector('#book-list');

const myLibrary = new Library();
myLibrary.loadLocalData();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (title.length === 0 || author.length === 0) return;
  const book = new Book({ title: title, author: author });
  myLibrary.addNewBook(book);
  updateBookDisplay(myLibrary.bookList);
  form.reset();
});

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
