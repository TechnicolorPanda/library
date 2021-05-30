import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyB5IDdqSjVjuSWJC6sICckBF9JRZfEIgAk",
    authDomain: "library-88f53.firebaseapp.com",
    projectId: "library-88f53",
    storageBucket: "library-88f53.appspot.com",
    messagingSenderId: "559243886255",
    appId: "1:559243886255:web:97fa468e26f3a0ac10de5a",
    measurementId: "G-D7C729796T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// signs in to account
function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
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

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Saves a new message to your Cloud Firestore database.
// function saveMessage(messageText) {
//   // Add a new message entry to the database.
//   return firebase.firestore().collection('messages').add({
//     name: getUserName(),
//     text: messageText,
//     profilePicUrl: getProfilePicUrl(),
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   }).catch(function(error) {
//     console.error('Error writing new message to database', error);
//   });
// }

// // Loads chat messages history and listens for upcoming ones.
// function loadMessages() {
//   // Create the query to load the last 12 messages and listen for new ones.
//   var query = firebase.firestore()
//                   .collection('messages')
//                   .orderBy('timestamp', 'desc')
//                   .limit(12);
  
//   // Start listening to the query.
//   query.onSnapshot(function(snapshot) {
//     snapshot.docChanges().forEach(function(change) {
//       if (change.type === 'removed') {
//         deleteMessage(change.doc.id);
//       } else {
//         var message = change.doc.data();
//         displayMessage(change.doc.id, message.timestamp, message.name,
//                        message.text, message.profilePicUrl, message.imageUrl);
//       }
//     });
//   });
// }