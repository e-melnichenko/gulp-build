import Maska from 'maska/src/maska';

export default function initMask() {
  new Maska('.js-phone-mask', {
    mask: '+7 (###)-###-##-##'
  });

  document.querySelectorAll('.js-phone-mask').forEach(input => {
    input.addEventListener('focus', function() {
      if(this.value) return

      this.value = '+7 ('
    })
  })
}


