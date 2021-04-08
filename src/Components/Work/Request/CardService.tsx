class CardStatService {

  private position: any;

  constructor() {
    this.position = -1;
  }

  getPosition(): any {
    return this.position;
  }

  setPosition(value: any) {
    this.position = value;
    setTimeout(() => {
      this.position = -1;
    }, 100)
  }

}

export default new CardStatService();
