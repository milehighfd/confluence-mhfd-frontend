import * as moment from 'moment';
import * as d3 from 'd3';

const widthofDiv: any = document.getElementById('widthDivforChart')?.offsetWidth;
const barHeight = 27;
class ScheduleChart {

  ref: any;
  chartId: any;
  datas: any;
  colorScale: any;
  svg: any;

  width = widthofDiv - 20;
  //height = 25 + (barHeight + 10.5) * (this.datas.length + 1);

  constructor(
    ref: any,
    chartId: any,

  ){
    this.ref = ref;
    this.chartId = chartId;
  }

}
export default ScheduleChart;