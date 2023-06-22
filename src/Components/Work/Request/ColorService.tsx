import { boardType } from "./RequestTypes";

class ColorService {

    getColor(type: boardType, project: any, arr: any[], columnIdx: number) {
        let color = '#9faeb1'
        let a = arr.filter(p => p.origin === project.origin);
        let index = -1;
        if (type === 'WORK_REQUEST' && columnIdx !== 0) {
            a.forEach((p: any, i: number) => {
                if (p.project_id === project.project_id) {
                    index = i;
                }
            })
        } else {
          index = project[`originPosition${columnIdx}`];
        }
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
  