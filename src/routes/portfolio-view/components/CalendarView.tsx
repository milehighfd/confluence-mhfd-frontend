import React, { useEffect, useState } from 'react';
import moment, { months } from 'moment';
import * as d3 from 'd3';
import {
  Button,
  Calendar,
  Checkbox,
  Col,
  Input,
  Layout,
  message,
  Popover,
  Progress,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tabs,
  Tag,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  FormOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import ModalTollgate from 'routes/list-view/components/ModalTollgate';
import PineyView from './PineyView';

const { Step } = Steps;
const CalendarView = ({
  openTable,
  moveSchedule,
  scheduleRef,
  searchRef,
}: {
  openTable: boolean[];
  moveSchedule: number;
  scheduleRef: React.MutableRefObject<HTMLDivElement | null>;
  searchRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const [current, setCurrent] = useState(0);
  const [openPiney, setOpenPiney] = useState(false);
  const [svgState, setSvgState] = useState<any>();
  const [zoomStatus, setZoomStatus] = useState(0);
  const [currentZScale, setCurrentZScale] = useState(4);
  // const svgRef = useRef<SVGSVGElement>(null);
  const [zoomedState, setZoomedState] = useState<any>();
  const [isZoomToday, setIsZoomToday] = useState<any>(false);
  const [isZoomWeekly, setIsZoomWeekly] = useState<any>(false);
  const [isZoomMonthly, setIsZoomMonthly] = useState<any>(false);
  const [zoomSelected, setZoomSelected] = useState('Monthly');
  const [actionItemsState, setActionItemsState] = useState({
    draft: true,
    sign: false,
    request: false,
    send: false,
    pay: false,
  });
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const colorScale: any = {
    completed: '#5E5FE2',
    active: '#047CD7',
    notStarted: '#D4D2D9',
    delayed: '#F5575C',
  };
  let rawData = [
    {
      id: 'Tittle0',
      date: moment('2022/08/11'),
      schedule: [],
    },
    {
      id: 'Centennial1',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 100059,
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
        },
        {
          objectId: 100059,
          categoryNo: 5,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/17 10:00:00'),
          status: 'completed',
          name: 'Start Up',
        },
        {
          objectId: 100059,
          categoryNo: 1,
          from: moment('2022/06/22 07:30:00'),
          to: moment('2022/07/01 08:30:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 100059,
          categoryNo: 4,
          from: moment('2022/08/18 08:30:00'),
          to: moment('2022/11/10 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
    {
      id: 'Centennial2',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 8905,
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/24 07:00:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 8905,
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/09/08 10:00:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 8905,
          categoryNo: 1,
          from: moment('2022/07/25 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Initial Funding',
        },
        {
          objectId: 8905,
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'completed',
          name: 'Consultant Procurement',
        },
      ],
    },
    {
      id: 'Centennial3',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31599,
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31599,
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31599,
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31599,
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Centennial4',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 98000,
          categoryNo: 0,
          from: moment('2022/07/11 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'active',
          name: 'Substantial Completion',
        },
        {
          objectId: 98000,
          categoryNo: 5,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/08/29 10:00:00'),
          status: 'active',
          name: 'Closed',
        },
        {
          objectId: 98000,
          categoryNo: 1,
          from: moment('2022/07/22 07:30:00'),
          to: moment('2022/08/10 08:30:00'),
          status: 'notStarted',
          name: 'Construction',
        },
        {
          objectId: 98000,
          categoryNo: 4,
          from: moment('2022/06/24 08:30:00'),
          to: moment('2022/07/10 10:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
      ],
    },
    {
      id: 'Centennial5',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 189990,
          categoryNo: 0,
          from: moment('2022/07/01 00:00:00'),
          to: moment('2022/07/20 07:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
        {
          objectId: 189990,
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/10/02 10:00:00'),
          status: 'active',
          name: 'Start-Up ',
        },
        {
          objectId: 189990,
          categoryNo: 1,
          from: moment('2022/07/21 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Work Request',
        },
        {
          objectId: 189990,
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
    {
      id: 'Centennial6',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 6800,
          categoryNo: 0,
          from: moment('2022/07/27 00:00:00'),
          to: moment('2022/08/12 07:00:00'),
          status: 'active',
          name: 'Draft ',
        },
        {
          objectId: 6800,
          categoryNo: 1,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/28 10:00:00'),
          status: 'active',
          name: 'Work Request',
        },
        {
          objectId: 6800,
          categoryNo: 2,
          from: moment('2022/08/29 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 6800,
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Preliminary Design',
        },
      ],
    },
    {
      id: 'Centennial7',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 6810,
          categoryNo: 0,
          from: moment('2022/07/27 00:00:00'),
          to: moment('2022/08/12 07:00:00'),
          status: 'active',
          name: 'Draft ',
        },
        {
          objectId: 6810,
          categoryNo: 1,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/28 10:00:00'),
          status: 'active',
          name: 'Work Request',
        },
        {
          objectId: 6810,
          categoryNo: 2,
          from: moment('2022/08/29 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 6810,
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Preliminary Design',
        },
      ],
    },
    {
      id: 'Tittle2',
      date: moment('2022/08/11'),
      schedule: [],
    },
    {
      id: 'Commerce1',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 8915,
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/24 07:00:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 8915,
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/09/08 10:00:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 8915,
          categoryNo: 1,
          from: moment('2022/07/25 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Initial Funding',
        },
        {
          objectId: 8915,
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'completed',
          name: 'Consultant Procurement',
        },
      ],
    },
    {
      id: 'Commerce2',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31299,
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31299,
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31299,
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31299,
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Tittle3',
      date: moment('2022/08/11'),
      schedule: [],
    },
    {
      id: 'Denver1',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31589,
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31589,
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31589,
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31589,
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Denver2',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 98090,
          categoryNo: 0,
          from: moment('2022/07/11 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'active',
          name: 'Substantial Completion',
        },
        {
          objectId: 98090,
          categoryNo: 5,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/08/29 10:00:00'),
          status: 'active',
          name: 'Closed',
        },
        {
          objectId: 98090,
          categoryNo: 1,
          from: moment('2022/07/22 07:30:00'),
          to: moment('2022/08/10 08:30:00'),
          status: 'notStarted',
          name: 'Construction',
        },
        {
          objectId: 98090,
          categoryNo: 4,
          from: moment('2022/06/20 08:30:00'),
          to: moment('2022/07/10 10:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
      ],
    },
    {
      id: 'Denver3',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 181190,
          categoryNo: 0,
          from: moment('2022/07/01 00:00:00'),
          to: moment('2022/07/20 07:00:00'),
          status: 'notStarted',
          name: 'Work-Request',
        },
        {
          objectId: 181190,
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/10/02 10:00:00'),
          status: 'active',
          name: 'Start Up',
        },
        {
          objectId: 181190,
          categoryNo: 1,
          from: moment('2022/07/21 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Work Request',
        },
        {
          objectId: 181190,
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
  ];

  let datas = rawData.map((el: any) => {
    return {
      ...el,
      schedule: el.schedule
        .map((sch: any) => {
          return { ...sch, id: el.id };
        })
        .sort(function(a: any, b: any) {
          return a.from - b.from;
        }),
    };
  });
  let zoom: any;
  let svg: any;
  let xScale: any;
  let today = new Date();
  let widthofDiv: any = document.getElementById('widthDivforChart')?.offsetWidth;

  const timelineChart = (datasets: any) => {
    let barHeight = 27;
    let width = widthofDiv - 20,
      height = 25 + (barHeight + 10.5) * (datas.length + 1);
    svg = d3
      .select('#timeline-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    let dragablesLines = 'dragginglines';

    let padding = { top: 30, right: 10, bottom: 10, left: 0 };
    let offsetBar = 18;
    const dragableLineLength = 3;
    const dragableLineHalf = dragableLineLength / 2;

    let leftLine: any;
    let rightLine: any;
    let counterDataForChart: number = 0;
    datasets.forEach((sch: any) => {
      if (sch.schedule.length !== 0) {
        counterDataForChart++;
      }
    });
    if (counterDataForChart !== 0) {
      let fromData = datasets
        .map((ds: any) => ds.schedule)
        .flat()
        .sort(function(a: any, b: any) {
          return a.from - b.from;
        });
      let toData = datasets
        .map((ds: any) => ds.schedule)
        .flat()
        .sort(function(a: any, b: any) {
          return a.to - b.to;
        });
      let timelineStartTime = moment(fromData[0].from.startOf('month')).subtract(6, 'months');
      let timelineEndTime = moment(toData[toData.length - 1].to)
        .add(6, 'months')
        .startOf('month');
      // let timelineStartTimeForYears = moment(fromData[0].from.startOf('year')).subtract(1, 'years');
      // let timelineEndTimeForYears = moment(toData[toData.length - 1].to).add(1, 'years').startOf('year');
      let widhtDiv: any = document.getElementById('widthDivforChart')?.offsetWidth;
      width = widhtDiv - 3;

      let backgroundRects = svg
        .append('g')
        .append('rect')
        .attr('y', (d: any) => 150)
        .attr('height', (d: any) => barHeight)
        .attr('x', (d: any) => 0)
        .attr('width', (d: any) => width)
        .attr('class', 'backgroundRecthidden');
      xScale = d3
        .scaleTime()
        .domain([timelineStartTime, timelineEndTime])
        .range([padding.left, width - padding.right]);

      let yScale = d3
        .scaleBand()
        .domain(datasets.map((d: any) => d.id))
        .range([padding.top + 5, height - padding.bottom]);

      let chartHeight = height - padding.top - padding.bottom;
      let timeFormatterForYears: any = d3.timeFormat('%Y');
      let timeFormatterForMonths: any = d3.timeFormat('%b');
      let timeFormatterForDays: any = d3.timeFormat('%d');
      let tickFormatEmpty: any = '';
      let xAxisYear = d3
        .axisTop(xScale)
        .tickSize(-chartHeight + 100)
        .ticks(d3.timeYear.every(1))
        .tickFormat(timeFormatterForYears);

      let xAxisMonth = d3
        .axisTop(xScale)
        .ticks(d3.timeMonth.every(1))
        .tickSize(-chartHeight)
        .tickFormat(timeFormatterForMonths);

      let xAxisDay = d3
        .axisTop(xScale)
        .ticks(d3.timeDay.every(1))
        .tickSize(-chartHeight)
        .tickFormat(timeFormatterForDays);

      let yAxis = d3
        .axisLeft(yScale)
        .ticks(12)
        .tickSize(width)
        .tickFormat(tickFormatEmpty);

      let gX = svg
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
        .attr('class', 'topHeader')
        .call(xAxisDay);

      let gX1 = svg
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
        .attr('class', 'topHeaderMonth')
        .call(xAxisMonth);

      let gX2 = svg
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + (padding.top - 15) + ')')
        .attr('class', 'topHeaderYear')
        .call(xAxisYear);

      let scheduleG = svg
        .append('g')
        .selectAll('g')
        .data(datasets)
        .enter()
        .append('g')
        .attr('class', 'jurisdiction')
        .selectAll()
        .data((d: any) => {
          return d.schedule;
        });

      let todayline = scheduleG
        .join('line')
        .attr('x1', function() {
          return xScale(today);
        })
        .attr('y1', padding.top -20)
        .attr('x2', function() {
          return xScale(today);
        })
        .attr('y2', height + padding.top - padding.bottom)
        .style('stroke-dasharray', 5.5)
        .style('stroke-width', 2)
        .style('stroke', '#047CD7')
        .style('fill', 'none');

        let todayCircle = scheduleG.join("circle")
      .attr("cx", function() {
        return xScale(today);
      })
      .attr("cy", padding.top -20)
      .attr("r", 5)
      .style("fill", '#047CD7')

      let scheduleRects = scheduleG
        .join('rect')
        .attr('id', function(d: any) {
          return `${d.id}_${d.categoryNo}`;
        })
        .attr('class', 'stackedbar')
        .attr('rx', 12)
        .attr('ry', 12)
        .attr('x', function(d: any) {
          return xScale(d['from']);
        })
        .attr('y', function(d: any) {
          return yScale(d['id']);
        })
        .attr('width', function(d: any) {
          let xScaleTo: any = xScale(d['to']);
          let xScaleFrom: any = xScale(d['from']);
          return xScaleTo - xScaleFrom;
        })
        .attr('height', barHeight)
        .attr('fill', function(d: any) {
          return colorScale[d.status];
        });

      let scheduleRectsCenter = scheduleG
        .join('rect')
        .attr('id', function(d: any) {
          return `${d.id}_${d.categoryNo}_center`;
        })
        .attr('class', 'stackedbarCenter')
        .attr('x', function(d: any) {
          return xScale(d['from']);
        })
        .attr('y', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + 1;
        })
        .attr('width', function(d: any) {
          let xScaleTo: any = xScale(d['to']);
          let xScaleFrom: any = xScale(d['from']);
          return xScaleTo - xScaleFrom;
        })
        .attr('height', barHeight - 2)
        .attr('fill', function(d: any) {
          return colorScale[d.status];
        });

      let rectNames = scheduleG
        .join('text')
        .attr('id', (d: any) => 'text_' + d.name.replace(/ +/g, '') + '_' + d.objectId)
        .attr('class', 'labels')
        .style('fill', 'white')
        .style('font-size', 12)
        .attr('x', function(d: any) {
          return xScale(d['from']);
        })
        .attr('y', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + yScale.bandwidth() / 2;
        })
        .attr('width', function(d: any) {
          let xScaleTo: any = xScale(d['to']);
          let xScaleFrom: any = xScale(d['from']);
          return xScaleTo - xScaleFrom;
        })
        .text((d: any) => d.name);

      let dragableLineLeft = scheduleG
        .join('g')
        .attr('class', dragablesLines)
        .attr('id', (d: any) => {
          return `${d.id}_${d.categoryNo}_left`;
        });
      let dragableLineRight = scheduleG
        .join('g')
        .attr('class', dragablesLines)
        .attr('id', (d: any) => `${d.id}_${d.categoryNo}_right`);

      let h = yScale.bandwidth();
      leftLine = dragableLineLeft
        .append('line')
        .attr('id', function(d: any) {
          return `${d.id}_${d.categoryNo}_left`;
        })
        .attr('class', 'dragginglines')
        .attr('x1', function(d: any) {
          let xScaleFrom: any = xScale(d['from']);
          return xScaleFrom - dragableLineHalf + 3;
        })
        .attr('x2', function(d: any) {
          let xScaleFrom: any = xScale(d['from']);
          return xScaleFrom - dragableLineHalf + 3;
        })
        .attr('y1', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + h;
        })
        .attr('y2', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + h + 8;
        });

      rightLine = dragableLineRight
        .append('line')
        .attr('id', function(d: any) {
          return `${d.id}_${d.categoryNo}_right`;
        })
        .attr('class', 'dragginglines')
        .attr('x1', function(d: any) {
          let xScaleTo: any = xScale(d['to']);
          return xScaleTo - dragableLineHalf - 3;
        })
        .attr('x2', function(d: any) {
          let xScaleTo: any = xScale(d['to']);
          return xScaleTo + dragableLineHalf - 3;
        })
        .attr('y1', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + h - 2;
        })
        .attr('y2', function(d: any) {
          let yScaleId: any = yScale(d['id']);
          return yScaleId + h + 8;
        });

      let zoomedXScale = xScale;
      let calctodayX = function(d: any) {
        return zoomedXScale(today);
      };
      let calcScheduleX = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        return zoomedXScaleFrom;
      };
      let calcScheduleXInner = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        return zoomedXScaleFrom + 12;
      };
      let calcScheduleXCenter = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        return zoomedXScaleFrom + offsetBar;
      };
      let calcScheduleWidth = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        let zoomedXScaleTo: any = zoomedXScale(d['to']);
        return zoomedXScaleTo - zoomedXScaleFrom;
      };
      let calcScheduleWidthInner = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        let zoomedXScaleTo: any = zoomedXScale(d['to']);
        let widthcenter = zoomedXScaleTo - zoomedXScaleFrom - 24;
        return widthcenter >= 0 ? widthcenter : 0;
      };
      let calcLeftXLine = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        return zoomedXScaleFrom - dragableLineHalf + 8;
      };
      let calcScheduleWidthText = function(d: any) {
        let zoomedXScaleFrom: any = zoomedXScale(d['from']);
        let zoomedXScaleTo: any = zoomedXScale(d['to']);
        return zoomedXScaleTo - zoomedXScaleFrom - 1;
      };
      let calcRightXLine = function(d: any) {
        let zoomedXScaleTo: any = zoomedXScale(d['to']);
        return zoomedXScaleTo - dragableLineHalf - 6;
      };

      let makeRoundTime = function(time: any) {
        let roundDaysStr = ('0' + String(Math.round(time.minute() / 5) * 5)).slice(-2);
        if (roundDaysStr === '60') {
          roundDaysStr = '00';
          time.add(1, 'hours');
        }
        return moment(time.format('YYYY/MM/DD HH:' + roundDaysStr.slice(-2) + ':00'));
      };
      let dragStartLines = function(this: any, d: any) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this as any)
          .classed('dragging', true)
          .style('opacity', 1);
      };
      let dragStart = function(this: any, d: any) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed('dragging', true);
      };
      let dragEndRect = function(this: any, d: any) {
        d['from'] = makeRoundTime(d['from']);
        d['to'] = makeRoundTime(d['to']);
        d3.select(this)
          .classed('dragging', false)
          .attr('x', calcScheduleX)
          .attr('width', calcScheduleWidth);
        updateRects();
      };
      let rectDrag = d3
        .drag()
        .on('start', dragStart)
        .on('drag', function(d: any) {
          console.log('draggg');
          let newPosition = d3.event.dx;
          let between = d['to'].diff(d['from'], 'days');
          let fromTime = moment(zoomedXScale.invert(zoomedXScale(d['from']) + newPosition));
          let toTime = moment(fromTime).add(between, 'days');

          if (timelineStartTime.diff(fromTime) > 0) return;
          else if (timelineEndTime.diff(toTime) < 0) return;

          d['from'] = fromTime;
          d['to'] = toTime;
          d3.select(this).attr('x', calcScheduleX);
          moveOtherRects(newPosition, d.categoryNo, d.id);
          updateRects();
        })
        .on('end', dragEndRect);
      let moveOtherRects = function(moveX: any, dataId: any, groupId: any) {
        let currentDataset = datasets.filter((d: any) => d.id === groupId)[0];
        currentDataset.schedule.forEach((sch: any) => {
          if (sch.categoryNo !== dataId) {
            let fromTime = moment(zoomedXScale.invert(zoomedXScale(sch['from']) + moveX));
            let between = sch['to'].diff(sch['from'], 'days');
            let toTime = moment(fromTime).add(between, 'days');
            sch['from'] = fromTime;
            sch['to'] = toTime;
          }
        });
      };

      let moveOtherRectsByDirection = function(moveX: any, dataId: any, direction: any, groupId: any) {
        let currentDataset = datasets.filter((d: any) => d.id === groupId)[0];
        let indexOfCurrent = currentDataset.schedule.findIndex((sch: any) => sch.categoryNo === dataId);
        let init = 0;
        let end = indexOfCurrent;
        if (!direction) {
          init = indexOfCurrent + 1;
          end = currentDataset.schedule.length;
        }
        for (let i = init; i < end; ++i) {
          let sch = currentDataset.schedule[i];
          let fromTime = moment(zoomedXScale.invert(zoomedXScale(sch['from']) + moveX));
          let between = sch['to'].diff(sch['from'], 'days');
          let toTime = moment(fromTime).add(between, 'days');
          sch['from'] = fromTime;
          sch['to'] = toTime;
        }
      };

      let lineDragFunction = function(this: any, d: any) {
        let isLeftLine = d3
          .select(this)
          .attr('id')
          .includes('left');
        let fromTime;
        let between;
        let toTime;
        let newPosition = d3.event.dx;
        let moveOthers = true;
        if (isLeftLine) {
          fromTime = moment(zoomedXScale.invert(zoomedXScale(d['from']) + newPosition));
          between = d['to'].diff(fromTime, 'days');
          if (between < 3) {
            fromTime = d['to'].diff(3, 'days');
            between = d['to'].diff(fromTime, 'days');
          }
          toTime = moment(fromTime).add(between, 'days');
          if (timelineStartTime.diff(fromTime) > 0) return;
          else if (timelineEndTime.diff(toTime) < 0) return;
          d['from'] = fromTime;
        } else {
          toTime = moment(zoomedXScale.invert(zoomedXScale(d['to']) + newPosition));
          between = d['from'].diff(toTime, 'days');
          if (between > -3) {
            toTime = moment(d['from']).add(3, 'days');
            between = d['from'].diff(toTime, 'days');
            moveOthers = false;
          }
          fromTime = moment(toTime).add(between, 'days');
          if (timelineStartTime.diff(toTime) > 0) return;
          else if (timelineEndTime.diff(fromTime) < 0) return;
          d['to'] = toTime;
        }
        if (moveOthers) {
          moveOtherRectsByDirection(newPosition, d.categoryNo, isLeftLine, d.id);
        }
        updateRects();
      };
      let dragEndLines = function(this: any, d: any) {
        d3.select(this).classed('dragging', false);
      };

      let lineDrag = d3
        .drag()
        .on('start', dragStartLines)
        .on('drag', lineDragFunction)
        .on('end', dragEndLines);

      scheduleRects.style('cursor', 'move').call(rectDrag);
      scheduleRectsCenter.style('cursor', 'move').call(rectDrag);
      dragableLineLeft
        .style('cursor', 'ew-resize')
        .style('stroke-linecap', 'round')
        .call(lineDrag);
      dragableLineRight
        .style('cursor', 'ew-resize')
        .style('stroke-linecap', 'round')
        .call(lineDrag);

      const dotme = (text: any) => {
        text.each((d: any) => {
          const completeLabel = `${d['name']}`;
          const idText = 'text_' + d['name'].replace(/ +/g, '') + '_' + d.objectId;
          const textElem: any = d3.select(`#${idText}`);
          const rectElem = d3.select(`#${d.id}_${d.categoryNo}`);
          const padding = 15;
          const rectElemWidth: any = rectElem.attr('width');
          const totalWidth = rectElemWidth - padding;
          textElem.text(completeLabel);
          let it = 1;
          if (totalWidth < 25) {
            textElem.text('');
          } else {
            if (textElem.node()?.getComputedTextLength() > totalWidth - padding) {
              while (textElem.node()?.getComputedTextLength() > totalWidth - padding && it < completeLabel.length) {
                textElem.text(completeLabel.slice(0, -it) + '...');
                it++;
              }
            }
          }
        });
      };

      let updateRects = function() {
        todayline.attr('x1', calctodayX);
        todayline.attr('x2', calctodayX);
        todayCircle.attr('cx', calctodayX);
        scheduleRects.attr('x', calcScheduleX).attr('width', calcScheduleWidth);
        scheduleRectsCenter.attr('x', calcScheduleXInner).attr('width', calcScheduleWidthInner);
        rectNames.attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
        leftLine.attr('x1', calcLeftXLine).attr('x2', calcLeftXLine);
        d3.selectAll('.labels').call(dotme);

        let h = yScale.bandwidth() - barHeight;
        leftLine
          .attr('x1', calcLeftXLine)
          .attr('x2', calcLeftXLine)
          .attr('y1', (d: any) => {
            let yScaleId: any = yScale(d['id']);
            return yScaleId + h;
          })
          .attr('y2', (d: any) => {
            let yScaleId: any = yScale(d['id']);
            return yScaleId + h + 13;
          });
        rightLine
          .attr('x1', calcRightXLine)
          .attr('x2', calcRightXLine)
          .attr('y1', (d: any) => {
            let yScaleId: any = yScale(d['id']);
            return yScaleId + h;
          })
          .attr('y2', (d: any) => {
            let yScaleId: any = yScale(d['id']);
            return yScaleId + h + 13;
          });
      };
      scheduleRectsCenter.on('click', function() {
        setOpenPiney(true);
        d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
        d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');

        d3.select(`#${d3.event.target.id.slice(0, -7)}_right`).attr('class', 'dragginglinesonclick');
        d3.select(`#${d3.event.target.id.slice(0, -7)}_left`).attr('class', 'dragginglinesonclick');
        if (d3.event.target.id.includes('center')) {
          d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbarClicked');
        } else {
          d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');
        }
        backgroundRects.attr('y', (d: any) => d3.event.target.y.animVal.value).attr('class', 'backgroundRectvisible');
        d3.event.stopPropagation();
      });
      scheduleRects.on('click', function() {
        setOpenPiney(true);
        d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
        d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');

        d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');

        d3.select(`#${d3.event.target.id}_right`).attr('class', 'dragginglinesonclick');
        d3.select(`#${d3.event.target.id}_left`).attr('class', 'dragginglinesonclick');

        backgroundRects.attr('y', (d: any) => d3.event.target.y.animVal.value).attr('class', 'backgroundRectvisible');
        d3.event.stopPropagation();
      });
      svg.on('click', function() {
        setOpenPiney(false);
        d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');
        d3.selectAll('.backgroundRectvisible').attr('class', 'backgroundRecthidden');
        if (d3.event.target.id.includes('center')) {
          d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
        } else {
          d3.select('.stackedbarClicked').attr('class', 'stackedbar');
        }
      });

      let YearsToPixels = function(years: any) {
        let d1 = new Date();
        let firstvalue: any = zoomedXScale(d3.timeYear.offset(d1, years));
        let secondvalue: any = zoomedXScale(d1);
        return firstvalue - secondvalue;
      };
      let MonthsToPixels = function(months: any) {
        let d1 = new Date();
        let firstvalue: any = zoomedXScale(d3.timeMonth.offset(d1, months));
        let secondvalue: any = zoomedXScale(d1);
        return firstvalue - secondvalue;
      };
      let DaysToPixels = function(days: any) {
        let d1 = new Date();
        let firstvalue: any = zoomedXScale(d3.timeDay.offset(d1, days));
        let secondvalue: any = zoomedXScale(d1);
        return firstvalue - secondvalue;
      };
      let adjustTextLabelsYears = function() {
        d3.selectAll('.topHeaderYear text').attr('transform', 'translate(' + YearsToPixels(1) / 2 + ',0)');
      };
      let adjustTextLabelsMonths = function() {
        d3.selectAll('.topHeaderYear text').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
        d3.selectAll('.topHeaderYear line').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
      };
      let adjustTextLabelsMonths2 = function() {
        d3.selectAll('.topHeader text').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
      };
      let adjustTextLabelsDays = function() {
        d3.selectAll('.topHeader text').attr('transform', 'translate(' + DaysToPixels(1) / 2 + ',0)');
      };

      //console.log(currentZScale); //d3.selectAll('.topHeaderMonth text').attr('transform','translate('+));
      let zoomed = function() {
        setCurrentZScale(d3.event.transform.k);
        zoomedXScale = d3.event.transform.rescaleX(xScale);
        if (d3.event.transform.k < 9) {
          gX.call(xAxisMonth.scale(zoomedXScale)).call(adjustTextLabelsMonths2);
          gX1.call(xAxisMonth.scale(zoomedXScale));
          gX2.call(xAxisYear.scale(zoomedXScale)).call(adjustTextLabelsYears);
        } else {
          gX.call(xAxisDay.scale(zoomedXScale)).call(adjustTextLabelsDays);
          gX2.call(xAxisMonth.scale(zoomedXScale)).call(adjustTextLabelsMonths);
          gX1.call(xAxisMonth.scale(zoomedXScale));
        }
        updateRects();
      };

      zoom = d3
        .zoom()
        .scaleExtent([0.5, 30])
        .translateExtent([
          [0, 0],
          [width, 0],
        ])
        .on('zoom', zoomed);
      svg.call(zoom).on('wheel.zoom', null);
      svg.call(zoom.scaleBy, currentZScale);

      const moveZoom = (newZoomValue: any) => {
        let type: any;
        if (zoomStatus > newZoomValue) {
          type = 'in';
        } else {
          type = 'out';
        }
        if (zoomStatus === newZoomValue) {
        } else {
          console.log('working', type);
          const adder = type === 'in' ? 1.4 : 0.7;
          svg.transition().call(zoom.scaleBy, adder);
          setZoomStatus(newZoomValue);
        }
      };
      moveZoom(moveSchedule);
      if (isZoomToday) {
        zoom.translateTo(svg, xScale(today), 0);
        zoom.scaleTo(svg, 30);
        //  zoom.translateTo(svg, 0.9 * width, 0.5 *height)
        setIsZoomToday(false);
      }
      if (isZoomWeekly) {
        // svg
        // .transition().call(zoom.scaleBy, 18);
        zoom.scaleTo(svg, 11);
        zoom.translateTo(svg, 0.9 * width, 0.5 * height);
        setIsZoomWeekly(false);
      }
      if (isZoomMonthly) {
        // svg
        // .transition().call(zoom.scaleBy, 18);
        zoom.scaleTo(svg, 4);
        zoom.translateTo(svg, 0.9 * width, 0.5 * height);
        setIsZoomMonthly(false);
      }
    }
  };

  const zoomToToday = () => {
    console.log(svg);
    console.log(zoom);
    if(zoom && svg){
      zoom.translateTo(svg, xScale(today), 0);
      zoom.scaleTo(svg, 11);
    }
  }
  useEffect(() => {
    timelineChart(datas);
    setSvgState(svg);
   //setZoomedState(zoom);

  }, []);

  useEffect(() => {
    if (svgState) {
      const removeAllChildNodes = (parent: any) => {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      };
      const removechart: any = document.getElementById('timeline-chart');
      removeAllChildNodes(removechart);
      if (!openTable[0]) {
        datas = datas.filter(function(el) {
          return !el.id.includes('Centennial');
        });
      }
      if (!openTable[1]) {
        datas = datas.filter(function(el) {
          return !el.id.includes('Commerce');
        });
      }
      if (!openTable[2]) {
        datas = datas.filter(function(el) {
          return !el.id.includes('Denver');
        });
      }
      timelineChart(datas);
    }
  }, [openTable, moveSchedule, isZoomToday, isZoomWeekly, isZoomMonthly]);

  // useEffect(()=> {
  //   if(moveSchedule === 'in' || moveSchedule === 'out'){
  //     moveZoom(moveSchedule)
  //   }
  // },[moveSchedule])
  let heightOfList = document.getElementById('searchPortfolio')?.offsetHeight;

  // const moveZoom = (testt: string)=>{
  //   console.log(testt);
  // }

  return (
    <div className="calendar-body" id="widthDivforChart">
      {openPiney && <PineyView setOpenPiney={setOpenPiney} />}
      <Row>
        {/* <Col xs={{ span: 10 }} lg={{ span: 12 }} style={openPiney ? {textAlign:'end', paddingRight:'1px'} : {textAlign:'end', paddingRight:'0px'}}> */}
        <div
          style={
            openPiney
              ? { textAlign: 'end', paddingRight: '300px', width: '100%' }
              : { textAlign: 'end', paddingRight: '0px', width: '100%' }
          }
        >
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'initial', paddingLeft: '10px'}}>
          <Button
            className={zoomSelected=== 'Today' ? "btn-view btn-view-active": "btn-view"}
            
            onClick={() => {zoomToToday(); setZoomSelected('Today')}}
          >
            Today
          </Button>
          <span style={{marginRight:'0px', color:'#11093c', opacity:0.6}}> |</span>
          <Button
            className={zoomSelected=== 'Weekly' ? "btn-view btn-view-active": "btn-view"}
            
            onClick={() => {setIsZoomWeekly(true); setZoomSelected('Weekly')}}
          >
            Weekly
          </Button>
          <span style={{marginRight:'0px', color:'#11093c', opacity:0.6}}> |</span>
          <Button
            className={zoomSelected=== 'Monthly' ? "btn-view btn-view-active": "btn-view"}
            
            onClick={() => {setIsZoomMonthly(true); setZoomSelected('Monthly')}}
          >
            Monthly
          </Button>
          </Col>
        </div>
        {/* </Col> */}
      </Row>
      <div
        id="chartContainer"
        style={{ height: heightOfList, overflowY: 'auto' }}
        ref={scheduleRef}
        onScroll={(e: any) => {
          let dr: any = scheduleRef.current;
          if (searchRef.current) {
            searchRef.current.scrollTo(0, dr.scrollTop);
          }
        }}
      >
        <div>
          <div id="timeline-chart" />
          {/* <img src="/picture/Maps.png" alt="" width="100%" onClick={() => {setOpenPiney(true)}}/>*/}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
