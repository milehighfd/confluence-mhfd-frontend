export class Capital {
    requestName: string;
	description: string;
	localDollarsContributed: number;
	mhfdFundingRequest: string;
	requestFundingYear: number;
	goal: string;
    constructor() {
        this.requestName = "";
        this.description = "";
        this.localDollarsContributed = 0;
        this.mhfdFundingRequest = "";
        this.requestFundingYear = 0;
        this.goal = "";
    }
}