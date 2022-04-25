import { boardType } from "./RequestTypes";

class ColorService {

    constructor() {}

    getColor(type: boardType, project: any, arr: any[], year: number, columnIdx: number, editable: boolean) {
        let color = '#9faeb1'
        let a = arr.filter(p => p.origin === project.origin);
        let index = -1;
        a.forEach((p: any, i: number) => {
            if (p.project_id === project.project_id) {
                index = i;
            }
        })
        switch(index) {
            case 0:
                return '#28C499';
            case 1:
                return '#ffdd00';
            case 2:
                return '#ff0000';
            default:
                return color;
        }
    }
  
  }
  
  export default new ColorService();
  