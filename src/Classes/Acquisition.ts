export class Acquisition {
    requestName: string;
	description: string;
	mhfdDollarRequest: number;
	localDollarsContributed: number;
    constructor() {
        this.requestName = "";
        this.description = "";
        this.mhfdDollarRequest = 0;
        this.localDollarsContributed = 0;
    }
}