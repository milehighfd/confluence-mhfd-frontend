class MapService {

  private _map: any;
  private _autocomplete: any;

  isAutocompleteUsed = false;

  hideAndRemoveLayer() {
    if (this.map && this.map.getLayer('mask')) {
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
    }
    if (this.map.loaded()) {
      this.hideAndRemoveLayer();
    }
  }

  loadImages() {
    const imagesPaths = [
      'custom-sprite/30x30px.png',
      'custom-sprite/dollar.png',
      'custom-sprite/fema-floodway.png',
      'custom-sprite/Levee.png',
      'custom-sprite/Frame13a.png',
      'custom-sprite/Frame17m2t.png',
      'custom-sprite/Frame21C.png',
      'custom-sprite/pjm2.png',
      'custom-sprite/ic-stripered.png',
      'custom-sprite/ic-stripeviolet.png',
      'custom-sprite/Urbanclimbtosafetysign_origclean.png',
      'custom-sprite/rd-draft_ORANGE.png',
      'custom-sprite/rd-apprv_GREEN.png',
      'custom-sprite/rd-rqst_PINK.png',
      'custom-sprite/prop-acq-rqst_PINK.png',
      'custom-sprite/prop-acq-apprv_GREEN.png',
      'custom-sprite/prop-acq-draft_ORANGE.png',
      'custom-sprite/MEP-X.png',
      'custom-sprite/floodwaypattern.png',
    ];
    imagesPaths.forEach((imagePath: string) => {
      this.map.loadImage(imagePath, (error: any, image: any) => {
        if (error) {
          console.log('error on load ', error);
          return;
        }
        if (!this.map.hasImage(imagePath.split('/')[1].split('.')[0])) {
          this.map.addImage(imagePath.split('/')[1].split('.')[0], image);
        }
      });
    });
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
