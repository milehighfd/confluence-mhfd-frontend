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
    overheadcost: any[];
    overheadcostdescription: string;
    additionalcost: number;
    additionalcostdescription: string;
    projectsubtype: string;
    frequency: string;
    maintenanceeligibility: string;
    ownership: string ;
    attachment: any;
    files: any[];
    ids: any[];
    sponsor: string;
    cosponsor: string; 
    components: any;
    independetComponent: any;
    editProject: any;
    streams: any;
    locality: any;
    jurisdiction: any;
    cover: any;
    finalcost?: any;
    constructor() {
        this.projectname = "special";
        this.description = "";
        this.servicearea = "";
        this.county = ""; 
        this.acquisitionprogress = "";
        this.acquisitionanticipateddate = "";
        this.overheadcost = [];
        this.overheadcostdescription = "";
        this.additionalcost = 0;
        this.additionalcostdescription = "";
        this.projectsubtype = "";
        this.frequency = "";
        this.maintenanceeligibility = "";
        this.ownership = "";
        this.files = [];
        this.sponsor = "";
        this.cosponsor = "";
        this.components = [];
        this.independetComponent=[];
        this.editProject = "";
        this.locality = '';
        this.jurisdiction = '';
        this.ids = [];
        this.streams = [];
        this.finalcost = 0;
    }
}
