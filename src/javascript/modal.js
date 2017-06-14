import 'animate.css';

class Modal {
  constructor() {
    this._container = document.createElement('div');
    this._container.className = 'modal-container animated fadeIn';

    this._img = document.createElement('img');
    this._img.className = 'modal-content';

    this._close = document.createElement('span');
    this._close.className = 'close';
    this._close.innerHTML = "&times";

    this._container.appendChild(this._img);
    this._container.appendChild(this._close);
    document.body.appendChild(this._container);

    this._close.addEventListener('click', () => this._hideModal());
    window.addEventListener('keydown', (e) => e.keyCode === 27 && this._hideModal());
  }

  show(src) {
    this._img.src = src;
    this._container.style.display = 'block';
  }

  _hideModal() {
    this._img.src = '';
    this._container.style.display = 'none';
  }
}

export default(new Modal)
