const LOCAL_KEY = 'library-data';

export default class Library {
  constructor() {
    this.bookList = [];
  }

  addNewBook(book) {
    this.bookList.push(book);
    this.updateStorage();
  }

  removeBook(bookId) {
    this.bookList = this.bookList.filter(
      (book) => book.id !== parseInt(bookId, 10),
    );
    this.updateStorage();
  }

  loadLocalData() {
    const localData = localStorage.getItem(LOCAL_KEY);
    if (localData !== null) {
      this.bookList = JSON.parse(localData);
    }
  }

  updateStorage() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.bookList));
  }
}
