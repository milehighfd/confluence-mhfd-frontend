class MapService {

  private _map: any;
  private _autocomplete: any;

  isAutocompleteUsed = false;

  hideAndRemoveLayer() {
    if (this.map.getLayer('mask')) {
      this.map.setLayoutProperty('mask', 'visibility', 'visible');
      this.map.removeLayer('mask');
      this.map.removeSource('mask');
    }
  }

  hideOpacity() {
    if (['Boulder', 'Boulder County'].includes(this.autocomplete)) {
      if (!this.isAutocompleteUsed) {
        this.isAutocompleteUsed = true;
        return;
      }
      const waiting = () => {
        if (this.map.loaded()) {
          this.hideAndRemoveLayer();
        } else {
          setTimeout(waiting, 50);
        }
      }
      waiting();
    } else {
      if (this.map.loaded()) {
        this.hideAndRemoveLayer();
      }
    }
  }

  get map(): any {
    return this._map;
  }

  set map(value: any) {
    this._map = value;
  }

  get autocomplete(): any {
    return this._autocomplete;
  }

  set autocomplete(value: any) {
    this.isAutocompleteUsed = false;
    this._autocomplete = value;
  }

}

export default MapService;
