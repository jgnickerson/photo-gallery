var firebase = require('firebase/app'); //not working with import for some reason
require('firebase/storage');
require('firebase/database');

class DB {
  constructor() {
    const config = {
      apiKey: "AIzaSyDAaYXAQCGOvNrVYhhpkbSOOUW91b1m81I",
      //authDomain: "photo-gallery-38650.firebaseapp.com",
      databaseURL: "https://photo-gallery-38650.firebaseio.com",
      projectId: "photo-gallery-38650",
      storageBucket: "photo-gallery-38650.appspot.com",
      //messagingSenderId: "780654496614"
    };

    firebase.initializeApp(config);

    this._db = firebase.database();
    this._storage = firebase.storage();

    this.metadata = this._getImageMetadata();
  }

  putImage(file, nameProp, width, height) {
    return this._storage.ref().child('images/' + file[nameProp]).put(file)
      .then(snapshot => this._putImageMetadata(file.name, snapshot.downloadURL, file.width, file.height))
      .catch(this._handleError);
  }

  // refreshImageMetadata() {
  //   this.metadata = this._getImageMetadata();
  // }

  isFilenameDuplicate(filename) {
    return this.metadata.then(metadata => !!metadata.find(imgObj => imgObj.filename === filename));
  }

  _getImageMetadata() {
    return this._db.ref('imageMetadata').once('value')
      .then(snapshot => snapshot.exists() ? snapshot.val() : [])
      .catch(this._handleError);
  }

  _putImageMetadata(filename, url, width, height) {
    const newImgMetadata = {filename, url, width, height};
    return this.metadata
      .then(metadata => this._db.ref('imageMetadata').set([...metadata, newImgMetadata]))
      //add another promise chain here to unpack the snapshot.....
      .catch(this._handleError);
  }

  //TODO flesh this out
  //following: https://hackernoon.com/promises-and-error-handling-4a11af37cb0e
  _handleError(firebaseError) {
    throw new Error("Firebase error: " + firebaseError.message);
  }
}

export default (new DB);
