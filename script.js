const dialog = document.querySelector("dialog");
const formDial = document.querySelector(".add");
const addBook = document.querySelector("form");
const deleteBook = document.querySelectorAll(".delete");
const bookContainer = document.querySelector(".all-books");

// array containing all of the books
let myLibrary = [];

// book constructor
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

const tempBook = new Book("title", "author", "pages", true);
myLibrary.push(tempBook);
// Updating book view
function updateBookView() {
  // checkes if the bookContainer contains atleast one child and removing it
  // this loop will run till all childs are removed
  while (bookContainer.lastElementChild) {
    bookContainer.removeChild(bookContainer.lastElementChild);
  }

  if (myLibrary.length == 0) {
    return 0;
  }

  // creating html book structure
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
    deleteBtn.setAttribute("id", `${element.uid}`);
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", () => {
      myLibrary.forEach((element, index) => {
        if (element.uid === deleteBtn.id) {
          myLibrary.splice(index, 1);
          updateBookView();
        }
      });
    });
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

formDial.addEventListener("click", () => {
  dialog.showModal();
});

// Adding books to myLibrary[]
addBook.addEventListener("submit", (event) => {
  const form = event.target;
  const title = form.elements["title"].value;
  const author = form.elements["author"].value;
  const pages = form.elements["pages"].value;
  const flag = form.elements["status"].value;
  let status = false;
  if (flag === "yes") {
    status = true;
  } else {
    status = false;
  }

  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  updateBookView();
  dialog.close();
});
