import DB from './javascript/db.js';
import Grid from './javascript/grid.js';
//import './javascript/upload.js';
//import './javascript/reorder.js';
import 'lazysizes';
import 'animate.css';
import 'dropzone';
import '../node_modules/dropzone/dist/min/dropzone.min.css';
import '../node_modules/dropzone/dist/min/basic.min.css';
import move from 'move-js';
import './index.css';

window.addEventListener("hashchange", ()=>{
  render(decodeURI(window.location.hash));
});

DB.getImageMetadata().then(metadata => {
  const grid = new Grid("grid", metadata);

  window.dispatchEvent(new HashChangeEvent('hashchange'));
});

function render(url) {
  const keyword = url.split('/')[0];

  const visible = document.querySelector(".page-content .page.visible");
  if (visible)
    visible.classList.remove("visible");


  navAnimate(keyword);

  switch (keyword) {
    case "#admin" :
      document.querySelector(".page.admin").classList.add("visible");
      break;

    default:
      document.querySelector(".page.grid").classList.add("visible");
  }
}

function navAnimate(keyword) {
  let navItem;
  switch (keyword) {
    case "#admin":
      navItem = document.getElementById("admin-nav").getBoundingClientRect();
      break;
    default:
      navItem = document.getElementById("home-nav").getBoundingClientRect();
  }


  move('.nav-line').translate(navItem.left+2, navItem.bottom - 17).end();
}
