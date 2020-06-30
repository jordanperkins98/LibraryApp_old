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

getArray();

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
    setArray();
}



function resetForm(form){
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
}

function CreateCard(index=myLibrary.length - 1) {
    
    //Creating the card 
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("data",index);
    //Creating the heading (title of book)
    const heading = document.createElement("h3");
    heading.textContent = myLibrary[index].title;
    heading.setAttribute("class", "title");
    card.appendChild(heading);

    //Creating and adding author to the card
    const author = document.createElement("p");
    author.textContent = `by ${myLibrary[index].author}`;
    author.setAttribute("class", "info");
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `${myLibrary[index].pages} pages`;
    pages.setAttribute("class", "info");
    card.appendChild(pages);

    const read = document.createElement("p");
    read.textContent = `Read: ${myLibrary[index].read}`;
    read.setAttribute("class", "info");
    card.appendChild(read);

    const deleteCard = document.createElement("span");
    deleteCard.setAttribute("class","close-icon remove-book");
    deleteCard.addEventListener("click", (e)=>{
        myLibrary.splice(removeBook.parentElement.getAttribute("data"),1);
        e.srcElement.parentElement.remove();
    });
    card.appendChild(deleteCard);

    const changeRead = document.createElement("button");
    changeRead.setAttribute("class","change-read");
    changeRead.addEventListener("click", ()=>{
        if(myLibrary[index].read === "Yes"){
            myLibrary[index].read = "No";
            changeRead.parentElement.children[3].textContent = "Read: No"
        } else{
            myLibrary[index].read = "Yes";
            changeRead.parentElement.children[3].textContent = "Read: Yes"
        }
    });
    changeRead.textContent = "Change read status";
    card.appendChild(changeRead);

    //Adding full card to the div within the HTML
    div.appendChild(card);
    
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function setArray(){
    if (storageAvailable("localStorage")){
        localStorage.setItem("library", JSON.stringify(myLibrary));
    }
    else{ return; }
    
}

function getArray(){
    if(localStorage.getItem('library')){
        myLibrary = JSON.parse(localStorage.getItem("library"));
        render();
    }
    else{
        if(myLibrary.length > 0){
            render();
        }
        
    }
}

function render(){
    let cardCount = document.querySelector("#books").childElementCount;
    if(cardCount - myLibrary.length < -1){
        for(let i = 0; i < myLibrary.length; i++){
            CreateCard(i)
        }
    }
    else{
        CreateCard();
    }
}


