import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs, Table } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import { AllHeaderTable, AllValueTable, CIPHeaderTable, CIPValueTable, DIPHeaderTable, DIPValueTable, PlanningHeaderTable, PlanningValueTable, PropertyAcquisitionHeaderTable, PropertyAcquisitionValueTable, RDHeaderTable, RDValueTable, RestorationHeaderTable, RestorationValueTable } from "../constants/tableHeader";
import { getCurrentProjectStatus, getServiceAreas, getStreams, getTotalEstimatedCost } from "utils/parsers";
import * as d3 from 'd3';
import moment from "moment";
import { colorScale } from "../constants/PhaseViewData";
import { LIMIT_PAGINATION } from "../../../constants/constants";
import { usePortflioState } from '../../../hook/portfolioHook';
import store from '../../../store';


const { TabPane } = Tabs;
const { Panel } = Collapse;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const CalendarBody = ({
  groupCollapsed,
  dataId,
  tabKey,
  next,
  prev,
  setNext,
  setPrev,
  openTable,
  setOpenTable,
  index,
  divRef,
  searchRef,
  tableRef,
  totalLabelWidth,
  scheduleList,
  phaseList,
  statusCounter,
  setTollData,
  setOpenModalTollgate,
  actionsDone,
  userBrowser,
  setOpenPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  moveSchedule,
  scheduleRef,
  groupName,
  isZoomToday,
  setIsZoomToday,
  isZoomWeekly,
  setIsZoomWeekly,
  isZoomMonthly,
  setIsZoomMonthly,
  zoomTimeline,
  setZoomTimeline,
  editData,
  setEditData,
  zoomSelected,
  setZoomSelected,
  setPopUpData,
  filterPagination,
  setFilterPagination,
  updatedGroup,
  secondaryUpdatedGroup,
  updateFavorites,
  setUpdateFavorites,
  counter,
  page,
  setPage,
}: {
  groupCollapsed: any,
  dataId: any,
  tabKey: any,
  next: boolean,
  prev: boolean,
  setNext: Function,
  setPrev: Function,
  openTable: any,
  setOpenTable: Function,
  index: number,
  divRef: any,
  searchRef: any,
  tableRef: any,
  totalLabelWidth: number,
  scheduleList: any,
  phaseList: any,
  statusCounter: any,
  setTollData: Function,
  setOpenModalTollgate: Function,
  actionsDone: any,
  userBrowser: any,
  setOpenPiney: Function,
  setGrapphicOpen: Function,
  setPositionModalGraphic: Function,
  setDataModal: Function,
  moveSchedule: Function,
  scheduleRef: any,
  groupName: string,
  isZoomToday: any,
  setIsZoomToday: any,
  isZoomWeekly: any,
  setIsZoomWeekly: any,
  isZoomMonthly: any,
  setIsZoomMonthly: any,
  zoomTimeline: any,
  setZoomTimeline: any,
  editData: any,
  setEditData: any,
  zoomSelected: any,
  setZoomSelected: any,
  setPopUpData: Function,
  filterPagination: any,
  setFilterPagination: Function,
  updatedGroup: any,
  secondaryUpdatedGroup: any,
  updateFavorites: any,
  setUpdateFavorites: Function,
  counter:  never[],
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {
  const appUser = store.getState().profile;
  const email = appUser.userInformation?.email;

  const { currentGroup } = usePortflioState();

  // const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [updateFavorite, setUpdateFavorite] = useState(false);
  const [dataBody, setDataBody] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [calendarData, setCalendarData] = useState<any>([]);
  const [svgStatePhase, setSvgStatePhase] = useState<any>();
  // const [editData,setEditData] = useState<any>({});
  const [currentZScale, setCurrentZScale] = useState(7.5);

  const [zoomStatus, setZoomStatus] = useState(0);
  // const [isZoomToday, setIsZoomToday] = useState<any>(false);
  // const [isZoomWeekly, setIsZoomWeekly] = useState<any>(false);
  // const [isZoomMonthly, setIsZoomMonthly] = useState<any>(false);
  // const [zoomSelected, setZoomSelected] = useState('Today');
  const [fromData,setFromData] = useState<any>([]);
  const [toData,setToData] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [agrupationData, setAgrupationData] = useState<any>([]);
  const [svgState, setSvgState] = useState<any>();
  const [svgAxisState, setSvgAxisState] = useState<any>();
  const [resultCounter, setResultCounter] = useState<any>(0);
  const [updateForDates, setUpdateForDates] = useState<any>(false);

  const windowHeight: any = window.innerHeight;
  const windowWidth: any = window.innerWidth;
  let panInit=0;
  let limitPage = Number(counter) % 20 > 0 ?  Math.floor(Number(counter) / 20 + 1) : Number(counter) / 20;
  let zoom: any;
  let svg: any;
  let svgAxis: any;
  let xScale: any;
  let zoomedXScale: any;
  let zoomed: any;
  let zoomfortoday: any
  let today = new Date();
  let widthofDiv: any = document.getElementById('widthDivforChart')?.offsetWidth;
  let heightOfList: any = document.getElementById('searchPortfolio')?.offsetHeight;
  let chartheaderHeight: any = document.getElementById('timeline-chart-axis')?.offsetHeight;
  let zoomButtonsHeight: any = document.getElementById('zoomButtons')?.offsetHeight;
  let heightt =heightOfList - 47 - 32- 10;
  let hasDateData = true;
  let marginReducerHeaderAxis =
    (windowWidth >= 3001 && windowWidth <= 3999 ? '-5.3px' :
      (windowWidth >= 2550 && windowWidth <= 3000 ? '-5.9px' :
        (windowWidth >= 1450 && windowWidth <= 1500 ? '-5.9px' :
          (windowWidth >= 1501 && windowWidth <= 1700 ? '-5.9px' :
            (windowWidth >= 2001 && windowWidth <= 2549 ? '-5.9px' :
              (windowWidth >= 1199 && windowWidth <= 1449 ? '-5.9px' : '-5.9px'))))));
  let factortransformSVG = 
  (windowWidth >= 3001 && windowWidth <= 3999 ? 8 : 
    (windowWidth >= 2550 && windowWidth <= 3000 ? 8 : 
      (windowWidth >= 1450 && windowWidth <= 2000 ? 8 : 
        (windowWidth >= 2001 && windowWidth <= 2549 ? 8 : 
          (windowWidth >= 1199 && windowWidth <= 1449 ? 8 : 8)))));
  let heigthOfHeaderAxis =
    (windowWidth >= 3001 && windowWidth <= 3999 ? 60:
      (windowWidth >= 2550 && windowWidth <= 3000 ? 70 :
        (windowWidth >= 1450 && windowWidth <= 1500 ? 93.06 :
          (windowWidth >= 1501 && windowWidth <= 2000 ? 50 :
            (windowWidth >= 2001 && windowWidth <= 2549 ? 100 :
              (windowWidth >= 1199 && windowWidth <= 1449 ? 50 : 79))))));
  let separationHeaderAxisYear = (windowWidth >= 3001 && windowWidth <= 3999 ? 3 : (windowWidth >= 2550 && windowWidth <= 3000 ? 6 : (windowWidth >= 1450 && windowWidth <= 2000 ? 0 : (windowWidth >= 2001 && windowWidth <= 2549 ? 0 : (windowWidth >= 1199 && windowWidth <= 1449 ? 0 : 0)))));
  let separationHeaderAxisMonth = (windowWidth >= 3001 && windowWidth <= 3999 ? 10 : (windowWidth >= 2550 && windowWidth <= 3000 ? 13 : (windowWidth >= 1450 && windowWidth <= 2000 ? 0 : (windowWidth >= 2001 && windowWidth <= 2549 ? 0 : (windowWidth >= 1199 && windowWidth <= 1449 ? 0 : 0)))));
  let separationHeaderAxisInFunction = (windowWidth >= 3001 && windowWidth <= 3999 ? 20 : (windowWidth >= 2550 && windowWidth <= 3000 ? 25 : (windowWidth >= 1450 && windowWidth <= 2000 ? 20 : (windowWidth >= 2001 && windowWidth <= 2549 ? 20 : (windowWidth >= 1199 && windowWidth <= 1449 ? 20 : 20)))));
  let marginTopFactor = 
  (windowWidth >= 3001 && windowWidth <= 3999 ? '-55px' : 
  (windowWidth >= 2550 && windowWidth <= 3000 ? '-45px' : 
  (windowWidth >= 1450 && windowWidth <= 2000 ? '-40px' : 
  (windowWidth >= 2001 && windowWidth <= 2549 ? '-28px' : 
  (windowWidth >= 1199 && windowWidth <= 1449 ? '-45px' : '-45px')))));
  let barHeightDefault = (windowWidth >= 3001 && windowWidth <= 3999 ? 42 : (windowWidth >= 2550 && windowWidth <= 3000 ? 40 : (windowWidth >= 2001 && windowWidth <= 2549 ? 36 : (windowWidth >= 1450 && windowWidth <= 2000 ? 30 : (windowWidth >= 1199 && windowWidth <= 1449 ? 27 : 27)))));
  let width = widthofDiv - 20;
  let factorHeight = (windowWidth >= 3001 && windowWidth <= 3999 ? 250 : (windowWidth >= 2550 && windowWidth <= 3000 ? 162 : (windowWidth >= 2001 && windowWidth <= 2549 ? 259 : (windowWidth >= 1450 && windowWidth <= 2000 ? 180 : (windowWidth >= 1199 && windowWidth <= 1449 ? 21.55 : 21.5)))));
  let screenOffset = (windowWidth >= 3001 && windowWidth <= 3999 ? 24 : (windowWidth >= 2550 && windowWidth <= 3000 ? 12 : (windowWidth >= 2001 && windowWidth <= 2549 ? 64 : (windowWidth >= 1450 && windowWidth <= 2000 ? 6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 5 : 21.5)))));

  const gradientLinesClass = (svgDefinitions: any) => {
    let completedtoActive = svgDefinitions.append("linearGradient");
    completedtoActive
      .attr("id", "Done_Current")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    completedtoActive.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    completedtoActive.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#047CD7')

    let completedtoDelayed = svgDefinitions.append("linearGradient");
    completedtoDelayed
      .attr("id", "Current_NotStarted")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    completedtoDelayed.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#047CD7')
    completedtoDelayed.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let ActivetoNotStarted = svgDefinitions.append("linearGradient");
    ActivetoNotStarted
      .attr("id", "Overdue_NotStarted")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoNotStarted.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#F5575C')
    ActivetoNotStarted.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

  }

  useEffect(() => {        
    let idF = '';
    if(currentGroup === 'streams' && dataId.value !== ''){
      idF = dataId.value;
    }else{
      idF = dataId.id;
    }
    console.log(updatedGroup, secondaryUpdatedGroup, idF)
    if (idF === updatedGroup) {
      setUpdateForDates(!updateForDates);
    }
    if (idF === secondaryUpdatedGroup) {
      setUpdateForDates(!updateForDates);
    }
  }, [updatedGroup, secondaryUpdatedGroup])

  useEffect(() => {
    if (next && page < limitPage) {
      setPage(page + 1)
      setNext(false)
      setPrev(false)
    }
    if (prev && page > 1) {
      setPage(page - 1)
      setPrev(false)
      setNext(false)
    }
  }, [next, prev])

  useEffect(() => {
    datasets.getData(SERVER.FAVORITES, datasets.getToken()).then(result => {
      setFavorites(result);
    })
  }, [updateFavorite]);

  

  //Start of calendar generation
  const timelineChart = (datasets: any) => {
    if (Object.keys(scheduleList).length > 0 && Object.keys(datasets).length > 0) {
      let heightDiv: any = document.getElementsByClassName(`ant-collapse-header`);
      let barHeight = heightDiv[0].offsetHeight ? Math.ceil((heightDiv[0].offsetHeight) * 0.8) : barHeightDefault;
      let paddingBars = heightDiv[0].offsetHeight ? (heightDiv[0].offsetHeight - barHeight) : 12;
      let padding = { top: 38, right: 10, bottom: 10, left: -0 };
      let height = (heightDiv[0].offsetHeight * datasets.length) + padding.bottom + padding.top;
      // let height = (heightDiv[0].offsetHeight * 15) + padding.bottom + padding.top;
      const removechartAxis: any = document.getElementById('timeline-chart-axis');
      removeAllChildNodes(removechartAxis);
      if (svg) {
        svg.selectAll('*').remove();
        svgAxis.selectAll('*').remove();
      }

      svg = d3
        .select(`#timeline-chart-${groupName.replaceAll(' ', '')}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + 0 + ',' + (factortransformSVG) + ')')
      svgAxis = d3
        .select('#timeline-chart-axis')
        .append('svg')
        .attr('width', width)
        .attr('height', heigthOfHeaderAxis);

      let dragablesLines = 'dragginglines';

      let offsetBar = 18;
      const dragableLineLength = 3;
      const dragableLineHalf = dragableLineLength / 2;

      let leftLine: any;
      let rightLine: any;
      let counterDataForChart: number = 0;
      datasets.forEach((sch: any) => {
        if (scheduleList.length !== 0) {
          counterDataForChart++;
        }
      });

      if (counterDataForChart !== 0) {
        //Remove Null Values from Dates
        let endDates: any[] = []
        toData?.forEach((x: any) => {
          if (x?.to) {
            if ((x?.to).isValid()) {
              endDates.push(x?.to)
            }
          }
        });
        let monthsBehind = 85 //(moment(today).diff(moment(fromData[0]?.from?.startOf('month')), 'M')) || 12;
        let monthsAhead = 85 //(moment.max(endDates).diff(moment(today), 'M')) || 12;
        let timelineStartTime: any;
        let timelineEndTime: any;
        if (monthsAhead > monthsBehind) {
          timelineStartTime = moment(today).subtract(monthsAhead, 'months');
          timelineEndTime = moment(today)
            .add(monthsAhead, 'months')
            .startOf('month');
        } else {
          timelineStartTime = moment(today).subtract(monthsBehind, 'months');
          timelineEndTime = moment(today)
            .add(monthsBehind, 'months')
            .startOf('month');
        }
        
        // let timelineStartTime = moment(fromData[0].from.startOf('month')).subtract(12, 'months');
        // let timelineEndTime = moment(toData[toData.length - 1].to)
        //   .add(12, 'months')
        //   .startOf('month');     
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
          .range([padding.left, width - padding.right + 0]);
        let yScale = d3
          .scaleBand()
          .domain(datasets.map((d: any) => d.id))
          .range([padding.top, height - padding.bottom + screenOffset]);
        let chartHeight = height - padding.top - padding.bottom;
        let timeFormatterForYears: any = d3.timeFormat('%Y');
        let timeFormatterForMonths: any = d3.timeFormat('%B');
        let timeFormatterForDays: any = d3.timeFormat('%d');
        let tickFormatEmpty: any = '';
        let xAxisYear = d3
          .axisTop(xScale)
          .tickSize(-chartHeight + 100)
          .ticks(d3.timeYear.every(1))
          .tickFormat(tickFormatEmpty);

        let xAxisMonth = d3
          .axisTop(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickSize(-chartHeight)
          .tickFormat(tickFormatEmpty);

        let xAxisMonthMonthly = d3
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
          .attr('id', 'xDay')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top) + ')')
          .attr('class', 'topHeaderChart')
          .call(xAxisDay);

        let gX1 = svg
          .append('g')
          .attr('id', 'xMonth')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top) + ')')
          .attr('class', 'topHeaderMonthChart')
          .call(xAxisMonth);

        let gX2 = svg
          .append('g')
          .attr('id', 'xYear')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top) + ')')
          .attr('class', 'topHeaderYearChart')
          .call(xAxisYear);

        let gXa = svgAxis
          .append('g')
          .attr('id', 'xAxisDay')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top + separationHeaderAxisMonth) + ')')
          .attr('class', 'topHeader')
          .call(xAxisDay);

        let gX1a = svgAxis
          .append('g')
          .attr('id', 'xAxisMonth')
          .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
          .attr('class', 'topHeaderMonthforTicks')
          .call(xAxisMonth);

        let gX2a = svgAxis
          .append('g')
          .attr('id', 'xAxisYear')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top - 22 + separationHeaderAxisMonth) + ')')
          .attr('class', 'topHeaderYear')
          .call(xAxisYear);

        let gX2aYear = svgAxis
          .append('g')
          .attr('id', 'xAxisYears')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top - 22 + separationHeaderAxisYear) + ')')
          .attr('class', 'topHeaderYearAxis')
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
        let scheduleGaxis = svgAxis
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
          .enter().append('line')
          .attr('id', 'todayLine')
          .attr('x1', function () {
            return xScale(today);
          })
          .attr('y1', padding.top - 40)
          .attr('x2', function () {
            return xScale(today);
          })
          .attr('y2', height + padding.top - padding.bottom)
          .style('stroke-dasharray', 5.5)
          .style('stroke-width', 2)
          .style('stroke', '#FF901C')
          .style('fill', 'none');

        let todayCircle = scheduleGaxis.enter().append("circle")
          .attr('id', 'todayCircle')
          .attr("cx", function () {
            return xScale(today);
          })
          .attr("cy", 10)
          .attr("r", 6)
          .style("fill", '#FF901C')
        let todaylineaxis = scheduleGaxis
          .enter().append('line')
          .attr('id', 'todayLineAxis')
          .attr('x1', function () {
            return xScale(today);
          })
          .attr('y1', 10)
          .attr('x2', function () {
            return xScale(today);
          })
          .attr('y2', height + padding.top - padding.bottom)
          .style('stroke-dasharray', 5.5)
          .style('stroke-width', 2)
          .style('stroke', '#FF901C')
          .style('fill', 'none');
        let button = svg.selectAll("button").data(datasets).enter().append("g");
        button
          .append("rect")
          .attr('rx', 3)
          .attr('ry', 3)
          .attr("x", (d: any) => {
            let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 28 : (windowWidth >= 2001 && windowWidth <= 2549 ? 25 : (windowWidth >= 2550 && windowWidth <= 3000 ? 25 : (windowWidth >= 1450 && windowWidth <= 2000 ? 18 : (windowWidth >= 1199 && windowWidth <= 1449 ? 16 : 10)))));
            return xAddButton;
          })
          .attr("width", () => {
            let widthAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 190 : (windowWidth >= 2001 && windowWidth <= 2549 ? 130 : (windowWidth >= 2550 && windowWidth <= 3000 ? 140 : (windowWidth >= 1450 && windowWidth <= 2000 ? 120 : (windowWidth >= 1199 && windowWidth <= 1449 ? 100 : 100)))));
            return widthAddButton;
          })
          // (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11)))))

          .attr("y", (d: any) => {
            let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 12 : (windowWidth >= 2001 && windowWidth <= 2549 ? 11 : (windowWidth >= 2550 && windowWidth <= 3000 ? 12 : (windowWidth >= 1450 && windowWidth <= 2000 ? 9 : (windowWidth >= 1199 && windowWidth <= 1449 ? 2 : 2)))));
            let yScaleRect: any = yScale(d['id']);
            return (d.type === 'title' ? yScaleRect + 12 : yScaleRect + yAddButton);
          })
          .attr("height", (windowWidth >= 3001 && windowWidth <= 3999 ? 45 : (windowWidth >= 2001 && windowWidth <= 2549 ? 36 : (windowWidth >= 2550 && windowWidth <= 3000 ? 38 : (windowWidth >= 1450 && windowWidth <= 2000 ? 30 : (windowWidth >= 1199 && windowWidth <= 1449 ? 25 : 40))))))
          .style("fill", "#251863")
          .style('visibility', (d: any) => {
            let flag = ((d?.project_status)?.find((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date))
            hasDateData = true;
            if (statusCounter === (d?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length && !flag) {
              hasDateData = false;
            } else if (d?.id.includes('Title')) {
              hasDateData = false;
            }
            return hasDateData ? 'visible' : 'hidden'
          })
          .attr('stroke', '#251863')
          .style('stroke-linecap', 'round')
          .on("click", function (d: any) {
            const sendTollgate = { d, scheduleList }
            setTollData(sendTollgate);
            setOpenModalTollgate(true);
          })
        hasDateData = true;
        svg
          .selectAll("editText")
          .data(datasets)
          .enter()
          .append("text")
          .attr("class", "circletext")
          .attr('fill', 'white')
          .attr('font-size', (windowWidth >= 3001 && windowWidth <= 3999 ? 26 : (windowWidth >= 2001 && windowWidth <= 2549 ? 23 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 18 : (windowWidth >= 1199 && windowWidth <= 1449 ? 13 : 11))))))
          .attr('font-weight', 600)
          .text('Add Dates')
          .attr("x", (d: any) => {
            let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 55 : (windowWidth >= 2001 && windowWidth <= 2549 ? 50 : (windowWidth >= 2550 && windowWidth <= 3000 ? 45 : (windowWidth >= 1450 && windowWidth <= 2000 ? 35 : (windowWidth >= 1199 && windowWidth <= 1449 ? 35 : 10)))));
            return xAddButton;
          })
          .attr("y", (d: any) => {
            let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 46 : (windowWidth >= 2001 && windowWidth <= 2549 ? 45 : (windowWidth >= 2550 && windowWidth <= 3000 ? 37 : (windowWidth >= 1450 && windowWidth <= 2000 ? 30 : (windowWidth >= 1199 && windowWidth <= 1449 ? 18 : 18)))));
            let yScaleRect: any = yScale(d['id']);

            return (d.type === 'title' ? yScaleRect + 12 : yScaleRect + yAddButton);
          })
          .style('visibility', (d: any) => {
            let flag = ((d?.project_status)?.find((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date))
            hasDateData = true;
            if (statusCounter === (d?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length && !flag) {
              hasDateData = false;
            } else if (d?.id.includes('Title')) {
              hasDateData = false;
            }
            return hasDateData ? 'visible' : 'hidden'
          })
          .on("click", function (d: any) {
            const sendTollgate = { d, scheduleList }
            setTollData(sendTollgate);
            setOpenModalTollgate(true);
          })
          ;

        hasDateData = true;
        let countColor = 0;
        let done = true;
        let scheduleRects = scheduleG
          .enter().append('rect')
          .attr('id', function (d: any) {
            return `${d.id.replaceAll(' ', '')}_${d.categoryNo}`;
          })
          .attr('class', function (d: any) {
            return (d.type === 'title' ? 'agrupationbar' : 'stackedbar')
          })
          .attr('rx', function (d: any) {
            return (d.type === 'title' ? 3 : 12)
          })
          .attr('ry', function (d: any) {
            return (d.type === 'title' ? 3 : 12)
          })
          .attr('x', function (d: any) {
            return (xScale(d['from']) || 0);
          })
          .attr('y', function (d: any) {
            let yScaleRect: any = (yScale(d['id']) || 0);
            let yScaleParam = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
            return (d.type === 'title' ? yScaleRect + 12 : yScaleRect + yScaleParam);
          })
          .attr('width', function (d: any) {
            let xScaleTo: any = (xScale(d['to']) || 0);
            let xScaleFrom: any = (xScale(d['from']) || 0);
            return (xScaleTo - xScaleFrom) < 0 ? 0 : (xScaleTo - xScaleFrom);
          })
          .attr('height', function (d: any) {
            return (d.type === 'title' ? barHeight / 4 : barHeight);
          })
          .attr('fill', function (d: any) {
            let currentIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.project_data?.phaseId))
            let phaseIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.phaseId))
            let color = '';
            let today = moment()
            if (currentIndex > phaseIndex) {
              color = 'Done'
            } else if (currentIndex === phaseIndex) {
              if (d?.to) {
                const diffDates = (((d?.to).diff(today, 'M', true)))
                if (diffDates < 0) {
                  color = 'Overdue'
                } else {
                  color = 'Current'
                }
              } else {
                color = 'Current'
              }
            } else {
              color = 'NotStarted'
              done = false
            }
            return (d.type === 'title' ? '#C9C5D8' : colorScale[color]);
          })
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          })

        // let agrupationTitles = scheduleG
        // .join('rect')
        // .attr('id', function(d: any) {
        //   return `${d.id}_${d.categoryNo}_type`;
        // })
        // .attr('class', 'agrupationbar')
        // .attr('rx', 3)
        // .attr('ry', 3)
        // .attr('x', function(d: any) {      
        //       return 100;
        // })
        // .attr('y', function(d: any) {
        //   let yScaleId: any = yScale(d['id'])
        //   return yScaleId + 12;
        // })
        // .attr('width', function(d: any) {
        //   let scaleName: any =xScale(d['from'])
        //   return (d.type === 'title' ? scaleName +35 :0 );
        // })
        // .attr('height', barHeight -20 )
        // .attr('fill', '#C9C5D8');

        hasDateData = true;
        done = true;
        countColor = 0;
        let scheduleRectsCenter = scheduleG
          .enter().append('rect')
          .attr('id', function (d: any) {
            return `${d.id.replaceAll(' ', '')}_${d.categoryNo}_center`;
          })
          .attr('class', 'stackedbarCenter')
          .attr('x', function (d: any) {
            return (xScale(d['from']) || 0);
          })
          .attr('y', function (d: any) {
            let yScaleId: any = (yScale(d['id']) || 0);
            let yScaleParam = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
            return yScaleId + 1 + yScaleParam;
          })
          .attr('width', function (d: any) {
            let xScaleTo: any = (xScale(d['to']) || 0);
            let xScaleFrom: any = (xScale(d['from']) || 0);
            return (d.type === 'title' ? 0 : xScaleTo - xScaleFrom);
          })
          .attr('height', barHeight - 2)
          .attr('fill', function (d: any) {
            let currentIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.project_data?.phaseId))
            let phaseIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.phaseId))
            let color = '';
            let today = moment()
            if (currentIndex > phaseIndex) {
              color = 'Done'
            } else if (currentIndex === phaseIndex) {
              if (d?.to) {
                const diffDates = (((d?.to).diff(today, 'M', true)))
                if (diffDates < 0) {
                  color = 'Overdue'
                } else {
                  color = 'Current'
                }
              } else {
                color = 'Current'
              }
            } else {
              color = 'NotStarted'
              done = false
            }
            return (d.type === 'title' ? '#C9C5D8' : colorScale[color]);
          })
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          });

        hasDateData = true

        let rectNames = scheduleG
          .enter().append('text')
          //.attr('id', (d: any) => 'text_' + d.name.replace(/ +/g, '') + '_' + d.objectId)
          .attr('id', function (d: any) {
            return `${d.id.replaceAll(' ', '')}_${d.categoryNo}_text`;
          })
          .attr('class', (d: any) => (d.type === 'title' ? 'labelsAgrupation' : 'labels'))
          .style('fill', (d: any) => (d.type === 'title' ? '#11093C' : 'white'))
          // .style('font-size', (d: any) =>(d.type === 'title'? 13:12))
          // .style('font-weight', (d: any) =>(d.type === 'title'? 500:400))
          .attr('x', function (d: any) {
            return (d.type === 'title' ? (xScale(d['to']) || 0) : (xScale(d['from']) || 0));
          })
          .attr('y', function (d: any) {
            let yScaleId: any = (yScale(d['id']) || 0);
            let yfactor: any = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
            let forTitle: any = (windowWidth >= 2550 && windowWidth <= 3999 && d.type === 'title' ? -9 : 0);
            return yScaleId + yScale.bandwidth() / 2 + yfactor;
          })
          .attr('width', function (d: any) {
            let xScaleTo: any = (xScale(d['to']) || 0);
            let xScaleFrom: any = (xScale(d['from']) || 0);
            return (d.type === 'title' ? 100 : xScaleTo - xScaleFrom);
          })
          .text((d: any) => d.name)
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          });

        // let rectNamesAgrupation = scheduleG
        // .join('text')
        // .attr('id', (d: any) => 'text_' + d.name.replace(/ +/g, '') + '_' + d.objectId)
        // .attr('class', (d: any) => (d.type === 'title' ? 'labelsAgrupation':'labels'))
        // .style('fill', '#11093C')
        // .style('font-weight', 500)
        // .attr('x', function(d: any) {
        //   let scaleName: any =xScale(d['from'])
        //   return scaleName + 150;
        // })
        // .attr('y', function(d: any) {
        //   let yScaleId: any = yScale(d['id']);
        //   return yScaleId + yScale.bandwidth() / 2;
        // })
        // .attr('width', function(d: any) {
        //   let xScaleTo: any;
        //   let xScaleFrom: any;
        //   if (d.type === 'title'){
        //     xScaleTo = xScale(moment('2022/11/11'));
        //     xScaleFrom = xScale(moment('2022/06/11'));
        //   } else {
        //     xScaleTo = xScale(d['from']);
        //     xScaleFrom = xScale(d['from']);
        //   }
        //   return xScaleTo - xScaleFrom;
        // })
        // .attr('visibility', (d: any) => (d.type === 'title' ? 'visible':'hidden'))
        // .text((d: any) => d.name);

        let dragableLineLeft = scheduleG
          .enter().append('g')
          .attr('class', dragablesLines)
          .attr('id', (d: any) => {
            return `${d.id.replaceAll(' ', '')}_${d.categoryNo}_left`;
          });
        let dragableLineRight = scheduleG
          .enter().append('g')
          .attr('class', dragablesLines)
          .attr('id', (d: any) => `${d.id.replaceAll(' ', '')}_${d.categoryNo}_right`);

        hasDateData = true

        let h = yScale.bandwidth();

        // commented to disable left and right dragging lines 
        // leftLine = dragableLineLeft
        //   .append('line')
        //   .attr('id', function (d: any) {
        //     return `${d.id.replaceAll(' ', '')}_${d.categoryNo}_left`;
        //   })
        //   .attr('class', 'dragginglinesLeft')
        //   .attr('x1', function (d: any) {
        //     let xScaleFrom: any = (xScale(d['from']) || 0);
        //     return xScaleFrom - dragableLineHalf + 3;
        //   })
        //   .attr('x2', function (d: any) {
        //     let xScaleFrom: any = (xScale(d['from']) || 0);
        //     return xScaleFrom - dragableLineHalf + 3;
        //   })
        //   .attr('y1', function (d: any) {
        //     let yScaleId: any = (yScale(d['id']) || 0);
        //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 100 : 0)
        //     return yScaleId + h + yScaleFactor;
        //   })
        //   .attr('y2', function (d: any) {
        //     let yScaleId: any = (yScale(d['id']) || 0);
        //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
        //     return yScaleId + h + 8 + yScaleFactor;
        //   })
        //   .style('visibility', (d: any) => {
        //     return d.show ? 'visible' : 'hidden'
        //   });

        // hasDateData = true

        // rightLine = dragableLineRight
        //   .append('line')
        //   .attr('id', function (d: any) {
        //     return `${d.id.replaceAll(' ', '')}_${d.categoryNo}_right`;
        //   })
        //   .attr('class', 'dragginglinesRight')
        //   .attr('x1', function (d: any) {
        //     let xScaleTo: any = (xScale(d['to']) || 0);
        //     return xScaleTo - dragableLineHalf - 3;
        //   })
        //   .attr('x2', function (d: any) {
        //     let xScaleTo: any = (xScale(d['to']) || 0);
        //     return xScaleTo + dragableLineHalf - 3;
        //   })
        //   .attr('y1', function (d: any) {
        //     let yScaleId: any = (yScale(d['id']) || 0);
        //     return yScaleId + h - 2;
        //   })
        //   .attr('y2', function (d: any) {
        //     let yScaleId: any = (yScale(d['id']) || 0);
        //     return yScaleId + h + 8;
        //   })
        //   .style('visibility', (d: any) => {
        //     return d.show ? 'visible' : 'hidden'
        //   });

        zoomedXScale = xScale;
        let calctodayX = function (d: any) {
          return zoomedXScale(today);
        };
        let calcScheduleX = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale((d['from']));
          return zoomedXScaleFrom || 0;
        };
        let calcScheduleXInner = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale((d['from']));
          return (zoomedXScaleFrom || 0) + 12;
        };
        let calcScheduleXCenter = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale((d['from']));
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          return (d.type === 'title' ? (zoomedXScaleTo || 0) + 5 : (zoomedXScaleFrom || 0) + offsetBar);
        };
        let calcScheduleWidth = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale(d['from']);
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          return ((zoomedXScaleTo || 0) - (zoomedXScaleFrom || 0)) > 0 ? (zoomedXScaleTo || 0) - (zoomedXScaleFrom || 0) : 0;
        };
        let calcScheduleWidthInner = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale(d['from']);
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          let widthcenter = zoomedXScaleTo - zoomedXScaleFrom - 24;
          return (d.type === 'title' ? 0 : (widthcenter >= 0 ? widthcenter : 0));
        };
        let calcLeftXLine = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale(d['from']);
          return (zoomedXScaleFrom || 0) - dragableLineHalf + 8;
        };
        let calcScheduleWidthText = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale(d['from']);
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          return (zoomedXScaleTo || 0) - (zoomedXScaleFrom || 0) - 1;
        };
        let calcRightXLine = function (d: any) {
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          return (zoomedXScaleTo || 0) - dragableLineHalf - 6;
        };

        let makeRoundTime = function (time: any) {
          let roundDaysStr = ('0' + String(Math.round(time.minute() / 5) * 5)).slice(-2);
          if (roundDaysStr === '60') {
            roundDaysStr = '00';
            time.add(1, 'hours');
          }
          return moment(time.format('YYYY/MM/DD HH:' + roundDaysStr.slice(-2) + ':00'));
        };
        let dragStartLines = function (this: any, d: any) {
          d3.event.sourceEvent.stopPropagation();
          d3.select(this as any)
            .classed('dragging', true)
            .style('opacity', 1);
        };
        let dragStart = function (this: any, d: any) {
          d3.event.sourceEvent.stopPropagation();
          d3.select(this).classed('dragging', true);
        };
        let dragEndRect = function (this: any, d: any) {
          d['from'] = makeRoundTime(d['from']);
          d['to'] = makeRoundTime(d['to']);
          d3.select(this)
            .classed('dragging', false)
            .attr('x', calcScheduleX)
            .attr('width', calcScheduleWidth);
          updateRects();
        };
        let moveOtherRects = function (moveX: any, dataId: any, groupId: any) {
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

        let moveOtherRectsByDirection = function (moveX: any, dataId: any, direction: any, groupId: any) {
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

        let lineDragFunction = function (this: any, d: any) {
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
        let dragEndLines = function (this: any, d: any) {
          d3.select(this).classed('dragging', false);
        };

        let lineDrag = d3
          .drag()
          .on('start', dragStartLines)
          .on('drag', lineDragFunction)
          .on('end', dragEndLines);

        // commented to avoid dragging rects

        // scheduleRects.style('cursor', 'move').call(rectDrag);
        // scheduleRectsCenter.style('cursor', 'move').call(rectDrag);
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
            const idText = `${d.id.replaceAll(' ', '')}_${d.categoryNo}_text`;
            const textElem: any = d3.select(`#${idText}`);
            const rectElem = d3.select(`#${d.id.replaceAll(' ', '')}_${d.categoryNo}`);
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

        let updateRects = function () {
          // todayline.attr('x1', calctodayX);
          // todayline.attr('x2', calctodayX);
          d3.selectAll('#todayLine').attr('x1', calctodayX);
          d3.selectAll('#todayLine').attr('x2', calctodayX);
          // todaylineaxis.attr('x1', calctodayX);
          // todaylineaxis.attr('x2', calctodayX);
          d3.selectAll('#todayLineAxis').attr('x1', calctodayX);
          d3.selectAll('#todayLineAxis').attr('x2', calctodayX);
          // todayCircle.attr('cx', calctodayX);
          d3.selectAll('#todayCircle').attr('cx', calctodayX);
          // console.log('scheduleRects', scheduleRects._groups)
          // scheduleRects._groups.forEach((element:any) => {
          //   console.log('element', element)
          // });

          // scheduleRects.attr('x', calcScheduleX).attr('width', calcScheduleWidth);
          d3.selectAll('.stackedbar').attr('x', calcScheduleX).attr('width', calcScheduleWidth);
          d3.selectAll('.agrupationbar').attr('x', calcScheduleX).attr('width', calcScheduleWidth);

          // scheduleRectsCenter.attr('x', calcScheduleXInner).attr('width', calcScheduleWidthInner);
          d3.selectAll('.stackedbarCenter').attr('x', calcScheduleXInner).attr('width', calcScheduleWidthInner);

          // rectNames.attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
          d3.selectAll('.labels').attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
          d3.selectAll('.labelsAgrupation').attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
          
          d3.selectAll('.labels').call(dotme);
          // commented to disable left and right dragging lines 
          // leftLine.attr('x1', calcLeftXLine).attr('x2', calcLeftXLine);
          
          // let h = yScale.bandwidth() - barHeight;
          // d3.selectAll('.dragginglinesLeft')
          //   .attr('x1', calcLeftXLine)
          //   .attr('x2', calcLeftXLine)
          //   .attr('y1', (d: any) => {
          //     let yScaleId: any = (yScale(d['id']) || 0);
          //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 11 : 2)
          //     return yScaleId + h + yScaleFactor;
          //   })
          //   .attr('y2', (d: any) => {
          //     let yScaleId: any = (yScale(d['id']) || 0);
          //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 11 : 2)
          //     return yScaleId + h + 13 + yScaleFactor;
          //   });
          //   d3.selectAll('.dragginglinesRight')
          //   .attr('x1', calcRightXLine)
          //   .attr('x2', calcRightXLine)
          //   .attr('y1', (d: any) => {
          //     let yScaleId: any = (yScale(d['id']) || 0);
          //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 11 : 2)
          //     return yScaleId + h + yScaleFactor;
          //   })
          //   .attr('y2', (d: any) => {
          //     let yScaleId: any = (yScale(d['id']) || 0);
          //     let yScaleFactor = (windowWidth > 1501 && windowWidth < 1700 ? 11 : 2)
          //     return yScaleId + h + 13 + yScaleFactor;
          //   });
        };
        scheduleRects.on('mousemove', function () {
          if (d3.event.target.className.animVal === 'agrupationbar') {
            d3.select(`#${d3.event.target.id}`).attr('class', 'agrupationbarHover')
          }
        })
        scheduleRects.on('mouseout', function () {
          if (d3.event.target.className.animVal === 'agrupationbarHover') {
            d3.select(`#${d3.event.target.id}`).attr('class', 'agrupationbar')
          }
        })
        scheduleRectsCenter.on('mousemove', function (d: any) {
          let scheduleData = (scheduleList.find((x: any) =>
            d.phaseId === x.phase_id
          ))
          let counterdown = 0;
          for (let i = 0; i < Object.keys(actionsDone).length; i++) {
            if (d.project_data.project_id === actionsDone[i].project_id) {
              counterdown += scheduleData.tasksData.some((option: any) => option.code_rule_action_item_id === actionsDone[i].code_rule_action_item_id);
            }
          }
          const lenghtSc = Object.keys(scheduleData.tasksData).length
          const phaseSc = scheduleData.phase
          const phaseId = scheduleData.phase_id
          const dataProject = d.project_data;
          const sendModal = { d: dataProject, actualNumber: counterdown, scheduleList: lenghtSc, schedulePhase: phaseSc, phase_id: phaseId }
          setDataModal(sendModal);
          if (d3.event.target.className.animVal === 'agrupationbar') {
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbar')
          }
          setGrapphicOpen(true);
          let popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 374 : (windowWidth >= 2550 && windowWidth <= 3000 ? 275 : (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : (windowWidth >= 1450 && windowWidth <= 2000 ? 240 : (windowWidth >= 1199 && windowWidth <= 1449 ? 205 : 205)))))
          let popupfactorLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 875 : (windowWidth >= 2550 && windowWidth <= 3000 ? 575 : (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : (windowWidth >= 1450 && windowWidth <= 2000 ? 445 : (windowWidth >= 1199 && windowWidth <= 1449 ? 345 : 345)))))
          let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
          let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
          let positionTop: any = d3.event.y - heightOfPopup-20;
          let positionLeft: any = d3.event.x - widthOfPopup / 2;
          setPositionModalGraphic({ left: positionLeft, top: positionTop })
          d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbar:hover');
          if (d3.event.target.className.animVal === 'stackedbarCenterClicked') {
            d3.selectAll('.stackedbarCenterClicked').attr('class', 'stackedbarCenter');
            d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarCenterClicked')
          }
          let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
          d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
        });
        scheduleRectsCenter.on("mouseout", (d: any) => {
          setGrapphicOpen(false);
          if (d3.event.target.className.animVal === 'stackedbarCenterClicked') {
            d3.selectAll('.stackedbarCenterClicked').attr('class', 'stackedbarCenter');
            d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarCenterClicked')
            if (d3.select('.stackedbarClicked')) {
              d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
            }
            d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbarClicked');
          } else {
            d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbar');
          }
          let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
          d3.select(`#${searchTextId}`).style('background-color', 'white');
        })


        rectNames.on('mousemove', function () {
          if (d3.event.target.className.animVal !== 'labelsAgrupation') {
            setGrapphicOpen(true);
            let popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 374 : (windowWidth >= 2550 && windowWidth <= 3000 ? 275 : (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : (windowWidth >= 1450 && windowWidth <= 2000 ? 240 : (windowWidth >= 1199 && windowWidth <= 1449 ? 205 : 205)))))
            let popupfactorLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 875 : (windowWidth >= 2550 && windowWidth <= 3000 ? 575 : (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : (windowWidth >= 1450 && windowWidth <= 2000 ? 445 : (windowWidth >= 1199 && windowWidth <= 1449 ? 345 : 345)))))
            let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
            let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
            let positionTop: any = d3.event.y - heightOfPopup-20;
            let positionLeft: any = d3.event.x - widthOfPopup / 2;
            setPositionModalGraphic({ left: positionLeft, top: positionTop })
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbar:hover');
            if (d3.event.target.className.animVal === 'nameClicked') {
              d3.selectAll('.nameClicked').attr('class', 'labels');
              d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
              d3.select(`#${d3.event.target.id}`).attr('class', 'nameClicked')
            }
            let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
            d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
          }
        });
        rectNames.on("mouseout", (d: any) => {
          setGrapphicOpen(false);
          if (d3.event.target.className.animVal === 'nameClicked') {
            d3.selectAll('.nameClicked').attr('class', 'labels');
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'nameClicked')
            if (d3.select('.stackedbarClicked')) {
              d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
            }
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
          } else {
            //d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbar');
          }
          let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
          d3.select(`#${searchTextId}`).style('background-color', 'white');
        })
        scheduleRectsCenter.on('click', function (d: any) {
          let dataProject = (calendarData.find((x: any) => x.project_id === d.project_data.project_id))
          setPopUpData({
            project_name: d.project_data.rowLabel,
            phase: d.phase,
            project_type: d.project_data.project_type,
            phase_id: d.phaseId,
            project_id: d.project_data.project_id,
            d3_pos: 0,
            d3_text: 0,
            mhfd: d.mhfd,
            estimated_cost: d.project_data.estimated_cost,
            data: dataProject,
            scheduleList: scheduleList
          })
          const sendTollgate1 = { d: dataProject, scheduleList: scheduleList }
          setEditData(sendTollgate1)
          setOpenPiney(true);
          d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
          d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');

          d3.select(`#${d3.event.target.id.slice(0, -7)}_right`).attr('class', 'dragginglinesonclick');
          d3.select(`#${d3.event.target.id.slice(0, -7)}_left`).attr('class', 'dragginglinesonclick');
          if (d3.event.target.id.includes('center')) {
            d3.select(`#${d3.event.target.id.slice(0, -7)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarCenterClicked');
            d3.select(`#${d3.event.target.id.slice(0, -7)}_text`).attr('class', 'nameClicked');
          } else {
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');
          }
          backgroundRects.attr('y', (d: any) => d3.event.target.y.animVal.value).attr('class', 'backgroundRectvisible');
          d3.event.stopPropagation();
        });
        rectNames.on('click', function () {
          //setOpenPiney(true);
          d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
          d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');

          if (d3.event.target.id.includes('text')) {
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id.slice(0, -5)}_center`).attr('class', 'stackedbarCenterClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'nameClicked');
          } else {
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');
          }
          d3.event.stopPropagation();
        });
        scheduleRects.on('click', function () {
          if (!d3.event.target.id.includes('Title')) {
            d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
            d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');

            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');

            d3.select(`#${d3.event.target.id}_right`).attr('class', 'dragginglinesonclick');
            d3.select(`#${d3.event.target.id}_left`).attr('class', 'dragginglinesonclick');
            backgroundRects.attr('y', (d: any) => d3.event.target.y.animVal.value).attr('class', 'backgroundRectvisible');
          }
          d3.event.stopPropagation();
        });
        svg.on('click', function () {
          //setOpenPiney(false);
          d3.selectAll('.dragginglinesonclick').attr('class', 'dragginglines');
          d3.selectAll('.backgroundRectvisible').attr('class', 'backgroundRecthidden');
          d3.selectAll('.stackedbarCenterClicked').attr('class', 'stackedbarCenter');
          d3.selectAll('.nameClicked').attr('class', 'labels');
          if (d3.event.target.id.includes('center')) {
            d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
          } else {
            d3.select('.stackedbarClicked').attr('class', 'stackedbar');
          }
        });

        let YearsToPixels = function (years: any) {
          let d1 = new Date();
          let firstvalue: any = zoomedXScale(d3.timeYear.offset(d1, years));
          let secondvalue: any = zoomedXScale(d1);
          return firstvalue - secondvalue;
        };
        let MonthsToPixels = function (months: any) {
          let d1 = new Date();
          let firstvalue: any = zoomedXScale(d3.timeMonth.offset(d1, months));
          let secondvalue: any = zoomedXScale(d1);
          return firstvalue - secondvalue;
        };
        let DaysToPixels = function (days: any) {
          let d1 = new Date();
          let firstvalue: any = zoomedXScale(d3.timeDay.offset(d1, days));
          let secondvalue: any = zoomedXScale(d1);
          return firstvalue - secondvalue;
        };
        let adjustTextLabelsYears = function () {
          d3.selectAll('.topHeaderYear text').attr('transform', 'translate(' + YearsToPixels(1) / 2 + ',0)');
        };
        let adjustTextLabelsMonths = function () {
          d3.selectAll('.topHeaderYear text').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
          d3.selectAll('.topHeaderYear line').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
        };
        let adjustTextLabelsMonths2 = function () {
          d3.selectAll('.topHeaderMonth text').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
          d3.selectAll('.topHeaderM text').attr('transform', 'translate(' + MonthsToPixels(1) / 2 + ',0)');
        };
        let adjustTextLabelsDays = function () {
          d3.selectAll('.topHeader text').attr('transform', 'translate(' + DaysToPixels(1) / 2 + ',0)');
        };

        let getVisibleMonths = function (domain: any) {
          var time = d3.timeMonth.floor(domain[0]),
            end = d3.timeMonth.floor(domain[1]),
            times = [time];
          while (time < end) {
            time = d3.timeMonth.offset(time, 1);
            times.push(time);
          }
          return times;
        }
        let getVisibleYears = function (domain: any) {
          var time = d3.timeYear.floor(domain[0]),
            end = d3.timeYear.floor(domain[1]),
            times = [time];
          while (time < end) {
            time = d3.timeYear.offset(time, 1);
            times.push(time);
          }
          return times;
        }
        let yearOffset = (windowWidth >= 3001 && windowWidth <= 3999 ? 15 : (windowWidth >= 2550 && windowWidth <= 3000 ? 15 : (windowWidth >= 2001 && windowWidth <= 2549 ? 17 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 15 : 15)))));
        let setTextPositionMonth = function (selection: any) {
          selection.each(function (this: any, d: any) {
            var widthMonth = this.getBBox().width,
              nextMonthPos = zoomedXScale(d3.timeMonth.offset(d, 1)),
              padding = 3,
              minPos = 0, maxPos = zoomedXScale.range()[1],
              x, opacity;
            x = zoomedXScale(d) + (MonthsToPixels(1) / 2); // center
            x = Math.max(minPos, x); // left-left
            x = Math.min(x, nextMonthPos - widthMonth - padding);  // left-right

            x = Math.min(x, maxPos - widthMonth); // right-right
            x = Math.max(x, zoomedXScale(d) + padding); // right-left

            if (x < minPos) {
              opacity = (x + widthMonth - minPos) / widthMonth;
            } else if (x + widthMonth > maxPos) {
              opacity = (maxPos - x) / widthMonth;
            } else {
              opacity = 1;
            }
            d3.select(this)
              .attr('x', (x >= 0 && x <= widthMonth / 2 + 15 ? widthMonth / 2 + 15 : x))
              .attr('opacity', opacity);
          });
        }
        let setTextPositionYear = function (selection: any) {
          selection.each(function (this: any, d: any) {
            var width = this.getBBox().width,
              nextMonthPos = zoomedXScale(d3.timeYear.offset(d, 1)),
              padding = 3,
              minPos = 0, maxPos = zoomedXScale.range()[1],
              x, opacity;

            x = zoomedXScale(d) + DaysToPixels(182) - width / 2; // center
            x = Math.max(minPos, x); // left-left
            x = Math.min(x, nextMonthPos - width - padding);  // left-right

            x = Math.min(x, maxPos - width); // right-right
            x = Math.max(x, zoomedXScale(d) + padding); // right-left

            if (x < minPos) {
              opacity = (x + width - minPos) / width;
            } else if (x + width > maxPos) {
              opacity = (maxPos - x) / width;
            } else {
              opacity = 1;
            }
            let thisVar: any = d3.select(this)
            d3.select(this)
              .attr('x', (x >= 0 && x <= width / 2 + yearOffset ? width / 2 + yearOffset : x))
              .attr('opacity', opacity);
          });
        }

        let renderMonthNames: any = function (scale: any) {

          let gettimefornames = function (name: any) {
            var f, params = Array.prototype.slice.call(arguments, 1);
            return function (d: any) {
              f = d[name];
              return typeof (f) === 'function' ? f.apply(d, params) : f;
            };
          };

          let scale1 = zoomedXScale.copy(),
            scale0 = renderMonthNames.scale || scale1,
            data = getVisibleMonths(zoomedXScale.domain()),
            name = d3.select('.topHeaderYear').selectAll('.name').data(data, gettimefornames('getTime')),
            nameEnter, nameUpdate, nameExit,
            text, textEnter, textUpdate;

          renderMonthNames.scale = scale1;

          nameEnter = name.enter();
          nameUpdate = name;
          nameExit = name.exit();
          zoomfortoday = d3.event.transform.k;

          nameEnter
            .append('text')
            .attr('class', 'name')

            .text(function (d: any) { return (d3.event.transform.k > 30 ? d3.timeFormat('%B')(d) : (d.getMonth() === 8 ? d3.timeFormat('%bt')(d) : d3.timeFormat('%b')(d))) })

            .call(setTextPositionMonth, zoomedXScale);
          // set text position in the other thread
          // because we need BBox of the already rendered text element
          setTimeout(function () {
            d3.select('.topHeaderYear').selectAll('.name').call(setTextPositionMonth, zoomedXScale);
          }, 100);
          name.attr('transform', function (d: any) { return (d3.event.transform.k < 35 ? 'translate(0,' + separationHeaderAxisInFunction + ')' : 'translate(0,' + 0 + ')') })
          nameUpdate = nameUpdate.transition().duration(300);
          nameExit = nameExit.transition().duration(300);

          // UPDATE
          // 
          nameUpdate
            .call(setTextPositionMonth, zoomedXScale);

          // EXIT
          //
          nameExit
            .attr('opacity', 1e-6)
            .call(setTextPositionMonth, zoomedXScale)
            .remove();
        } // renderMonthNames

        let renderYearNames: any = function (scale: any) {

          let gettimefornames = function (name: any) {
            var f, params = Array.prototype.slice.call(arguments, 1);
            return function (d: any) {
              f = d[name];
              return typeof (f) === 'function' ? f.apply(d, params) : f;
            };
          };

          let scale1 = zoomedXScale.copy(),
            data = getVisibleYears(zoomedXScale.domain()),
            name = d3.select('.topHeaderYearAxis').selectAll('.nameYear').data(data, gettimefornames('getTime')),
            nameEnter, nameUpdate, nameExit;

          renderYearNames.scale = scale1;

          nameEnter = name.enter();
          nameUpdate = name;
          nameExit = name.exit();

          // ENTER
          //
          nameEnter
            .append('text')
            .attr('class', 'nameYear')
            .attr('transform', function (d: any) { return (d3.event.transform.k < 35 ? 'translate(0,' + 0 + ')' : 'translate(0,' + 0 + ')') })
            .text(function (d: any) { return d3.timeFormat('%Y')(d); })

            .call(setTextPositionYear, zoomedXScale);
          // set text position in the other thread
          // because we need BBox of the already rendered text element
          // setTimeout(function() {
          d3.select('.topHeaderYearAxis').selectAll('.nameYear').call(setTextPositionYear, zoomedXScale);
          // }, 1);
          nameUpdate = nameUpdate.transition().duration(300);
          nameExit = nameExit.transition().duration(300);

          // UPDATE
          // 
          nameUpdate
            .call(setTextPositionYear, zoomedXScale);

          // EXIT
          //
          nameExit
            .attr('opacity', 1e-6)
            .call(setTextPositionYear, zoomedXScale)
            .remove();
        } // renderMonthNames

        zoomed = function () {
          


          setCurrentZScale(d3.event.transform.k);
          zoomedXScale = d3.event.transform.rescaleX(xScale);
          // console.log(d3.event.transform)
          if (d3.event.transform.k < 35) {
            renderMonthNames();
            renderYearNames();
            // gX.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xDay').call((xAxisMonth as any).scale(zoomedXScale))

            gX.attr('class', 'topHeaderMChart');
            //gXamonth.call(xAxisMonthMonthly.scale(zoomedXScale)).call(adjustTextLabelsMonths2)

            // gX1.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xMonth').call((xAxisMonth as any).scale(zoomedXScale))

            // gX2.call(xAxisYear.scale(zoomedXScale));
            d3.selectAll('#xYear').call((xAxisYear as any).scale(zoomedXScale))
            
            // gXa.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xAxisDay').call((xAxisMonth as any).scale(zoomedXScale))

            gXa.attr('class', 'topHeaderM');
            // gX1a.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xAxisMonth').call((xAxisMonth as any).scale(zoomedXScale))

            //gX2a.call(xAxisYear.scale(zoomedXScale));
            // gX2aYear.call(xAxisYear.scale(zoomedXScale));
            d3.selectAll('#xAxisYears').call((xAxisYear as any).scale(zoomedXScale))

            const linesAxis:any = document.getElementsByTagName("line")
            if(linesAxis){
              for(let line of linesAxis){
                if(line?.id !=='todayLineAxis' && line?.id !== 'todayLine' ){
                  line.setAttribute('y2', 600) 
                }
              }
            }
          } else {
            renderMonthNames();
            d3.selectAll('.topHeaderMonth text').attr('visibility', 'hidden');

            // gX.call(xAxisDay.scale(zoomedXScale)).call(adjustTextLabelsDays);
            d3.selectAll('#xDay').call((xAxisDay as any).scale(zoomedXScale)).call(adjustTextLabelsDays);

            gX.attr('class', 'topHeaderChart');
            
            // gX2.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xYear').call((xAxisMonth as any).scale(zoomedXScale))

            // gX1.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xMonth').call((xAxisMonth as any).scale(zoomedXScale))

            // gXa.call(xAxisDay.scale(zoomedXScale)).call(adjustTextLabelsDays);
            d3.selectAll('#xAxisDay').call((xAxisDay as any).scale(zoomedXScale)).call(adjustTextLabelsDays);

            gXa.attr('class', 'topHeader');
            // gX2a.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xAxisYear').call((xAxisMonth as any).scale(zoomedXScale))

            // gX1a.call(xAxisMonth.scale(zoomedXScale));
            d3.selectAll('#xAxisMonth').call((xAxisMonth as any).scale(zoomedXScale))

            d3.select('.topHeaderYearAxis').selectAll('.nameYear').attr('visibility', 'hidden');
          }
          updateRects();
        };

        zoom = d3
          .zoom()
          .scaleExtent([0.5, 300])
          .translateExtent([
            [0, 0],
            [width, 0],
          ])
          .on('zoom', zoomed);
        svg.call(zoom).on('wheel.zoom', null).on("dblclick.zoom", null);
        svg.call(zoom.scaleBy, currentZScale);
        svgAxis.call(zoom).on('wheel.zoom', null).on("dblclick.zoom", null);
        svgAxis.call(zoom.scaleBy, currentZScale);
        const moveZoom = (newZoomValue: any) => {
          if (zoomStatus !== newZoomValue) {
            svg.transition().call(zoom.translateBy, newZoomValue,0);
            svgAxis.transition().call(zoom.translateBy, newZoomValue,0);
            setZoomStatus(newZoomValue);
          }
        };
        moveZoom(zoomTimeline);
        if (zoomSelected === 'Today') {
          zoom.translateTo(svg, xScale(today), 0);
          zoom.scaleTo(svg, 7.5);
          zoom.translateTo(svgAxis, xScale(today), 0);
          zoom.scaleTo(svgAxis, 7.5);
          //  zoom.translateTo(svg, 0.9 * width, 0.5 *height)
          //setIsZoomToday(false);
          moveZoom(zoomTimeline);
          d3.select('.topHeaderYearAxis').selectAll('.nameYear').attr('visibility', 'visible');
        }
        if (isZoomWeekly) {
          // svg
          // .transition().call(zoom.scaleBy, 80);
          zoom.scaleTo(svg, 80);
          zoom.translateTo(svg, 0.9 * width, 0.5 * height);
          zoom.scaleTo(svgAxis, 80);
          zoom.translateTo(svgAxis, 0.9 * width, 0.5 * height);
          setIsZoomWeekly(false);
        }
        if (isZoomMonthly) {
          // svg
          // .transition().call(zoom.scaleBy, 18);
          zoom.scaleTo(svg, 7.5);
          zoom.translateTo(svg, 0.9 * width, 0.5 * height);
          zoom.scaleTo(svgAxis, 7.5);
          zoom.translateTo(svgAxis, 0.9 * width, 0.5 * height);
          setIsZoomMonthly(false);
        }

      }
    }
  };


  useEffect(() => {
    let dataParsed = (dataBody.map((x: any, index: number) => {
      return {
        id: `${groupName}${index}`,
        project_id: x.project_id,
        rowLabel: x.project_name,
        on_base: x?.onbase_project_number,
        project_type: x?.code_project_type?.project_type_name,
        status: getCurrentProjectStatus(x)?.code_phase_type?.code_status_type?.status_name || '',
        project_status: x?.project_statuses?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4 && ps?.code_phase_type?.phase_ordinal_position !== -1),
        phase: getCurrentProjectStatus(x)?.code_phase_type?.phase_name,
        phaseId: getCurrentProjectStatus(x)?.code_phase_type_id,
        mhfd: x?.project_staffs.reduce((accumulator: string, pl: any) => {
          const sa = pl?.mhfd_staff?.full_name || '';
          const sa1 = pl?.code_project_staff_role_type_id || '';
          let value = accumulator;
          if (sa && sa1 === 1) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''),
        service_area: getServiceAreas(x?.project_service_areas || []),
        stream: getStreams(x?.project_streams || []).join(' , '),
        estimated_cost: getTotalEstimatedCost(x?.project_costs),
        isFavorite: favorites.some((element: { project_id: number; }) => {
          if (element.project_id === x.project_id) {
            return true;
          }
          return false;
        }),
      }
    }))
    let rawData2 = dataParsed?.map((x: any) => {
      if (x?.project_status?.length) {
        let flag = ((x?.project_status)?.find((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date))
        if (x?.project_status?.length > 0) {
          return {
            ...x,
            schedule: x?.project_status?.map((z: any, index: number) => {
              return {
                project_data: x,
                objectId: index + 1,
                type: 'rect',
                categoryNo: index + 1,
                from: moment(z?.planned_start_date).isValid()?moment(z?.planned_start_date):undefined,
                to: moment(z?.planned_end_date).isValid()?moment(z?.planned_end_date):undefined,
                status: z?.code_phase_type?.code_status_type?.status_name,
                name: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                phase: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                phaseId: z.code_phase_type_id,
                tasks: 10,
                show: (statusCounter === (x?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length && !flag),
                current: x?.phaseId === z?.code_phase_type_id,
                isDone: z.is_done,
                isLocked: z.is_locked
              };
            })
          }
        } else {
          return {
            ...x,schedule:[{
              project_data: {},
              objectId: index + 1,
              type: 'rect',
              categoryNo: index + 1,
              from: undefined,
              to: undefined,
              status: '',
              name: '',
              phase: 0,
              phaseId: 0,
              tasks: 10,
              show: false,
              current: false,
              isDone: false,
              isLocked: false
            }]
          }
        }
      } else {
        return {
          ...x,schedule:[{
            project_data: {},
            objectId: index + 1,
            type: 'rect',
            categoryNo: index + 1,
            from: undefined,
            to: undefined,
            status: '',
            name: '',
            phase: 0,
            phaseId: 0,
            tasks: 10,
            show: false,
            current: false,
            isDone: false,
            isLocked: false
          }]
        }
      }
    })
    setLocations([...rawData2].filter((elem: any) => elem.id.includes('Title')).map((elem: any) => elem.headerLabel.replace(/\s/g, '')));
    let locationInt = [...rawData2].filter((elem: any) => elem.id.includes('Title')).map((elem: any) => elem.headerLabel.replace(/\s/g, ''));
    setDatas(rawData2?.map((el: any) => {
      return {
        ...el,
        schedule: el?.schedule?.map((sch: any) => {
            return { ...sch, id: el.id };
          })
          .sort(function (a: any, b: any) {
            return a.from - b.from;
          }),
      };
    }))
    let datasInt = rawData2?.map((el: any) => {
      return {
        ...el,
        schedule: el?.schedule?.map((sch: any) => {
            return { ...sch, id: el.id };
          })
          .sort(function (a: any, b: any) {
            return a.from - b.from;
          }),
      };
    });
    setFromData(datasInt?.map((ds: any) => ds.schedule)
      .flat()
      .sort(function (a: any, b: any) {
        return a.from - b.from;
      }));
    setToData(datasInt?.map((ds: any) => ds.schedule)
      .flat()
      .sort(function (a: any, b: any) {
        return a.to - b.to;
      }));

    let fromDataInt = datasInt?.map((ds: any) => ds.schedule)
      .flat()
      .sort(function (a: any, b: any) {
        return a.from - b.from;
      });
    let toDataInt = datasInt?.map((ds: any) => ds.schedule)
      .flat()
      .sort(function (a: any, b: any) {
        return a.to - b.to;
      });
    let agrupationDataInt: any= []; 
    locationInt.forEach((location: any) => {
      let isTheFirst = 0;
      fromDataInt?.forEach((elem: any) => {
        if ((elem.id).replaceAll(' ', '').includes(location) && isTheFirst === 0) {
          agrupationDataInt.push({
            objectId: 10,
            type: 'title',
            categoryNo: 100,
            from: elem.from,
            to: elem.to,
            status: 'completed',
            name: 'Denver'
          });
          isTheFirst++
        }
      })
    });
    locationInt.forEach((location: any, index: any) => {
      let theLast: any;
      toDataInt?.forEach((elem: any) => {
        if (elem.id.replaceAll(' ', '').includes(location)) {
          theLast = elem;
        }
      })
      agrupationDataInt[index]['to'] = theLast?.to;
      agrupationDataInt[index].id = `Title${index}`
      agrupationDataInt[index].objectId = index
      agrupationDataInt[index].type = 'title'
      agrupationDataInt[index].name = (locations[index] === 'CommerceCity' ? 'Commerce City' : locations[index])
    });
    let positions = 0;
    datasInt?.forEach((element: any) => {
      if (element.id.includes('Title')) {
        element.schedule[0] = agrupationDataInt[positions];
        positions++
      }
    });
    setAgrupationData(agrupationDataInt);
    setCalendarData(datasInt);
  }, [dataBody, favorites])

  useEffect(() => {
    //collapseItemStatus();
    timelineChart(datas);
    setSvgState(svg);
    setSvgAxisState(svgAxis);
  }, [calendarData,scheduleList,windowWidth]);

  useEffect(() => {
    if (svgState) {     
      // const removeAllChildNodes = (parent: any) => {
      //   if (parent){
      //     while (parent.firstChild) {
      //       parent?.removeChild(parent.firstChild);
      //     }
      //   }
      // };
      const removechart: any = document.getElementById(`timeline-chart-${groupName}`);
      const removechartAxis: any = document.getElementById('timeline-chart-axis');
      removeAllChildNodes(removechart);
      removeAllChildNodes(removechartAxis);
      //collapseItemStatus();
      timelineChart(datas);
    }
  }, [openTable, moveSchedule, isZoomToday, isZoomWeekly, isZoomMonthly, zoomTimeline, zoomSelected,calendarData,scheduleList,windowWidth]);

  const collapseItemStatus =()=>{
    calendarData.forEach((element:any, index:any) => {
      if (!openTable[index]) {
        setDatas (datas.filter(function(el: any) {
          return !el.id.includes(element.headerLabel.replace(/\s/g, ''));
        }));
      }
    });
  }

  useEffect(() => {
    let idForFilter = dataId.id;
    if(currentGroup === 'streams' && dataId.value !== ''){
      idForFilter = dataId.value;
    }
    datasets.postData(SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup, idForFilter) + `?page=${page}&limit=${LIMIT_PAGINATION}&code_project_type_id=${tabKey}`, filterPagination).then((res: any) => {
      setDataBody(res);
      setResultCounter(Object.keys(res).length);
    })
  }, [ page, filterPagination,updateForDates])

  const deleteFunction = (id: number, email: string, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {
      setUpdateFavorite(!updateFavorite);
      setUpdateFavorites(!updateFavorites);
    });
  }
  const addFunction = (email: string, id: number, table: string) => {
    datasets.getData(SERVER.ADD_FAVORITE + '?table=' + table + '&email=' + email + '&id=' + id, datasets.getToken()).then(favorite => {
      setUpdateFavorite(!updateFavorite);
      setUpdateFavorites(!updateFavorites);
    });
  }
  const removeAllChildNodes = (parent: any) => {
    while (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };



  return <>
    {detailOpen && <DetailModal
      visible={detailOpen}
      setVisible={setDetailOpen}
      data={dataDetail}
      type={FILTER_PROJECTS_TRIGGER}
      deleteCallback={deleteFunction}
      addFavorite={addFunction}
    />}
    <div >
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 5 }} style={{}}>
          <hr className="line-progress" style={{width: `${(((page) * 100 )/ limitPage)}%`}}/>
          {
            calendarData.map((d: any, index_elem: number) => (
              <div className="text-search" key={d.id} id={d.id}
                onMouseEnter={(e: any) => {
                  //setHoverTable(elem.values[index_elem].project_id)
                }}>
                <p onClick={() => {
                  setDetailOpen(true);
                  setDataDetail(d)
                }} className="title-project" >{d.rowLabel}</p>
                {d.isFavorite ? <HeartFilled style={{ marginLeft: '7px', color: '#F5575C', marginRight: '10px' }} onClick={() => (deleteFunction(d.project_id, email, ''))} /> : <HeartOutlined style={{ marginLeft: '7px', color: '#706B8A', marginRight: '10px' }} onClick={() => addFunction(email, d.project_id, '')} />}
              </div>
            ))
          }
        </Col>
        <Col xs={{ span: 34 }} lg={{ span: 19 }}>
          {/* <div style={{ width: '100%', marginBottom: marginReducerHeaderAxis }}>
            <div style={{ overflowX: 'hidden', overflowY: 'hidden' }} id="timeline-chart-axis" />
          </div> */}
          {/* <div
            id="chartContainer"
            style={{ overflowY: 'auto', overflowX: 'hidden',height:'1000px' }}
            ref={el => scheduleRef.current = el}
            className='chart-container'
            onScroll={(e: any) => {
              let dr: any = scheduleRef.current;
              if (searchRef.current[index]) {
                searchRef.current[index].scrollTo(0, dr.scrollTop);
              }
            }}
          > */}
            <div style={{ marginTop: marginTopFactor }}>
              <div style={{ height: calendarData.length=1*39 }} id={`timeline-chart-${groupName.replaceAll(' ', '')}`} />
              {/* <img src="/picture/Maps.png" alt="" width="100%" onClick={() => {setOpenPiney(true)}}/>*/}
            </div>
          {/* </div> */}
        </Col>
      </Row>
    </div>
  </>
};

export default CalendarBody;