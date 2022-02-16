import { boardType } from "./RequestTypes";

class ColorService {

    constructor() {}

    getColor(type: boardType, project: any, arr: any[], year: number, columnIdx: number, editable: boolean) {
        let color = '#9faeb1'
        if (type === 'WORK_REQUEST') {
            const { status } = project.projectData;
            let statusLabel = null;
            if (year <= 2021) {
                statusLabel = status;
            } else {
                if (columnIdx === 0) {
                statusLabel = 'Draft';
                } else {
                if (type ==='WORK_REQUEST') {
                    if (editable) {
                    statusLabel = 'Draft';
                    } else {
                    statusLabel = 'Requested';
                    }
                } else {
                    if (editable) {
                    statusLabel = 'Requested';
                    } else {
                    statusLabel = 'Approved';
                    }
                }
                }
            }
            let backgroundColor = null;
            switch(statusLabel) {
                case 'Requested':
                backgroundColor = 'rgba(94, 61, 255, 0.15)';
                color = '#9309EA';
                break;
                case 'Approved':
                backgroundColor = 'rgba(97, 158, 234, 0.15)';
                color = '#497BF3';
                break;
                case 'Initiated':
                backgroundColor = 'rgba(41, 196, 153, 0.08)';
                color = '#139660';
                break;
                case 'Cancelled':
                backgroundColor = 'rgba(255, 0, 0, 0.08)';
                color = '#FF0000';
                break;
                case 'Complete':
                backgroundColor = 'rgba(41, 196, 153, 0.08)';
                color = '#06242D';
                break;
                default:
                color= '#FF8938';
                backgroundColor = 'rgba(255, 221, 0, 0.3)';
            }
            return color;
        }
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
  