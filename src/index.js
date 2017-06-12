import {db, storage} from './javascript/db.js';
import Grid from './javascript/grid.js';
import './javascript/upload.js';
import './javascript/reorder.js';
import 'lazysizes';
import 'animate.css';
import './index.css';

const storageRef = storage.ref();
const images = storageRef.child('images');

window.addEventListener("hashchange", ()=>{
  render(decodeURI(window.location.hash));
});

//fetches metadata and initializes grid
db.ref('imageMetadata').once("value").then(result=> {
  var grid = new Grid("grid", result.val());

  window.dispatchEvent(new HashChangeEvent('hashchange'));
});



function render(url) {
  const keyword = url.split('/')[0];

  const visible = document.querySelector(".page-content .page.visible");
  if (visible)
    visible.classList.remove("visible");

  switch (keyword) {
    case "#admin" :
      document.querySelector(".page.admin").classList.add("visible");
      break;

    default:
      document.querySelector(".page.grid").classList.add("visible");
  }
}
