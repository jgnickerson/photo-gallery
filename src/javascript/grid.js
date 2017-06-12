import Masonry from 'masonry-layout';
import Isotope from 'isotope-layout';
import './util.js';

class Grid {
  constructor(parentNode, imageObjects) {
    this.container = parentNode;
    this.imageObjects = imageObjects;
    this.state = {
      imgPaddingDivisor: this._getPaddingDivisor()
    }

    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    parentNode.appendChild(this.grid);

    if (this.imageObjects) {
      this._initGridItems();
    }

    this.isotope = new Isotope(this.grid, {
      itemSelector: '.grid-item',
      transitionDuration: 0,
      masonry: {
        horizontalOrder: true,
        gutter: 10,
      }
    });

    this.isotope.layout();
  }

  layout() {
    this.isotope.layout();
    return this; //for easy method chaining
  }

  //change grid-item div padding-bottom to align with new column number at window resize breakpoints
  fixPadding() {
    let newPaddingDivisor = this._getPaddingDivisor();

    if (newPaddingDivisor !== this.state.imgPaddingDivisor) {
      this.state.imgPaddingDivisor = newPaddingDivisor;
      //recalculate the padding-bottom when we hit a breakpoint
      this.grid.childNodes.forEach((div, index) => {
        div.style['padding-bottom'] = this.imageObjects[index].height/this.imageObjects[index].width*100/this.state.imgPaddingDivisor + '%';
      })

      this.isotope.layout();
    }

    return this;
  }

  _initGridItems() {
    this.imageObjects.forEach(obj => {
      const gridItem = document.createElement('div');
      // if (obj.width < 2*obj.height) {
      gridItem.className = 'grid-item';
      // } else {
      //   gridItem.className = 'grid-item extra-wide';
      // }
      gridItem.style['padding-bottom'] = obj.height/obj.width*100/this.state.imgPaddingDivisor + '%';

      const img = document.createElement('img');
      img.className = 'lazyload';
      img.setAttribute('data-src', obj.url);

      const modal = document.createElement('div');
      modal.className = 'modal animated fadeIn';
      const modalImg = document.createElement('img');
      modalImg.className = 'modal-content';
      const close = document.createElement('span');
      close.className = 'close';
      close.innerHTML = "&times";
      close.onclick = () => modal.style.display = 'none';
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          modal.style.display = 'none';
        }
      });
      modal.appendChild(modalImg);
      modal.appendChild(close);

      gridItem.onclick = () => {
        modal.style.display = "block";
        modalImg.src = obj.url;
      }

      gridItem.appendChild(img);
      document.body.appendChild(modal);
      this.grid.appendChild(gridItem);
    });
  }

  //this must match the CSS media queries, returns the number of columns of pics
  _getPaddingDivisor() {
    let newPaddingDivisor;

    if (window.matchMedia("only screen and (min-width: 70em)").matches) {
      newPaddingDivisor = 3;
    } else if (window.matchMedia("only screen and (min-width: 50em) and (max-width: 70em)").matches) {
      newPaddingDivisor = 2;
    } else {
      newPaddingDivisor = 1;
    }

    return newPaddingDivisor;
  }
}

export default Grid;
