export type boardType = 'WORK_REQUEST' | 'WORK_PLAN';

export interface boardProject {
  projectData: any,
  project_id: number,
  req1: number, req2: number, req3: number, req4: number, req5: number,
  positon0: number, positon1: number, positon2: number, positon3: number, positon4: number, positon5: number
};

export interface columnProject {
  title: string,
  hasCreateOption?: boolean,
  projects: boardProject[]
}
