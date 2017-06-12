import {db, storage} from './javascript/db.js';
import Grid from './javascript/grid.js';
import './javascript/upload.js';
import './javascript/reorder.js';
import 'lazysizes';
import 'animate.css';
import './index.css';

const storageRef = storage.ref();
const images = storageRef.child('images');

//createImageJson();

//fetches metadata and initializes grid
db.ref('imageMetadata').once("value").then(result=> {
  var grid = new Grid("grid", result.val());
});
