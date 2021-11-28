let scrollPosition = 0;

export default class BlockIphoneScroll {
  static init() {
    this.enabled = false
  }
  static enable() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    this.enabled = true
  }
  static disable() {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
    this.enabled = false
  }
};
