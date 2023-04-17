function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(bookshelf);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
}
  
function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}
  
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const BookItem of data) {
      bookshelf.push(BookItem);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
  
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});