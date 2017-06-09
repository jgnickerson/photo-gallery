import Masonry from 'masonry-layout';
import Isotope from 'isotope-layout';
import './util.js';
import 'lazysizes';
import './index.css';

let grid = document.createElement('div');
grid.className = 'grid';
document.body.appendChild(grid);

let urls = [['https://c1.staticflickr.com/6/5661/22826806478_735a5b3709_o.jpg', 1000, 567],
                  ['https://c1.staticflickr.com/6/5792/30969987556_704d3f7bc2_o.jpg', 1000,646],
                  ['https://c1.staticflickr.com/6/5749/30969987986_cf9b511db4_o.jpg', 1000,604],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627,926],
                  ['https://c1.staticflickr.com/6/5506/30969987906_805b11c0ca_o.jpg', 1000,604],
                  ['https://c1.staticflickr.com/6/5521/22826806218_cff7015524_o.jpg', 1000,607],
                  ['https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg', 1000,672],
                  ['https://c1.staticflickr.com/6/5821/22826805948_3042189999_o.jpg', 1000,667],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627,926],
                  ['https://c1.staticflickr.com/6/5563/30969987696_d85fd0e414_o.jpg', 1000, 667],
                  ['https://c1.staticflickr.com/3/2830/33407254622_2d9521fa3f_o.jpg', 4961, 3585],
                  ['https://c1.staticflickr.com/4/3829/32720628284_148d94b5cb_o.jpg', 1186, 925],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627, 926],
                  ['https://c1.staticflickr.com/4/3678/33435244401_01aa5f1120_o.jpg', 4811, 3360],
                  ['https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg', 1000,672],
                  ['https://c1.staticflickr.com/3/2905/32720602474_b7aee347e8_o.jpg', 5472, 3543]];

let imgPaddingDivisor;
if (window.matchMedia("only screen and (min-width: 70em)").matches) {
  imgPaddingDivisor = 3;
} else if (window.matchMedia("only screen and (min-width: 50em) and (max-width: 70em)").matches) {
  imgPaddingDivisor = 2;
} else {
  imgPaddingDivisor = 1;
}

urls.forEach(url => {
  let div = document.createElement('div');
  div.className = 'grid-item';
  div.style['padding-bottom'] = url[2]/url[1]*100/imgPaddingDivisor + '%';

  let img = document.createElement('img');
  img.className = 'lazyload';
  img.setAttribute('data-src', url[0]);

  div.appendChild(img);
  grid.appendChild(div);
});

let isotope = new Isotope(grid, {
  itemSelector: '.grid-item',
  masonry: {
    horizontalOrder: true,
    gutter: 10
  }
});

isotope.layout();

//change grid-item div padding-bottom to align with new column number at window resize breakpoints
window.addEventListener("optimizedResize", function() {
  let newPaddingDivisor;

  if (window.matchMedia("only screen and (min-width: 70em)").matches) {
    newPaddingDivisor = 3;
  } else if (window.matchMedia("only screen and (min-width: 50em) and (max-width: 70em)").matches) {
    newPaddingDivisor = 2;
  } else {
    newPaddingDivisor = 1;
  }

  if (newPaddingDivisor !== imgPaddingDivisor) {
    imgPaddingDivisor = newPaddingDivisor;
    //recalculate the padding-bottom when we hit a breakpoint
    grid.childNodes.forEach((div, index) => {
      div.style['padding-bottom'] = urls[index][2]/urls[index][1]*100/imgPaddingDivisor + '%';
    })

    isotope.layout();
  }
});
