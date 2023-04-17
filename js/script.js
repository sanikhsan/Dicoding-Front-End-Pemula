const bookshelf = [];
const RENDER_EVENT = 'bookshelf';
const SAVED_EVENT = 'saved-bookshelf';
const STORAGE_KEY = 'bookshelf_APPS';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });
    if (isStorageExist()) {
      loadDataFromStorage();
    }
});

function addBook() {
    const titleBook = document.getElementById('title').value;
    const authorBook = document.getElementById('author').value;
    const releaseBook = document.getElementById('year').value;
    const isChecked = document.getElementById('read').checked;
   
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, `Judul : ${titleBook}`, `Penulis : ${authorBook}`, `Tahun rilis : ${releaseBook}`, isChecked);
    bookshelf.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted
    }
}

function addToReadBook (bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(bookId) {
  for (const bookItem of bookshelf) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function removeReadBook(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  bookshelf.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoReadBook(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in bookshelf) {
    if (bookshelf[index].id === bookId) {
      return index;
    }
  }
 
  return -1;
}

document.addEventListener('keyup', function() {
  searchBook();
});

function searchBook() {
  const searchBook = document.getElementById('searchBar').value.toUpperCase();
  const itemBook = document.getElementsByTagName("h5");

  for (let i = 0; i < itemBook.length; i++) {
    txtValue = itemBook[i].textContent || itemBook[i].innerText;
    
    if (txtValue.toUpperCase().indexOf(searchBook) > -1) {
      itemBook[i].closest(".card").style.display = '';
    } else {
      itemBook[i].closest(".card").style.display = 'none';
    }
  }
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(bookshelf);
  const unreadBookList = document.getElementById('unreadBooks');
  unreadBookList.innerHTML = '';

  const readBookList = document.getElementById('readBooks');
  readBookList.innerHTML = '';
 
  for (const BookItem of bookshelf) {
    const BooksElement = createListBooks(BookItem);
    if (!BookItem.isCompleted){
      unreadBookList.append(BooksElement);
    } else {
      readBookList.append(BooksElement)
    }
  }
});