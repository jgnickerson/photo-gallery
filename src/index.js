import {db, storage} from './db.js';
import Grid from './grid.js';
import './upload.js';
import './reorder.js';
import 'lazysizes';
import './index.css';

const storageRef = storage.ref();
const images = storageRef.child('images');

//createImageJson();

//fetches metadata and initializes grid
db.ref('imageMetadata').once("value").then(result=>initializeGrid(result.val()));


function initializeGrid(data) {
  var grid = new Grid(document.body, data);

  window.addEventListener("optimizedResize", () => {
    grid.fixPadding();

    //hack to get around breakpoint layout issue
    setTimeout(()=>{
      grid.layout();
    }, 500);
  })

  return grid;
}

function createImageJson() {
  let imageObjects = [];

  let p = new Promise((resolve, reject) => {
    let urlPromises = [];
    for (let i = 1; i < 19; i++) {
      let p = new Promise((resolve, reject) => {
        let imgPath = (i < 10) ? 'IMG_00'+i+'.jpg' : 'IMG_0'+i+'.jpg';
        images.child(imgPath).getDownloadURL().then(url => {
          console.log(url);
          imageObjects.push({ url });
          resolve();
        });
      })
      urlPromises.push(p);
    }

    Promise.all(urlPromises).then(()=>{
      resolve();
    })
  })


  p.then(()=>{
    let promises = [];
    imageObjects.forEach(obj => {
      promises.push(getMeta(obj.url));
    })

    return Promise.all(promises);
  })
  .then(results => {
    imageObjects.forEach((obj, index) => {
      obj.width = results[index][0];
      obj.height = results[index][1];
    });

    //let json = JSON.stringify(imageObjects);
    //console.log(json);
    //metadata.putString(json).then((snapshot) => {console.log(snapshot)});

    db.ref('imageMetadata').set(imageObjects);
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
  })
}

function getMeta(url){
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = function() {
      resolve([this.naturalWidth, this.naturalHeight]);
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  })
}
