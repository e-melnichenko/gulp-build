export default function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function() {
          timeout = null;
          if(!immediate) func.apply(context, args);
      }

      const callNow = immediate && !setTimeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if(callNow) func.apply(context, args);
  }
}
