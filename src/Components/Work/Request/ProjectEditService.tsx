class ProjectEditService {
  projects: any[];

  constructor() {
    this.projects = [];
  }

  setProjects(p: any[]) {
    this.projects = [...p];
  }

  getProjects() {
    return this.projects;
  }

}

export default new ProjectEditService();
