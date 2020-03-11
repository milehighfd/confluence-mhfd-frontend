export class SedimentRemoval {
    requestName: string;
	projectType: string;
	projectSubType: string;
	description: string;
	mhfdDollarRequest: number;
	maintenanceEligility: string;
    frecuency: string;
    constructor() {
        this.requestName = "";
        this.projectType = "";
        this.projectSubType = "";
        this.description = "";
        this.mhfdDollarRequest = 0;
        this.maintenanceEligility = "";
        this.frecuency = "";
    }
}