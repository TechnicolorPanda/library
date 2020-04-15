let rowNumber = -1;
let myLibrary = [];
render("Title", "Author", "Pages", "Read");

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
    myLibrary.forEach(element => 
        render(element.title, element.author, element.pages, element.read));
}

function render() {
    rowNumber++;
    const box = document.getElementById("box");
    const table = document.getElementById("bookTable");
    let row = table.insertRow(0);
        for(let j = 0; j < 4; j++){ 
        let cell = document.createElement("td");
        cell.innerHTML = (arguments[j]);
        row.appendChild(cell);
        }
    row.dataset.row = rowNumber;
        if (rowNumber > 0) {
            const button = document.createElement("button");
            button.innerHTML = "remove";
            button.value =  arguments[0];
            button.addEventListener("click", function(e) {
                myLibrary.splice(rowNumber,1);
                //remove book with e.target.value;
            }, false);
            row.appendChild(button);
            console.log(rowNumber);
            console.log(row);
        };
    table.appendChild(row);
    box.appendChild(table);
}
