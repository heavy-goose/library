(function() {
   const myLibrary = {
        library: [],
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            // Query from document
            this.addButton = document.querySelector(".add-btn");
            this.cardContainer = document.querySelector(".main");
            this.modal = document.querySelector("#modal");
            
            // Query from cache
            this.form = this.modal.querySelector(".form");
            this.closeButton = this.modal.querySelector(".close-btn");
            this.submitButton = this.form.querySelector(".submit-btn");
            this.titleValue = this.form.querySelector("#new-title");
            this.authorValue = this.form.querySelector("#new-author");
            this.pagesValue = this.form.querySelector("#new-pages");
            this.pubValue = this.form.querySelector("#new-pub");
            this.radioButtons = this.form.querySelectorAll("[name=status]");
        },
        bindEvents: function() {
            this.submitButton.addEventListener("click", this.submit.bind(this));
            this.addButton.addEventListener("click", () => this.modal.showModal());
            this.closeButton.addEventListener("click", () => this.modal.close());
            this.cardContainer.addEventListener("click", this.handleClick.bind(this));
        },
        render: function() {
            this.cardContainer.innerHTML = "";
            for (let book of this.library) {
                this.cardContainer.innerHTML += `
                    <div class="card" id="${book.id}">
                    <button class="remove-book">    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" /></svg>
                    </button>
                    <h2 class="card-title">${book.title}</h2>
                    <p class="card-author">${book.author}</p>
                    <p class="card-pages">${book.pages} pages</p>
                    <p class="card-pub-date">pub. ${book.pubDate}</p>
                    <div class="card-status ${book.status}">${book.status}</div>
                </div>`;
            }
        },
        submit: function (e) {
            let selectedRadioButton = Array.from(this.radioButtons).filter(element => element.checked)[0];
            this.addBookToLibrary(this.titleValue.value, this.authorValue.value, this.pagesValue.value, this.pubValue.value, selectedRadioButton.value);
            selectedRadioButton = false;
            this.form.reset();
            this.modal.close();
            this.render();
            e.preventDefault();
        },
        Book: function (title, author, pages, pubDate, status) {
            Object.assign(this, {title, author, pages, pubDate, status});
            this.id = crypto.randomUUID();
        },
        addBookToLibrary: function (title, author, pages, pubDate, status) {
            this.library.push(new this.Book(title, author, pages, pubDate, status));
        },
        handleClick: function(event) {
            if (event.target.matches(".remove-book")) {
                this.removeBook(event);
            } else if (event.target.matches(".card-status")) {
                this.toggleStatus(event);
            }
        },
        removeBook: function(event) {
            const card = event.target.closest(".card");
            if (!card) return; // safety fallback
            card.remove();
            this.library = this.library.filter(book => book.id !== card.id);   
        },
        toggleStatus: function(event) {
            let bookId = event.target.closest(".card").id;
            this.library.map(book => {
                if (book.id === bookId) {
                    switch(book.status) {
                        case "unread":
                            book.status = "reading";
                            break;
                        case "reading":
                            book.status = "read";
                            break;
                        default:
                            book.status = "unread";
                            break;
                    }
                }
            })
            this.render();
        }
    };

    // Load example library
    myLibrary.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 363, 1900, "unread");
    myLibrary.addBookToLibrary("Mere Christianity", "C.S. Lewis", 217, 1900, "unread");
    myLibrary.addBookToLibrary("The Matter with Things", "Iain McGilchrist", 1530, 1900, "unread");
    myLibrary.addBookToLibrary("Dune", "Frank Herbert", 535, 1900, "unread");
    
    myLibrary.init();
    console.log(myLibrary);
})()