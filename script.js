let myLibrary = [];

function Book(title, author, pages, pubDate, status) {
    Object.assign(this, {title, author, pages, pubDate, status});
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, pubDate, status) {
    myLibrary.push(new Book(title, author, pages, pubDate, status));
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 363, 1900, "unread");
addBookToLibrary("Mere Christianity", "C.S. Lewis", 217, 1900, "unread");
addBookToLibrary("The Matter with Things", "Iain McGilchrist", 1530, 1900, "unread");
addBookToLibrary("Dune", "Frank Herbert", 535, 1900, "unread");

console.log(myLibrary);

const cardContainer = document.querySelector(".main");
let removeButtons;
let statusButtons;
const addButton = document.querySelector(".add-btn");
const closeButton = document.querySelector(".close-btn");
const modal = document.querySelector("#modal");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".form");

submitButton.addEventListener("click", (e) => {
    
    let titleValue = document.querySelector("#new-title").value;
    let authorValue = document.querySelector("#new-author").value;
    let pagesValue = document.querySelector("#new-pages").value;
    let pubValue = document.querySelector("#new-pub").value;
    let selectedRadioButton = Array.from(document.querySelectorAll("[name=status]")).filter(element => element.checked)[0];

    addBookToLibrary(titleValue, authorValue, pagesValue, pubValue, selectedRadioButton.value);

    titleValue = "";
    authorValue = "";
    pagesValue = "";
    pubValue = "";
    selectedRadioButton = false;
    form.reset();
    modal.close();
    displayLibrary();
    e.preventDefault();
})


addButton.addEventListener("click", () => {
    modal.showModal();
});

closeButton.addEventListener("click", () => {
    modal.close();
});


function displayLibrary () {
    cardContainer.innerHTML = "";
    for (let book of myLibrary) {
        cardContainer.innerHTML += `
            <div class="card">
            <svg class="remove-book" id="${book.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" /></svg>
            <h2 class="card-title">${book.title}</h2>
            <p class="card-author">${book.author}</p>
            <p class="card-pages">${book.pages} pages</p>
            <p class="card-pub-date">pub. ${book.pubDate}</p>
            <div class="card-status ${book.status}" id="${book.id}">${book.status}</div>
        </div>`;
    }
    removeButtons = document.querySelectorAll("svg.remove-book");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            myLibrary = myLibrary.filter(book =>
                button.id !== book.id
            )
            displayLibrary();
        })
    });
    
    statusButtons = document.querySelectorAll(".card-status");
    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            myLibrary.map(item => {
                if (item.id === button.id) {
                    switch(item.status) {
                        case "unread":
                            item.status = "reading";
                            break;
                        case "reading":
                            item.status = "read";
                            break;
                        default:
                            item.status = "unread";
                            break;
                    }
                }
            })
            displayLibrary();
            
        })
    })

}
displayLibrary();

console.log(removeButtons);









