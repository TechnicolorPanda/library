render("Title", "Author", "Pages", "Read");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    const myBook = new Book (title, author, pages, read);
    render(myBook.title, myBook.author, myBook.pages, myBook.read);
}

function render() {
    const box = document.getElementById("box");
    const table = document.createElement("table");
    const tableBody = document.createElement("tableBody");
    let row = table.insertRow(0);
    for(let j = 0; j < 4; j++){ 
        let cell = document.createElement("td");
        cell.innerHTML = (arguments[j]);
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
    table.appendChild(tableBody); 
    box.appendChild(table);
    table.setAttribute("border", "2");
}


