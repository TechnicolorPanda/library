let rowNumber = -1;
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
    rowNumber++;
    console.log(rowNumber);
    const box = document.getElementById("box");
    const table = document.getElementById("bookTable");
    const button = document.createElement("button");
    button.innerHTML = "remove";
    let row = table.insertRow(0);
        for(let j = 0; j < 4; j++){ 
        let cell = document.createElement("td");
        cell.innerHTML = (arguments[j]);
        row.appendChild(cell);
        }
    row.dataset.row = rowNumber;
        if (rowNumber > 0) {
            row.appendChild(button);
        };
    console.log(row);
    table.appendChild(row);
    box.appendChild(table);
}


