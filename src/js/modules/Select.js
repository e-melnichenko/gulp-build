export default class Select {
  constructor(elem, params) {
    this.nativeSelect = elem;
    this.selected = null;
    this.params = params;

    this._init()
  }

  static init() {
    document.body.addEventListener('click', (e) => {
      if(e.target.closest('.js-custom-select')) return

      document.querySelectorAll('.js-custom-select').forEach((el) => el.classList.remove('_open'));
    });
  }

  _init() {
    let options = [];

    if(!this.nativeSelect.options.length &&  this.params?.data.length) {
      options = [...this.params.data]
    } else {
      options = [...this.nativeSelect.options]
    }

    this.selected = options.find(option => option.selected) || options[0]

    const customSelect = this._generateTemplate(options);
    this.nativeSelect.after(customSelect);
    this.nativeSelect.style.display = 'none';

    this.container = customSelect;
    this.label = this.container.querySelector('.js-select-label');
    this.labelText = this.label.querySelector('.js-select-label-text');
    this.dropdown = this.container.querySelector('.js-select-dropdown');

    this._addListeners();
  }

  _addListeners() {
    this.label.addEventListener('click', () => this._toggle());
    this.dropdown.addEventListener('click', (e) => {
      const target = e.target.closest('.js-option');
      if(!target) return

      this._handleOptionClick(target)
    });
  }

  _toggle() {
    this.container.classList.toggle('_open');
  }

  _closeDropdown() {
    this.container.classList.remove('_open');
  }

  _handleOptionClick(option) {
    const value = option.dataset.value;
    const textContent = option.textContent;

    this.selected = {value, textContent };

    this._changeNativeSelectValue(value);
    this.labelText.textContent = this.selected.textContent;
    this._closeDropdown();
    this._changeValue();

    if(!this.params.callbacks.onSelect) return

    this.params.callbacks.onSelect({value: this.selected.value})
  }

  _changeNativeSelectValue(value) {
    this.nativeSelect.value = value;
    // this.nativeSelect.dispatchEvent(new CustomEvent('default-select-change', {detail: {value}}));
  }

  _changeValue() {
    this.container.querySelectorAll('.js-option').forEach(option => {
      option.dataset.value === this.selected.value ?
        option.classList.add('_selected') : option.classList.remove('_selected');
    })
  }

  _generateTemplate(options) {
    const templateElem = document.createElement('DIV');
    templateElem.className = 'form__select select js-custom-select';

    templateElem.innerHTML = `
      <div class="select__label js-select-label">
        <span class="select__label-text js-select-label-text">${this.selected.textContent || ''}</span>
        <svg class="select__arrow"><use xlink:href="assets/sprite.svg#chevron-down"></use></svg>
      </div>
      ${this._generateDropdownTemplate(options)}
    `

    return templateElem
  }

  _generateDropdownTemplate(options) {
    return `
      <div class="select__dropdown js-select-dropdown">
        <div class="select__dropdown-list ">
        ${options.map(option => `
          <div class="select__dropdown-item js-option ${option.selected ? '_selected' : ''}" data-value="${option.value}">${option.textContent || ''}</div>
        `).join('')}
        </div>
      </div>
    `
  }
}
