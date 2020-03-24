export class User {
    activated: boolean;
    firstName: string;
    lastName: string;
    designation: string;
    _id: string;
    email: string;
    constructor() {
        this.activated = false;
        this.firstName = "";
        this.lastName = "";
        this.designation = "";
        this._id = "";
        this.email = "";
    }
}
