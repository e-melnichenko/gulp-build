export default class Tabs {
  constructor() {
    this.container = document.querySelector('.js-tabs');
    if(!this.container) return

    this.activeTab = this.container.querySelector('.js-tab-content._active');
    this.activeNav = this.container.querySelector('.js-tab-nav._active');

    this._addListeners();
  }

  _addListeners() {
    this.container.addEventListener('click', (e) => {
      const target = e.target.closest('.js-tab-nav');
      if(!target || target.classList.contains('_active')) return

      const index = target.dataset.index;

      this._setActiveTab(index);
      this._setActiveNav(target);
    })
  }

  _setActiveTab(index) {
    this.activeTab.classList.remove('_active');
    this.activeTab = this.container.querySelector(`.js-tab-content[data-index="${index}"`);
    this.activeTab.classList.add('_active');
  }

  _setActiveNav(newActiveNav) {
    this.activeNav.classList.remove('_active');
    newActiveNav.classList.add('_active');
    this.activeNav = newActiveNav;

    this._scrollToSelected();
  }

  _scrollToSelected() {
    const scrollContainer = this.container.querySelector('.js-scroll-container');
    const navLeft = this.activeNav.getBoundingClientRect().left;
    const containerLeft = scrollContainer.getBoundingClientRect().left;

    scrollContainer.scrollTo({
      left: navLeft - containerLeft + scrollContainer.scrollLeft,
      behavior: 'smooth',
    })
  }
}
