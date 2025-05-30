const dialog = document.querySelector("dialog");
const formDial = document.querySelector(".add");
const addBook = document.querySelector("#addBook");

let myLibrary = [];

function Book(title, author, pages, status) {
  if (!new.target) {
    throw Error("use new to construct the object");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.uid = crypto.randomUUID();
}

const haris = new Book("rameshChodu", "me", 69, false);
myLibrary.push(haris);

formDial.addEventListener("click", () => {
  dialog.showModal();
});

addBook.addEventListener("click", () => { });

// function updateMylibrary() { }

function updateBookView() {
  const bookContainer = document.querySelector(".all-books");
  while (bookContainer.lastElementChild) {
    bookContainer.removeChild(bookContainer.lastElementChild);
  }

  if (myLibrary.length == 0) {
    return 0;
  }

  myLibrary.forEach((element) => {
    const book = document.createElement("div");
    book.setAttribute("class", "book");

    const title = document.createElement("h4");
    title.innerText = element.title;
    book.appendChild(title);

    const author = document.createElement("p");
    author.innerText = `Author: ${element.author}`;
    book.appendChild(author);

    const pages = document.createElement("p");
    pages.innerText = `Pages: ${element.pages}`;
    book.appendChild(pages);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.innerText = "X";
    book.appendChild(deleteBtn);

    const readStatus = document.createElement("select");
    const read = document.createElement("option");
    read.setAttribute("value", "read");
    read.innerText = "read";
    const notRead = document.createElement("option");
    notRead.setAttribute("value", "not read");
    notRead.innerText = "not read";
    if (element.status) {
      read.selected = true;
    } else {
      notRead.selected = true;
    }
    readStatus.appendChild(read);
    readStatus.appendChild(notRead);
    book.appendChild(readStatus);
    bookContainer.appendChild(book);
  });
}

updateBookView();
