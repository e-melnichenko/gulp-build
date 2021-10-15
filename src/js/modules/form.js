import HeaderCart from "./headerCart";
import Popup from "./Popup";

export default function initForm() {
  const config = {
    "add-to-cart": {
      onSuccess() {
        Popup.open('order-success-popup');
        HeaderCart.update();
      },
    },
    "call-back-success-popup": {
      onSuccess() {
        Popup.open('call-back-success-popup')
      },
    },
    "feedback-success-popup": {
      onSuccess() {
        Popup.open('feedback-success-popup')
      },
    },
  }

  document.addEventListener('submit', async function(e) {
    const form = e.target.closest('.js-form');
    if(!form) return

    e.preventDefault();

    if (!isFormCorrect(form)) return

    const formData = new FormData(form);
    const {method, action} = form;

    const res = await fetch(action, {
      method,
      body: formData
    });

    const formName = form.dataset.name;

    if(res.ok) {
      config[formName].onSuccess()
      form.reset();
    } else {
      Popup.open('error-popup')
    }
  });

  document.addEventListener('input', (e) => {
    const target = e.target.closest('.js-required');
    if(!target) return

    removeError(target);
  })
}

const regexp = {
  phone: /\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}/, // +7 (999)-999-99-99
  name: /[а-яёa-z\s]+$/i, // одна и более букв латиницы или кириллицы или пробел
  message: /.+/,  // хотя бы один символ
}

function isFormCorrect(form) {
  let result = true;

  form.querySelectorAll('.js-required').forEach(input => {
    const inputName = input.dataset.name;

    if (
      input.type === 'checkbox' && input.checked ||
      ['text', 'textarea'].includes(input.type) && regexp[inputName].test(input.value.trim())
    ) {
      return
    }

    result = false;
    addError(input);
  })

  return result
}

function addError(input) {
  input.closest('.js-form-item').classList.add('_error');
}

function removeError(input) {
  input.closest('.js-form-item').classList.remove('_error');
}
