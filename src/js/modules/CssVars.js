import debounce from "../utils/debounce";

class CssVars {
  constructor() {
    this.elems = {};
    // this.elems.header = document.querySelector('.js-header');

    this._addListeners();
    setTimeout(() => this.update(), 0);
  }

  update() {
    const { header } = this.elems;

    // this.set({ name: '--header-height', value: `${header.offsetHeight}px` });
    this.set({ name: '--vh', value: `${window.innerHeight * 0.01}px` });
  }

  get({ name, target=document.documentElement }) {
    return getComputedStyle(target).getPropertyValue(name);
  }

  set({ name, value, target=document.documentElement }) {
    if(!value) return

    target.style.setProperty(name, value);
  }

  _addListeners() {
    window.addEventListener('resize', debounce(
      () => this.update(),
      300
    ));
  }
}

export default CssVars
