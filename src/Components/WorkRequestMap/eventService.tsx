class eventService {

  private myRef: any;

  constructor() {
    this.myRef = {}
  }

  getRef(key: string): any {
    return this.myRef[key];
  }

  setRef(key: string, value: any) {
    this.myRef[key] = value;
  }

  reset() {
    Object.keys(this.myRef).forEach(key => {
      let sliderRange = this.myRef[key];
      sliderRange.value([0, sliderRange.max()]);
    })
  }

}

export default new eventService();
