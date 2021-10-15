export default class Popup {
  constructor() {}

  static open(id) {
    const widthBefore = document.body.clientWidth;
    document.body.classList.add(this.className.body)
    const widthAfter = document.body.clientWidth;

    if( widthBefore !== widthAfter) {
      document.body.style.paddingRight = `${widthAfter - widthBefore}px`;
    }

    document.querySelectorAll(`.${this.className.popup}`).forEach(popup => {
      popup.classList.remove(this.className.popupActive);
      id === popup.id ? popup.classList.add(this.className.popupActive) : '';
    });
  }

  static close(eventElem) {
    if(!eventElem) {
      document.querySelectorAll(`.${this.className.popup}`).forEach(popup => {
        popup.classList.remove(this.className.popupActive);
      })
    } else {
      const popup = eventElem.closest(`.${this.className.popup}`);
      popup ? popup.classList.remove(this.className.popupActive) : '';
    }

    document.body.style.paddingRight = null;
    document.body.classList.remove(this.className.body);
  }

  static init() {
    this.className = {
      body: '_popup-open',
      popup: 'js-popup',
      popupActive: '_active',
      open: 'js-open-popup',
      close: 'js-close-popup',
    }

    this._addListeners()
  }

  static _addListeners() {
    // open
    document.addEventListener('click', (e) => {
      const target = e.target.closest( `.${this.className.open}`)
      if(!target) return

      e.preventDefault();
      const id = target.dataset.popupId;
      this.open(id);
    })

    // close
    document.addEventListener('click', (e) => {
      const target = e.target.closest(`.${this.className.close}`)
      if(!target) return

      e.preventDefault();
      this.close(target);
    })

    // outside
    document.addEventListener('click', (e) => {
      const popup = e.target.closest(`.${this.className.popup}`);
      const openpopup = e.target.closest(`.${this.className.open}`);
      if(popup || openpopup) return

      this.close()
    })
  }
}
