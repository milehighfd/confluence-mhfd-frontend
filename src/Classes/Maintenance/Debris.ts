export class Debris {
    requestName: string;
	projectType: string;
	projectSubType: string;
	description: string;
	mhfdDollarRequest: number;
	maintenanceEligibility: string;
    frequency: string;
    ownership: boolean
    constructor() {
        this.requestName = "";
        this.projectType = "Maintenance";
        this.projectSubType = "Debris Management";
        this.description = "";
        this.mhfdDollarRequest = 0;
        this.maintenanceEligibility = "Maintenance eligible";
        this.frequency = "Cycle per year";
        this.ownership = false;
    }
}

