export class Geom {
    type: string;
    coordinates: Array<any>;
    constructor() {
        this.type = "multilinea";
        this.coordinates = [];
    }
}
export class Project {
    projectname: string;
    description: string;
	servicearea: string;
    county: string;
    geom: any ;
    acquisitionprogress: string;
    acquisitionanticipateddate: string;
    overheadcost: string;
    overheadcostdescription: string;
    additionalcost: string;
    additionalcostdescription: string;
    projectsubtype: string;
    frequency: string;
    maintenanceeligibility: string;
    ownership: string ;
    attachment: any;
    files: any[];
    ids: any;

    constructor() {
        this.projectname = "special";
        this.description = "";
        this.servicearea = "";
        this.county = ""; 
        this.acquisitionprogress = "";
        this.acquisitionanticipateddate = "";
        this.overheadcost = "";
        this.overheadcostdescription = "";
        this.additionalcost = "";
        this.additionalcostdescription = "";
        this.projectsubtype = "";
        this.frequency = "";
        this.maintenanceeligibility = "";
        this.ownership = "";
        this.files = [];
    }
}
