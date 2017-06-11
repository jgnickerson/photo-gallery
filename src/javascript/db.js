var firebase = require('firebase/app'); //not working with import for some reason
require('firebase/storage');
require('firebase/database');

const config = {
  apiKey: "AIzaSyDAaYXAQCGOvNrVYhhpkbSOOUW91b1m81I",
  authDomain: "photo-gallery-38650.firebaseapp.com",
  databaseURL: "https://photo-gallery-38650.firebaseio.com",
  projectId: "photo-gallery-38650",
  storageBucket: "photo-gallery-38650.appspot.com",
  messagingSenderId: "780654496614"
};

firebase.initializeApp(config);

let storage = firebase.storage();
let storageRef = storage.ref();
let images = storageRef.child('images');
let metadata = storageRef.child('image-metadata.json');

let db = firebase.database();

let metadataPromise = db.ref('imageMetadata').once("value");

export {db, storage, metadataPromise};
