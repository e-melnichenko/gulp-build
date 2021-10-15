export default function initToggleMenu() {
  document.querySelector('.js-menu-toggle')
    .addEventListener('click', () => document.body.classList.toggle('_menu-open'))
}
