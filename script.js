let myLibrary = [];
const div = document.querySelector("#books");

//adding event listner to newBook button to trigger overlay screen
const newBookButton = document.querySelector("#new-book");

const closeIcon = document.querySelector(".close-icon");



const submit = document.querySelector("#add");

submit.addEventListener("click",(e) =>{
    const form = document.querySelector("#form");
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.value);
    render();
    resetForm(form);
    overlay.style.display = "none";
})

closeIcon.addEventListener("click", (e) =>{
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
})

newBookButton.addEventListener("click", (e) =>{
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
})


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, read:${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read){
    //Creating the new book object and adding to library array.
    const newBook = new Book(title, author, pages, read);
    newBook.prototype = Object.create(Book.prototype);
    myLibrary.push(newBook);
}

function render(){
    CreateCard();
}

function resetForm(form){
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
}

function CreateCard() {
    
    //Creating the card 
    const card = document.createElement("div");
    card.setAttribute("id", "card");
    card.setAttribute("data",myLibrary.length - 1);
    //Creating the heading (title of book)
    const heading = document.createElement("h3");
    heading.textContent = myLibrary[myLibrary.length-1].title;
    heading.setAttribute("class", "title");
    card.appendChild(heading);

    //Creating and adding author to the card
    const author = document.createElement("p");
    author.textContent = `by ${myLibrary[myLibrary.length-1].author}`;
    author.setAttribute("class", "info");
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `${myLibrary[myLibrary.length-1].pages} pages`;
    pages.setAttribute("class", "info");
    card.appendChild(pages);

    const read = document.createElement("p");
    read.textContent = `read: ${myLibrary[myLibrary.length-1].read}`;
    read.setAttribute("class", "info");
    card.appendChild(read);

    const deleteCard = document.createElement("span");
    deleteCard.setAttribute("class","close-icon");
    deleteCard.setAttribute("id", "remove-book")
    deleteCard.addEventListener("click", (e)=>{
        myLibrary.splice(removeBook.parentElement.getAttribute("data"),1);
        e.srcElement.parentElement.remove();
    });
    card.appendChild(deleteCard);

    //Adding full card to the div within the HTML
    div.appendChild(card);
    
}

//Delete once done
addBookToLibrary("Harry Potter", "J.K Rowling", 245, "Yes");
render()

const removeBook = document.querySelector("#remove-book");
removeBook.addEventListener("click", (e)=>{
    myLibrary.splice(removeBook.parentElement.getAttribute("data"),1);
    e.srcElement.parentElement.remove();
    
})
