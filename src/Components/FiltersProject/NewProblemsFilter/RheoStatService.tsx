class RheoStatService {

  private myRef: any;

  constructor() { }

  get ref(): any {
    return this.myRef;
  }

  set ref(value: any) {
    this.myRef = value;
  }

}

export default RheoStatService;
