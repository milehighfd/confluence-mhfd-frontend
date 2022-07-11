export const REPLACE_DETAILED_PAGE = 'REPLACE_DETAILED_PAGE';
export const REPLACE_VALUE_SPIN = 'REPLACE_VALUE_SPIN';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const RESET_DETAILED = 'RESET_DETAILED';
type Project = {
    cartodb_id: number,
    the_geom: string,
    the_geom_webmercator: string,
    objectid: number,
    onbaseid: string,
    projectname: string,
    requestedname: any,
    status: string,
    projecttype: string,
    projectsubtype: string,
    description: string,
    goal: any,
    maintrestorationtask: any,
    recurrence: any,
    frequency: any,
    estimatedcost: string,
    mhfddollarsrequested: any,
    workplanyear: any,
    mhfddollarsallocated: any,
    startyear: number,
    completedyear: any,
    consultant: any,
    contractor: any,
    lgmanager: any,
    mhfdmanager: string,
    servicearea: string,
    county: string,
    jurisdiction: string,
    mhfd_code: any,
    streamname: string,
    legacycode: any,
    tasksedimentremoval: any,
    tasktreethinning: any,
    taskbankstabilization: any,
    taskdrainagestructure: any,
    taskregionaldetention: any,
    goalfloodrisk: any,
    goalwaterquality: any,
    goalstabilization: any,
    goalcaprecreation: any,
    goalcapvegetation: any,
    goalstudyovertopping: any,
    goalstudyconveyance: any,
    goalstudypeakflow: any,
    goalstudydevelopment: any,
    creator: string,
    datecreated: any,
    lastmodifieduser: any,
    lastmodifieddate: any,
    agolcapitalid: number,
    agolcapitalwrid: any,
    globalid: string,
    workplanyr1: any,
    workplanyr2: any,
    workplanyr3: number,
    workplanyr4: number,
    workplanyr5: any,
    attachments: string,
    finalcost: any,
    sponsor: any,
    cosponsor: any,
    coverimage: any,
    shape_length: number
}

type Problem = {
    cartodb_id: number,
    the_geom: string,
    the_geom_webmercator: string,
    objectid: number,
    problemid: string,
    problemname: string,
    problemdescription: string,
    problemtype: string,
    problempriority: string,
    source: string,
    sourcename: string,
    solutioncost: number,
    solutionstatus: string,
    mhfdmanager: string,
    servicearea: string,
    county: string,
    jurisdiction: string,
    streamname: string,
    problemsubtype: string,
    sourcedate: number,
    shape_length: number,
    shape_area: number
}

export type Detailed = Project | Problem;