export class Debris {
    requestName: string;
	projectType: string;
	projectSubType: string;
	description: string;
	mhfdDollarRequest: number;
	maintenanceEligibility: string;
    frequency: string;
    ownership: boolean;
    imageProject: any;
    imageName: string;
    listDocuments: Array<any> = [];
    constructor() {
        this.requestName = "";
        this.projectType = "maintenance";
        this.projectSubType = "debrisManagement";
        this.description = "";
        this.mhfdDollarRequest = 0;
        this.maintenanceEligibility = "capitalProject";
        this.frequency = "cyclePerYear";
        this.ownership = false;
        this.imageProject = null;
        this.imageName = "";
        this.listDocuments = [];
    }
}

