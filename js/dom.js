
function createListBooks(bookObject) {

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'text-center');
    cardHeader.innerText = 'Detail Buku';

    const bookTitle = document.createElement('h5');
    bookTitle.classList.add('card-title');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('p-0','m-0');
    bookAuthor.innerText = bookObject.author;

    const releaseBook = document.createElement('p');
    releaseBook.classList.add('p-0','m-0');
    releaseBook.innerText = bookObject.year;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.append(bookTitle, bookAuthor, releaseBook);

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer','text-center');

    const completeCard = document.createElement('div');
    completeCard.classList.add('card', 'mt-2', 'mb-3');
    completeCard.append(cardHeader, cardBody, cardFooter);
    completeCard.setAttribute('id', `bookId-${bookObject.id}`);

    const modalchild = document.createElement('div');
    modalchild.classList.add('modal','fade');
    modalchild.setAttribute('id', `Id-${bookObject.id}`);
    modalchild.setAttribute('tabindex','-1');
    modalchild.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Data Buku</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center">
                <svg xmlns="http://www.w3.org/2000/svg" color="red" width="96" height="96" fill="currentColor" class="bi bi-exclamation-circle mb-3" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <br>
                Peringatan! Anda yakin ingin menghapus data buku ini?
              </div>
              <div class="modal-footer" id="footer-${bookObject.id}">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              </div>
            </div>
        </div>`;

    const modal = document.getElementById('modalHapusBuku');
    modal.append(modalchild);

    if (bookObject.isCompleted) {
      const trashButton = document.createElement('button');
      trashButton.classList.add('btn', 'btn-danger', 'float-end', 'me-2');
      trashButton.innerHTML = `<i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#Id-${bookObject.id}"></i>`;

      const delButton = document.createElement('button');
      delButton.setAttribute('type', 'button');
      delButton.classList.add('btn', 'btn-danger');
      delButton.innerText = 'Hapus Data';
      delButton.addEventListener('click', function () {
        removeReadBook(bookObject.id);
        location.reload();
      });

      const modalFooter = document.getElementById(`footer-${bookObject.id}`);
      modalFooter.append(delButton);

      const undoButton = document.createElement('button');
      undoButton.classList.add('btn', 'btn-primary', 'float-end');
      undoButton.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';

      undoButton.addEventListener('click', function () {
        undoReadBook(bookObject.id);
        location.reload();
      });

      cardFooter.append(undoButton, trashButton);

    } else {

      const trashButton = document.createElement('button');
      trashButton.classList.add('btn', 'btn-danger', 'float-end', 'me-2');
      trashButton.innerHTML = `<i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#Id-${bookObject.id}"></i>`;

      const delButton = document.createElement('button');
      delButton.setAttribute('type', 'button');
      delButton.classList.add('btn', 'btn-danger');
      delButton.innerText = 'Hapus Data';
      delButton.addEventListener('click', function () {
        removeReadBook(bookObject.id);
        location.reload();
      });

      const modalFooter = document.getElementById(`footer-${bookObject.id}`);
      modalFooter.append(delButton);

      const checkButton = document.createElement('button');
      checkButton.classList.add('btn', 'btn-primary', 'float-end');
      checkButton.innerHTML = '<i class="bi bi-check-circle"></i>';

      checkButton.addEventListener('click', function () {
        addToReadBook(bookObject.id)
        location.reload();
      });

      cardFooter.append(checkButton, trashButton);
    }

  return completeCard;
}