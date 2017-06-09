import Masonry from 'masonry-layout';
import Isotope from 'isotope-layout';
import './util.js';
import 'lazysizes';
import './index.css';

class Grid {
  constructor(parentNode, imageObjects) {
    this.container = parentNode;
    this.imageObjects = imageObjects;

    this.state = {
      imgPaddingDivisor: 1
    }
    if (window.matchMedia("only screen and (min-width: 70em)").matches) {
      this.state.imgPaddingDivisor = 3;
    } else if (window.matchMedia("only screen and (min-width: 50em) and (max-width: 70em)").matches) {
      this.state.imgPaddingDivisor = 2;
    } else {
      this.state.imgPaddingDivisor = 1;
    }

    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    parentNode.appendChild(this.grid);

    imageObjects.forEach(object => {
      let gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.style['padding-bottom'] = object[2]/object[1]*100/this.state.imgPaddingDivisor + '%';

      let img = document.createElement('img');
      img.className = 'lazyload';
      img.setAttribute('data-src', object[0]);

      gridItem.appendChild(img);
      this.grid.appendChild(gridItem);
    });

    this.isotope = new Isotope(this.grid, {
      itemSelector: '.grid-item',
      masonry: {
        horizontalOrder: true,
        gutter: 10
      }
    });

    this.isotope.layout();

    //change grid-item div padding-bottom to align with new column number at window resize breakpoints
    window.addEventListener("optimizedResize", ()=> {
      let newPaddingDivisor;

      if (window.matchMedia("only screen and (min-width: 70em)").matches) {
        newPaddingDivisor = 3;
      } else if (window.matchMedia("only screen and (min-width: 50em) and (max-width: 70em)").matches) {
        newPaddingDivisor = 2;
      } else {
        newPaddingDivisor = 1;
      }

      if (newPaddingDivisor !== this.state.imgPaddingDivisor) {
        this.state.imgPaddingDivisor = newPaddingDivisor;
        //recalculate the padding-bottom when we hit a breakpoint
        this.grid.childNodes.forEach((div, index) => {
          div.style['padding-bottom'] = this.imageObjects[index][2]/this.imageObjects[index][1]*100/this.state.imgPaddingDivisor + '%';
        })

        this.isotope.layout();
      }
    });
  }
}

export default Grid;
