import Masonry from 'masonry-layout';
import './index.css'

let grid = document.createElement('div');
grid.className = 'grid';

let msnry = new Masonry(grid, {
  itemSelector: '.grid-item',
  columnWidth: 200,
  horizontalOrder: true,
  gutter: 20
});

document.body.appendChild(grid);

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let images = []

for (var i = 0; i < 20; i++) {
  var width = getRandomSize(200, 400);
  var height = getRandomSize(200, 400);
  let image = document.createElement('img');
  image.className = 'grid-item';
  image.src = 'http://www.lorempixel.com/' + width + '/' + height + '/cats';

  //may not be the best way to do it, downsizing may negatively affect quality.
  if (image.width !== 200) {
    image.style.height = 'auto';
    image.style.width = '200px';
  }

  grid.appendChild(image);
  msnry.appended(image);
  //images.push(image);

}

//msnry.appended(images);
msnry.layout();
