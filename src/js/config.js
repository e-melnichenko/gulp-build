import Popup from "./modules/Popup";

const BREAKPOINTS = {
  tablet: 768,
  desktop: 1200,
  note: 1440,
  desktopLg: 1600,
}

export const SLIDERS = {
  'news-list': {
    options: {
      mediaQuery: 'min',
      gap: '2rem',
      pagination: false,
      fixedWidth: '30.6rem',
      padding: {left: '2rem', right: '5rem'},
      arrows: false,
      breakpoints: {
        [BREAKPOINTS.desktop]: {
          perPage: 3,
          fixedWidth: false,
          padding: null,
          arrows: true,
        }
      }
    },
    callbacks: {
      mounted(slider) {
        const { perPage } = slider._options;
        const slidesCount = slider.Components.Slides.getLength();
        if(slidesCount > perPage) return

        slider._options.arrows = false

        console.log(slider);
      }
    }
  }
}

export const PLACEMARKS = [
  {
    coords: [55.888942, 37.595195],
    properties: {},
    options: {
      iconLayout: 'default#image',
      iconImageHref: 'assets/img/placemark.svg',
      // iconImageHref: `${BASE_URL}/upload/static/img/placemark.svg`,
      iconImageSize: [30, 42],
    },
  }
];

export const FORMS = {
  'feedback': {
    onSuccess() {
      Popup.open('feedback-success-popup')
    }
  }
}

