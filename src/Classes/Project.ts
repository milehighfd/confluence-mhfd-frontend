export class Geom {
    type: string;
    coordinates: Array<any>;
    constructor() {
        this.type = "multilinea";
        this.coordinates = [];
    }
}
export class Project {
    year: string | null;
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
    frequency: string | number;
    maintenanceeligibility: string;
    ownership: string ;
    attachment: any;
    files: any[];
    ids: any[];
    sponsor: string;
    cosponsor: string; 
    components: any;
    independentComponent: any;
    editProject: any;
    streams: any;
    locality: any;
    jurisdiction: any;
    cover: any;
    estimatedcost?: any;
    estimatedcostInput?: any;
    estimatedcostDescription?: any;
    studyreason: number;
    sendToWR: boolean;
    componentcost?: any;
    componentcount?: any;
    otherReason? : any;
    isWorkPlan: boolean;
    type: string;
    isCountyWide: boolean | undefined;
    isSouthPlate: boolean | undefined;
    sponsorId: any;
    is_routine: boolean;
    subtotalcost: any;
    userChangedOverhead: any;
    constructor() {
        this.year = '2023';
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
        this.independentComponent=[];
        this.editProject = "";
        this.locality = '';
        this.jurisdiction = '';
        this.ids = [];
        this.streams = [];
        this.estimatedcost = 0;
        this.estimatedcostInput = 0;
        this.estimatedcostDescription = '';
        this.otherReason = '';
        this.studyreason = 1;
        this.sendToWR = false;
        this.isWorkPlan = false;
        this.type = '';
        this.isCountyWide = false;
        this.isSouthPlate = false;
        this.sponsorId = 0;
        this.is_routine = false;
        this.subtotalcost = 0;
        this.userChangedOverhead = [false, false, false, false, false, false, false, false, false]
    }
}
