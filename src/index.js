import Masonry from 'masonry-layout';
import './index.css'

let grid = document.createElement('div');
grid.className = 'grid';

let msnry = new Masonry(grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  horizontalOrder: true,
  gutter: 10,
  transitionDuration: 0
});

document.body.appendChild(grid);

// function getRandomSize(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

//let images = [];

let urls = [
  'https://c1.staticflickr.com/6/5661/22826806478_735a5b3709_o.jpg',
  'https://c1.staticflickr.com/6/5792/30969987556_704d3f7bc2_o.jpg',
  'https://c1.staticflickr.com/6/5749/30969987986_cf9b511db4_o.jpg',
  'https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg',
  'https://c1.staticflickr.com/6/5506/30969987906_805b11c0ca_o.jpg',
  'https://c1.staticflickr.com/6/5521/22826806218_cff7015524_o.jpg',
  'https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg',
  'https://c1.staticflickr.com/6/5821/22826805948_3042189999_o.jpg',
  'https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg',
  'https://c1.staticflickr.com/6/5563/30969987696_d85fd0e414_o.jpg',
  'https://c1.staticflickr.com/3/2830/33407254622_2d9521fa3f_o.jpg',
  'https://c1.staticflickr.com/4/3829/32720628284_148d94b5cb_o.jpg',
  'https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg',
  'https://c1.staticflickr.com/4/3678/33435244401_01aa5f1120_o.jpg',
  'https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg',
  'https://c1.staticflickr.com/3/2905/32720602474_b7aee347e8_o.jpg'
];

// let div = document.createElement('div');
// div.className = 'grid-item';
// let image = document.createElement('img');
// image.src = 'https://c1.staticflickr.com/6/5661/22826806478_735a5b3709_o.jpg';
// div.appendChild(image);
//
// image.style.height = 'auto';
// image.style.width = '420px';
//
// grid.appendChild(div);
// images.push(div);

//set up sizing div for masonry's responsive layout
let sizerDiv = document.createElement('div');
sizerDiv.className = 'grid-sizer';
grid.appendChild(sizerDiv);

urls.forEach(url => {
  let div = document.createElement('div');
  div.className = 'grid-item-wrapper';

  let img = document.createElement('img');
  img.className = 'grid-item';
  img.src = url;

  // img.style.height = 'auto';
  // img.style.width = '400px'
  // if (img.width > img.height) {
  //   img.style.width = '420px';
  // } else {
  //   img.style.width = '200px';
  // }

  div.appendChild(img);
  grid.appendChild(div);
  msnry.appended(img);
});

// for (var i = 0; i < 20; i++) {
//   var width = getRandomSize(200, 400);
//   var height = getRandomSize(200, 400);
//   let div = document.createElement('div');
//   div.className = 'grid-item';
//   let image = document.createElement('img');
//   image.src = 'http://www.lorempixel.com/' + width + '/' + height + '/cats';
//
//   //may not be the best way to do it, downsizing may negatively affect quality.
//   if (image.width !== 200) {
//     image.style.height = 'auto';
//     image.style.width = '200px';
//   }
//
//   div.appendChild(image);
//
//   grid.appendChild(div);
//   //msnry.appended(div);
//   images.push(div);
//
// }
//
// msnry.appended(images);
msnry.layout();
