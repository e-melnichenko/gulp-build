export default class YMap {
  constructor(id, params) {
    this.id = id,
    this.params = params;
    this.map = null;

    this._initMap()
  }

  setCenter(coords) {
    this.map.setCenter(coords, this.params.zoom, {duration: 300})
  }

  addPlacemark(coords, properties, options) {
    const placemark = new ymaps.Placemark(coords, properties, options);

    this.map.geoObjects.add(placemark)
  }


  _initMap() {
    this.map = new ymaps.Map(this.id, this.params);
    this.map.behaviors.disable(['scrollZoom']);
    // this.map.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
  }
}
