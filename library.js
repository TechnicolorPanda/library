let myLibrary = [];
createHeading("Title", "Author", "Pages", "Read");

function createHeading() {
    const box = document.getElementById("box");
    const heading = document.getElementById("heading");
    let row = heading.insertRow(0);
        for(let i = 0; i < 4; i++){ 
            let cell = document.createElement("th");
            cell.innerHTML = (arguments[i]);
            row.appendChild(cell);
        }
    heading.appendChild(row);
    box.appendChild(heading);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    const myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
    clearTable();
    myLibrary.forEach(element => 
        render(element.title, element.author, element.pages, element.read));
}

function render() {
    const box = document.getElementById("box");
    const table = document.getElementById("bookTable");
    let row = table.insertRow(0);
        for(let j = 0; j < 3; j++){ 
            let cell = document.createElement("td");
            cell.innerHTML = (arguments[j]);
            row.appendChild(cell);
        }
    //create read checkbox on table
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    if (arguments[3] === "yes"){
        checkbox.checked = true;
        row.appendChild(checkbox);
    } else {
        checkbox.checked = false;
        row.appendChild(checkbox);
    }
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.value =  arguments[0];
    row.appendChild(button);
    removeBook(button);
    table.appendChild(row);
    box.appendChild(table);
}

function clearTable() {
    let table = document.getElementById("bookTable");
    table.innerHTML = "";
}

function removeBook(button) {
    button.addEventListener("click", function(e) {
        for (let i = myLibrary.length-1; i>=0; i--) {
            if (myLibrary[i].title === button.value)
                myLibrary.splice(i,1);
        }
        clearTable();
        myLibrary.forEach(element => 
            render(element.title, element.author, element.pages, element.read));
        }, false);
}