
function signIn() {
  console.log('sign in');
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');

// firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     var credential = result.credential;

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

(function () {
  const myLibrary = [];
  const mySavedLibrary = [];
  createHeading('Title', 'Author', 'Pages', 'Read');
  testLocalStorage(myLibrary, mySavedLibrary);
  submitSelection(myLibrary, mySavedLibrary);
}());

function createHeading() {
  const box = document.getElementById('box');
  const heading = document.getElementById('heading');
  const row = heading.insertRow(0);
  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('th');
    cell.innerHTML = arguments[i];
    row.appendChild(cell);
  }
  heading.appendChild(row);
  box.appendChild(heading);
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function submitSelection(myLibrary, mySavedLibrary) {
  const submitButton = document.getElementById('submit');
  submitButton.innerHTML = 'Submit';
  submitButton.addEventListener('click', () => {
    addBookToLibrary(myLibrary, mySavedLibrary);
  });
  disableField();
}

// disable submit button when form is not completed

function disableField() {
  const invalidForm = document.querySelector('input:invalid');
  const submitButton = document.getElementById('submit');
  if (invalidForm) {
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.removeAttribute('disabled');
  }

  const inputs = document.getElementsByTagName('input');
  for (const input of inputs) {
    input.addEventListener('change', disableField);
  }
}

function addBookToLibrary(myLibrary, mySavedLibrary) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;
  const myBook = new Book(title, author, pages, read);

  myLibrary.push(myBook);

  myLibrary.forEach((element) => (mySavedLibrary = element));

  localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));

  clearTable();
  renderBooks(myLibrary, mySavedLibrary);
}

function renderBooks(myLibrary, mySavedLibrary) {
  myLibrary.forEach((element) => render(element.title, element.author, element.pages, element.read));

  function render() {
    const box = document.getElementById('box');
    const table = document.getElementById('bookTable');
    const row = table.insertRow(0);
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('td');
      cell.innerHTML = arguments[j];
      row.appendChild(cell);
    }

    // create read checkbox on table

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute(
      'style',
      'height: 20px; width: 20px; margin-top: 25px;',
    );

    if (arguments[3] === 'yes') {
      checkbox.checked = true;
      row.appendChild(checkbox);
    } else {
      checkbox.checked = false;
      row.appendChild(checkbox);
    }
    checkbox.value = arguments[0];

    // change read status in list

    checkbox.addEventListener(
      'click',
      () => {
        for (let i = myLibrary.length - 1; i >= 0; i--) {
          if (myLibrary[i].title === checkbox.value) {
            if (checkbox.checked === false) {
              myLibrary[i].read = 'no';
            } else {
              myLibrary[i].read = 'yes';
            }
          }
        }

        myLibrary.forEach((element) => (mySavedLibrary = element));
        localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));

        clearTable();
        myLibrary.forEach((element) => render(
          element.title, element.author, element.pages, element.read,
        ));
      },
      false,
    );

    // add remove button

    const button = document.createElement('button');
    button.innerHTML = 'remove';
    button.value = arguments[0];
    row.appendChild(button);
    removeBook(button, myLibrary, mySavedLibrary);
    table.appendChild(row);
    box.appendChild(table);
  }
}

// erases book table

function clearTable() {
  const table = document.getElementById('bookTable');
  table.innerHTML = '';
}

// removes book from list when button selected

function removeBook(button, myLibrary, mySavedLibrary) {
  button.addEventListener(
    'click',
    () => {
      for (let i = myLibrary.length - 1; i >= 0; i--) {
        if (myLibrary[i].title === button.value) myLibrary.splice(i, 1);
      }
      myLibrary.forEach((element) => (mySavedLibrary = element));
      localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));
      clearTable();
      renderBooks(myLibrary, mySavedLibrary);
    },
    false,
  );
}

// directs storage options

function testLocalStorage(myLibrary, mySavedLibrary) {
  if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('mySavedLibrary')) {
      populateStorage(mySavedLibrary);
    } else {
      retrieveStorage(myLibrary);
    }
  } else {
    alert('Library can not be saved.');
  }
}

// checks to see if local storage is allowed

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      && (e.code === 22
        || e.code === 1014
        || e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && storage
      && storage.length !== 0
    );
  }
}

// creates local storage for the first time

function populateStorage(mySavedLibrary) {
  localStorage.setItem('mySavedLibrary', mySavedLibrary);
}

// retrieves existing local storage

function retrieveStorage(myLibrary) {
  const mySavedLibrary = JSON.parse(localStorage.getItem('mySavedLibrary'));
  mySavedLibrary.forEach((element) => myLibrary.push(element));
  clearTable();
  renderBooks(myLibrary, mySavedLibrary);
}

initFirebaseAuth();
