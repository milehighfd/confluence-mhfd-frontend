import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import * as d3 from 'd3';
import moment from 'moment';
import { SERVER } from 'Config/Server.config';
import { FILTER_PROJECTS_TRIGGER } from 'constants/constants';
import DetailModal from 'routes/detail-page/components/DetailModal';
import { getCurrentProjectStatus, getServiceAreas, getStreams, getTotalEstimatedCost } from 'utils/parsers';
import * as datasets from 'Config/datasets';
import { LIMIT_PAGINATION } from 'constants/constants';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import { colorScale } from 'routes/portfolio-view/constants/PhaseViewData';
import { useMapState } from "hook/mapHook";
import { handleAbortError } from 'store/actions/mapActions';
import LoadingViewOverall from "Components/Loading-overall/LoadingViewOverall";

const CalendarBody = ({
  dataId,
  tabKey,
  next,
  prev,
  setNext,
  setPrev,
  index,
  actionsDone,
  setOpenPiney,
  groupName,
  setEditData,
  counter,
  page,
  setPage,
}: {
  dataId: any,
  tabKey: any,
  next: boolean,
  prev: boolean,
  setNext: Function,
  setPrev: Function,
  index: number,
  actionsDone: any,
  setOpenPiney: Function,
  groupName: string,
  setEditData: any,
  counter:  never[],
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {
  const {
    filterProjectOptions,
  } = useMapState();
  function startsWithNumber(str:string) {
    return /^\d/.test(str);
  }
  groupName = groupName === '?' ? '#questionMark' : groupName;
  const svgDivWrapperId = `#timeline-chart-${startsWithNumber(groupName)? groupName.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') : groupName.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}`;
  const svgAxisDivWrapperId = `#timeline-chart-axis`;
  // const [isLoading, setIsLoading] = useState(false);
  const { currentGroup, favorites,statusCounter, zoomTimeline, zoomTimelineAux, zoomSelected, updateGroup } = usePortflioState();
  const { 
    deleteFavorite, 
    addFavorite, 
    setPositionModalGraphic, 
    setDataModal, 
    setGraphicOpen, 
    setOpenModalTollgate, 
    setZoomTimeline,
    setZoomTimelineAux, 
    setIsLoading, 
    setDatesData,
    setPineyData,
  } = usePortfolioDispatch();
  let wasMonthly = true;
  const [dataBody, setDataBody] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [calendarData, setCalendarData] = useState<any>([]);
  const [currentZScale, setCurrentZScale] = useState(0.104);
  const [zoomStatus, setZoomStatus] = useState(0);
  const [toData,setToData] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [svgState, setSvgState] = useState<any>();
  const [updateForDates, setUpdateForDates] = useState<any>(false);
  const windowWidth: any = window.innerWidth;
  let limitPage = Number(counter) % LIMIT_PAGINATION > 0 ?  Math.floor(Number(counter) / LIMIT_PAGINATION + 1) : Number(counter) / LIMIT_PAGINATION;
  let zoom: any;
  let svg: any;
  let svgAxis: any;
  let xScale: any;
  let zoomedXScale: any;
  let zoomed: any;
  let today = new Date();
  let widthofDiv: any = document.getElementById('widthDivforChart')?.offsetWidth;
  let hasDateData = true;
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
  let barHeightDefault = (windowWidth >= 3001 && windowWidth <= 3999 ? 42 : (windowWidth >= 2550 && windowWidth <= 3000 ? 40 : (windowWidth >= 2001 && windowWidth <= 2549 ? 36 : (windowWidth >= 1450 && windowWidth <= 2000 ? 30 : (windowWidth >= 1199 && windowWidth <= 1449 ? 15 : 27)))));
  let width = widthofDiv - 20;
  let screenOffset = (windowWidth >= 3001 && windowWidth <= 3999 ? 24 : (windowWidth >= 2550 && windowWidth <= 3000 ? 12 : (windowWidth >= 2001 && windowWidth <= 2549 ? 64 : (windowWidth >= 1450 && windowWidth <= 2000 ? 6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 5 : 21.5)))));

  useEffect(() => {
    let idF = dataId.id;
    if (idF === updateGroup.id1 || !updateGroup.id1) {
      setUpdateForDates(!updateForDates);
    }
    if (idF === updateGroup.id2) {
      setUpdateForDates(!updateForDates);
    }
  }, [updateGroup])

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

  //Start of calendar generation
  let heightDiv: any = document.getElementsByClassName(`ant-collapse-header`);
  let barHeight = heightDiv[0].offsetHeight ? Math.ceil((heightDiv[0].offsetHeight) * 0.8) : barHeightDefault;
  let padding = { top: 43, right: 10, bottom: 10, left: -0 };
  const removechartAxis: any = document.getElementById('timeline-chart-axis');
  const timelineChart = (datasets: any) => {
    setIsLoading(true)
    if (Object.keys(datasets).length > 0) {
      let height = (heightDiv[0].offsetHeight * datasets.length) + padding.bottom + padding.top;
      removeAllChildNodes(removechartAxis);
      if (svg) {
        svg.selectAll('*').remove();
        svgAxis.selectAll('*').remove();
      }
      svg = d3
        .select(svgDivWrapperId)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `${zoomTimeline} 0 ${width} ${height}`)
        .attr('transform', 'translate(' + 0 + ',' + (factortransformSVG) + ')')
      svgAxis = d3
        .select(svgAxisDivWrapperId)
        .append('svg')
        .attr('width', width)
        .attr('height', heigthOfHeaderAxis)
        .attr('viewBox', `${zoomTimeline} 0 ${width} ${heigthOfHeaderAxis}`)

      let offsetBar = 18;

      let counterDataForChart: number = 0;
      datasets.forEach((sch: any) => {
        let listDates = sch?.code_phase_types;
        listDates?.sort((a: any, b: any) => {
          const aPosition = a.phase_ordinal_position || 0;
          const bPosition = b.phase_ordinal_position || 0;
          return aPosition - bPosition;
        });
        listDates?.forEach((item: any, index: number) => {
          item.objectId = index + 1;
          item.categoryNo = index + 1;
        });        
        if (listDates?.length !== 0) {          
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
          .range([padding.left -50000, width - padding.right + 50000]);
        let yScale = d3
          .scaleBand()
          .domain(datasets.map((d: any) => d.id))
          .range([padding.top, height - padding.bottom + screenOffset-10]);
        let chartHeight = height - padding.top - padding.bottom;
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

        d3
          .axisTop(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickSize(-chartHeight)
          .tickFormat(timeFormatterForMonths);

        let xAxisDay = d3
          .axisTop(xScale)
          .ticks(d3.timeDay.every(1))
          .tickSize(-chartHeight)
          .tickFormat(timeFormatterForDays);

        d3
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

        svg
          .append('g')
          .attr('id', 'xMonth')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top) + ')')
          .attr('class', 'topHeaderMonthChart')
          .call(xAxisMonth);

        svg
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

        svgAxis
          .append('g')
          .attr('id', 'xAxisMonth')
          .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
          .attr('class', 'topHeaderMonthforTicks')
          .call(xAxisMonth);

        svgAxis
          .append('g')
          .attr('id', 'xAxisYear')
          .attr('transform', 'translate(' + 0 + ',' + (padding.top - 22 + separationHeaderAxisMonth) + ')')
          .attr('class', 'topHeaderYear')
          .call(xAxisYear);

        svgAxis
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
        let button = svg.selectAll("button").data(datasets).enter().append("g");
        button
          .append("rect")
          .attr('id', 'buttonRect')
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
          .attr("y", (d: any) => {
            let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 12 : (windowWidth >= 2001 && windowWidth <= 2549 ? 11 : (windowWidth >= 2550 && windowWidth <= 3000 ? 12 : (windowWidth >= 1450 && windowWidth <= 2000 ? 9 : (windowWidth >= 1199 && windowWidth <= 1449 ? 2 : 2)))));
            let yScaleRect: any = yScale(d['id']);
            return yScaleRect + yAddButton
          })
          .attr("height", (windowWidth >= 3001 && windowWidth <= 3999 ? 45 : (windowWidth >= 2001 && windowWidth <= 2549 ? 36 : (windowWidth >= 2550 && windowWidth <= 3000 ? 38 : (windowWidth >= 1450 && windowWidth <= 2000 ? 30 : (windowWidth >= 1199 && windowWidth <= 1449 ? 25 : 40))))))
          .style("fill", "#251863")
          .style('visibility', (d: any) => {    
            hasDateData = true;
            if (d?.flag) {
              hasDateData = false;
            } else if (d?.id.includes('Title')) {
              hasDateData = false;
            }
            return hasDateData ? 'visible' : 'hidden'
          })
          .attr('stroke', '#251863')
          .style('stroke-linecap', 'round')
          .on("click", function (d: any) {
            const scheduleList = d?.project_data?.code_phase_types;
            const sendTollgate = { d, scheduleList }
            setDatesData(sendTollgate);
            setOpenModalTollgate(true);
          })
        hasDateData = true;
        svg
          .selectAll("editText")
          .data(datasets)
          .enter()
          .append("text")
          .attr('id', 'buttonText')
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
            return yScaleRect + yAddButton
          })
          .style('visibility', (d: any) => {
            hasDateData = true;
            if (d?.flag) {
              hasDateData = false;
            } else if (d?.id.includes('Title')) {
              hasDateData = false;
            }
            return hasDateData ? 'visible' : 'hidden'
          })
          .on("click", function (d: any) {
            const scheduleList = d?.project_data?.code_phase_types;
            const sendTollgate = { d, scheduleList }
            setDatesData(sendTollgate);
            setOpenModalTollgate(true);
          })
          ;
        hasDateData = true;
        let scheduleRects = scheduleG
          .enter().append('rect')
          .attr('id', function (d: any) {
            return `${startsWithNumber(d.id) ? d.id.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') : d.id.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${d.categoryNo}`;
          })
          .attr('class', 'stackedbar')
          .attr('rx', 12)
          .attr('ry', 12)
          .attr('x', function (d: any) {
            return (xScale(d['from']) || 0);
          })
          .attr('y', function (d: any) {
            let yScaleRect: any = (yScale(d['id']) || 0);
            let yScaleParam = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
            return yScaleRect + yScaleParam
          })
          .attr('width', function (d: any) {
            let xScaleTo: any = (xScale(d['to']) || 0);
            let xScaleFrom: any = (xScale(d['from']) || 0);
            return (xScaleTo - xScaleFrom) < 0 ? 0 : (xScaleTo - xScaleFrom);
          })
          .attr('height', barHeight)
          .attr('fill', function (d: any) {    
            let color = '';
            let today = moment()
            if (d.currentIndex > d.phaseIndex) {
              color = 'Done'
            } else if (d.currentIndex === d.phaseIndex) {
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
            }
            return colorScale[color];
          })
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          })
        hasDateData = true;
        let scheduleRectsCenter = scheduleG
          .enter().append('rect')
          .attr('id', function (d: any) {
            return `${startsWithNumber(d.id) ? d.id.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :d.id.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${d.categoryNo}_center`;
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
            return  xScaleTo - xScaleFrom
          })
          .attr('height', barHeight - 2)
          .attr('fill', function (d: any) {
            let color = '';
            let today = moment()
            if (d.currentIndex > d.phaseIndex) {
              color = 'Done'
            } else if (d.currentIndex === d.phaseIndex) {
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
            }
            return colorScale[color]
          })
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          });
        hasDateData = true

        let rectNames = scheduleG
          .enter().append('text')
          .attr('id', function (d: any) {
            return `${startsWithNumber(d.id) ? d.id.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :d.id.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${d.categoryNo}_text`;
          })
          .attr('class', 'labels')
          .style('fill',  function (d: any) {             
            let state = '';
            if (d.currentIndex < d.phaseIndex) {
              state = 'NotStarted'
            }
            return (state === 'NotStarted' ? 'gray': 'white')
          })
          .attr('x', function (d: any) {
            return  (xScale(d['from']) || 0);
          })
          .attr('y', function (d: any) {
            let yScaleId: any = (yScale(d['id']) || 0);
            let yfactor: any = (windowWidth > 1501 && windowWidth < 1700 ? 9 : 0)
            return yScaleId + yScale.bandwidth() / 2 + yfactor;
          })
          .attr('width', function (d: any) {
            let xScaleTo: any = (xScale(d['to']) || 0);
            let xScaleFrom: any = (xScale(d['from']) || 0);
            return  xScaleTo - xScaleFrom
          })
          .text((d: any) => d.name)
          .style('visibility', (d: any) => {
            return d.show ? 'visible' : 'hidden'
          });

        hasDateData = true

        yScale.bandwidth();
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
          return (zoomedXScaleFrom || 0) + offsetBar
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
          return widthcenter >= 0 ? widthcenter : 0;
        };
        let calcScheduleWidthText = function (d: any) {
          let zoomedXScaleFrom: any = zoomedXScale(d['from']);
          let zoomedXScaleTo: any = zoomedXScale(d['to']);
          return (zoomedXScaleTo || 0) - (zoomedXScaleFrom || 0) - 1;
        };
        
        const dotme = (text: any) => {
          text.each((d: any) => {
            const completeLabel = `${d['name']}`;
            const idText = `${startsWithNumber(d.id) ? d.id.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :d.id.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${d.categoryNo}_text`;
            const textElem: any = d3.select(`#${idText}`);
            const rectElem = d3.select(`#${startsWithNumber(d.id) ? d.id.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') : d.id.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${d.categoryNo}`);
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
          d3.selectAll('.stackedbar').attr('x', calcScheduleX).attr('width', calcScheduleWidth);
          d3.selectAll('.stackedbarHover').attr('x', calcScheduleX).attr('width', calcScheduleWidth);
          d3.selectAll('.stackedbarCenterClicked').attr('x', calcScheduleXInner).attr('width', calcScheduleWidthInner);
          d3.selectAll('.stackedbarClicked').attr('x', calcScheduleX).attr('width', calcScheduleWidth);
          d3.selectAll('.nameClicked').attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
          d3.selectAll('.stackedbarCenter').attr('x', calcScheduleXInner).attr('width', calcScheduleWidthInner);
          d3.selectAll('.labels').attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);
          d3.selectAll('.labelsAgrupation').attr('x', calcScheduleXCenter).attr('width', calcScheduleWidthText);          
          d3.selectAll('.labels').call(dotme);
        };

        scheduleRectsCenter.on('mousemove', function (d: any) {
        
          let scheduleData = (d?.project_data?.code_phase_types?.find((x: any) =>
            d.phaseId === x.phase_id
          ));
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
          const sendModal = { data: dataProject, actualNumber: counterdown, scheduleList: lenghtSc, schedulePhase: phaseSc, phase_id: phaseId, to:d.to }
          setDataModal(sendModal);
          setGraphicOpen(true);
          let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
          let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
          let positionTop: any = d3.event.y - heightOfPopup-20;
          let positionLeft: any = d3.event.x - widthOfPopup / 2;
          setPositionModalGraphic(positionLeft, positionTop)
          let idHovered = `#${d3.event.target.id.slice(0, -7)}`
          let colorHovered = d3.select(idHovered).style('fill')
          d3.select(idHovered).attr('class', 'stackedbarHover').style('stroke', colorHovered);
          if (d3.event.target.className.animVal === 'stackedbarCenterClicked') {
            d3.selectAll('.stackedbarCenterClicked').attr('class', 'stackedbarCenter');
            d3.select(idHovered).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarCenterClicked')
          }
          let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
          d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
        });
        scheduleRectsCenter.on("mouseout", (d: any) => {
          setGraphicOpen(false);
          d3.selectAll('.stackedbarHover').attr('class', 'stackedbar').style('stroke', 'gray')
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
            setGraphicOpen(true);
            let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
            let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
            let positionTop: any = d3.event.y - heightOfPopup-20;
            let positionLeft: any = d3.event.x - widthOfPopup / 2;
            setPositionModalGraphic(positionLeft,positionTop)
            let idHovered = `#${d3.event.target.id.slice(0, -5)}`
            let colorHovered = d3.select(idHovered).style('fill')
            d3.select(idHovered).attr('class', 'stackedbarHover').style('stroke', colorHovered);
            // d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarHover');
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
          setGraphicOpen(false);
          d3.selectAll('.stackedbarHover').attr('class', 'stackedbar').style('stroke', 'gray')
          if (d3.event.target.className.animVal === 'nameClicked') {
            d3.selectAll('.nameClicked').attr('class', 'labels');
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'nameClicked')
            if (d3.select('.stackedbarClicked')) {
              d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
            }
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
          }
          let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
          d3.select(`#${searchTextId}`).style('background-color', 'white');
        })
        scheduleRectsCenter.on('click', function (d: any) {
          let dataProject = (calendarData.find((x: any) => x.project_id === d.project_data.project_id))          
          setPineyData({
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
            scheduleList: d?.project_data?.code_phase_types
          })          
          const sendTollgate1 = { d: dataProject, scheduleList: d?.project_data?.code_phase_types }
          setEditData(sendTollgate1)
          setOpenPiney(true);
          d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
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
        rectNames.on('click', function (d:any) {
          let dataProject = (calendarData.find((x: any) => x.project_id === d.project_data.project_id))
          setPineyData({
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
            scheduleList: d?.project_data?.code_phase_types
          })          
          const sendTollgate1 = { d: dataProject, scheduleList: d?.project_data?.code_phase_types }
          setEditData(sendTollgate1)
          setOpenPiney(true);
          d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');

          if (d3.event.target.id.includes('text')) {
            d3.select(`#${d3.event.target.id.slice(0, -5)}`).attr('class', 'stackedbarClicked');
            d3.select(`#${d3.event.target.id.slice(0, -5)}_center`).attr('class', 'stackedbarCenterClicked');
            d3.select(`#${d3.event.target.id}`).attr('class', 'nameClicked');
          } else {
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');
          }
          d3.event.stopPropagation();
        });
        scheduleRects.on('click', function (d:any) {
          let dataProject = (calendarData.find((x: any) => x.project_id === d.project_data.project_id))
          setPineyData({
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
            scheduleList: d?.project_data?.code_phase_types
          })          
          const sendTollgate1 = { d: dataProject, scheduleList: d?.project_data?.code_phase_types }
          setEditData(sendTollgate1)
          setOpenPiney(true);
          if (!d3.event.target.id.includes('Title')) {
            d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
            d3.select(`#${d3.event.target.id}`).attr('class', 'stackedbarClicked');
            backgroundRects.attr('y', (d: any) => d3.event.target.y.animVal.value).attr('class', 'backgroundRectvisible');
          }
          d3.event.stopPropagation();
        });
        svg.on('click', function () {
          d3.selectAll('.backgroundRectvisible').attr('class', 'backgroundRecthidden');
          d3.selectAll('.stackedbarCenterClicked').attr('class', 'stackedbarCenter');
          d3.selectAll('.nameClicked').attr('class', 'labels');
          if (d3.event.target.id.includes('center')) {
            d3.selectAll('.stackedbarClicked').attr('class', 'stackedbar');
          } else {
            d3.select('.stackedbarClicked').attr('class', 'stackedbar');
          }
        });

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
            // x = Math.max(minPos, x); // left-left
            // x = Math.min(x, nextMonthPos - widthMonth - padding);  // left-right

            // x = Math.min(x, maxPos - widthMonth); // right-right
            // x = Math.max(x, zoomedXScale(d) + padding); // right-left

            if (x < minPos) {
              opacity = (x + widthMonth - minPos) / widthMonth;
            } else if (x + widthMonth > maxPos) {
              opacity = (maxPos - x) / widthMonth;
            } else {
              opacity = 1;
            }
            opacity =1;
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
            // x = Math.max(minPos, x); // left-left
            // x = Math.min(x, nextMonthPos - width - padding);  // left-right

            // x = Math.min(x, maxPos - width); // right-right
            // x = Math.max(x, zoomedXScale(d) + padding); // right-left

            if (x < minPos) {
              opacity = (x + width - minPos) / width;
            } else if (x + width > maxPos) {
              opacity = (maxPos - x) / width;
            } else {
              opacity = 1;
            }
            opacity =1;
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
            data = getVisibleMonths(zoomedXScale.domain()),
            name = d3.select('.topHeaderYear').selectAll('.name').data(data, gettimefornames('getTime')),
            nameEnter, nameUpdate, nameExit

          renderMonthNames.scale = scale1;

          nameEnter = name.enter();
          nameUpdate = name;
          nameExit = name.exit();

          nameEnter
            .append('text')
            .attr('class', 'name')

            .text(function (d: any) { return (d3.event.transform.k === 0.9 ? d3.timeFormat('%B (%Y)')(d) : (d.getMonth() === 8 ? d3.timeFormat('%bt')(d) : d3.timeFormat('%b')(d))) })

            .call(setTextPositionMonth, zoomedXScale);
          // set text position in the other thread
          // because we need BBox of the already rendered text element
          setTimeout(function () {
            d3.select('.topHeaderYear').selectAll('.name').call(setTextPositionMonth, zoomedXScale);
          }, 100);
          name.attr('transform', function (d: any) { return (d3.event.transform.k < 0.2 ? 'translate(0,' + separationHeaderAxisInFunction + ')' : 'translate(0,' + 0 + ')') })
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
            .attr('transform', (d3.event.transform.k < 0.2 ? 'translate(0,' + 0 + ')' : 'translate(0,' + 0 + ')'))
            .text(function (d: any) { return d3.timeFormat('%Y')(d); })

            .call(setTextPositionYear, zoomedXScale);
          // set text position in the other thread
          // because we need BBox of the already rendered text element
          d3.select('.topHeaderYearAxis').selectAll('.nameYear').call(setTextPositionYear, zoomedXScale);
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

        scheduleG
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

        scheduleGaxis.enter().append("circle")
          .attr('id', 'todayCircle')
          .attr("cx", function () {
            return xScale(today);
          })
          .attr("cy", 10)
          .attr("r", 6)
          .style("fill", '#FF901C')
        scheduleGaxis
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
        zoomed = function () { 
          setCurrentZScale(d3.event.transform.k);
          zoomedXScale = d3.event.transform.rescaleX(xScale);
          if (d3.event.transform.k < 0.2) {
            // renderMonthNames();
            // renderYearNames();  
            //d3.selectAll('#xDay').call((xAxisMonth as any).scale(zoomedXScale))
            // gX.attr('class', 'topHeaderMChart');
            // d3.selectAll('#xMonth').call((xAxisMonth as any).scale(zoomedXScale))
            // d3.selectAll('#xYear').call((xAxisYear as any).scale(zoomedXScale)) 
            // d3.selectAll('#xAxisDay').call((xAxisMonth as any).scale(zoomedXScale))
            // gXa.attr('class', 'topHeaderM');
            // d3.selectAll('#xAxisMonth').call((xAxisMonth as any).scale(zoomedXScale))
            // d3.selectAll('#xAxisYears').call((xAxisYear as any).scale(zoomedXScale))
            renderMonthNames();
            renderYearNames();
            gX.attr('class', 'topHeaderMChart');
            d3.selectAll('#xMonth, #xYear, #xAxisDay, #xAxisMonth, #xAxisYears')
              .call((xAxisMonth as any).scale(zoomedXScale));
            gXa.attr('class', 'topHeaderM');
          } else {
            renderMonthNames();
            d3.selectAll('.topHeaderMonth text').attr('visibility', 'hidden');
            d3.selectAll('#xDay').call((xAxisDay as any).scale(zoomedXScale)).call(adjustTextLabelsDays);
            gX.attr('class', 'topHeaderChart');
            //d3.selectAll('#xYear').call((xAxisMonth as any).scale(zoomedXScale))
            d3.selectAll('#xMonth').call((xAxisMonth as any).scale(zoomedXScale))
            d3.selectAll('#xAxisDay').call((xAxisDay as any).scale(zoomedXScale)).call(adjustTextLabelsDays);
            gXa.attr('class', 'topHeader');
            //d3.selectAll('#xAxisYear').call((xAxisMonth as any).scale(zoomedXScale))
            d3.selectAll('#xAxisMonth').call((xAxisMonth as any).scale(zoomedXScale))
            //d3.select('.topHeaderYearAxis').selectAll('.nameYear').attr('visibility', 'hidden');
          }
          updateRects();
          d3.selectAll('#todayLine').attr('x1', calctodayX);
          d3.selectAll('#todayLine').attr('x2', calctodayX);
          d3.selectAll('#todayLineAxis').attr('x1', calctodayX);
          d3.selectAll('#todayLineAxis').attr('x2', calctodayX);
          d3.selectAll('#todayCircle').attr('cx', calctodayX);
          const linesAxis:any = document.getElementsByTagName("line")
          if(linesAxis){
            for(let line of linesAxis){
              if(line?.id !=='todayLineAxis' && line?.id !== 'todayLine' ){
                line.setAttribute('y2', 600) 
              }
            }
          }
        };
        
        // setZoomState(zoomed)
        zoom = d3
          .zoom()
          .scaleExtent([0, 300])
          .translateExtent([
            [0, 0],
            [width, 0],
          ])
          .on('zoom', zoomed);
        if (zoomSelected === 'Today') {
          // delete after testing
          // zoom.translateTo(svg, xScale(today), 0);
          // zoom.scaleTo(svg, 0.104);
          // zoom.translateTo(svgAxis, xScale(today), 0);
          // zoom.scaleTo(svgAxis, 0.104);
          zoom.transform(svg, d3.zoomIdentity.translate(xScale(today), 0).scale(0.104));
          zoom.transform(svgAxis, d3.zoomIdentity.translate(xScale(today), 0).scale(0.104));
          d3.select('.topHeaderYearAxis').selectAll('.nameYear').attr('visibility', 'visible');
        }
        if (zoomSelected === 'Weekly') {
          zoom.scaleTo(svg, 0.9);
          zoom.scaleTo(svgAxis, 0.9);
        }
        if (zoomSelected === 'Monthly') {
          // delete after testing
          //zoom.scaleTo(svg, 0.104);
          //zoom.scaleTo(svgAxis, 0.104);
          zoom.scaleTo(svg, 0.104).scaleTo(svgAxis, 0.104);
        }
        
      }
    }
   
    setIsLoading(false)
  }
  const moveZoom = (newZoomValue: any, svg: any, svgAxis: any) => {
    
    if (zoomStatus !== newZoomValue) {
      svg.transition().call(zoom.translateBy, newZoomValue,0);
      svgAxis.transition().call(zoom.translateBy, newZoomValue,0);
      setZoomStatus(newZoomValue);
    }
  };

  useEffect(() => {
    setIsLoading(true)
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
        mhfd: x?.project_staffs.reduce((accumulator: string, staffMember: any) => {
          const contactName = staffMember?.business_associate_contact?.contact_name || '';
          const roleTypeId = staffMember?.code_project_staff_role_type_id || '';
          if (contactName && roleTypeId === 1) {
            if (accumulator) {
              accumulator += ', ';
            }
            accumulator += contactName;
          }
          return accumulator;
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
        code_phase_types: x?.code_phase_types?.map((z: any, index: number) => {
          const matchingStatus = x?.project_statuses?.find((ps: any) => ps?.code_phase_type_id === z?.code_phase_type_id);
          const from = matchingStatus?.actual_start_date;
          const to = matchingStatus?.actual_end_date;
          return {
            objectId: index,
            type: 'rect',
            code_phase_type_id: z?.code_phase_type_id,
            code_status_type_id: z?.code_status_type_id,
            duration: z?.duration,
            duration_type: z?.duration_type,
            categoryNo: index,
            from: moment(from),
            to: moment(to),
            tasks: z.code_rule_action_items.length,
            tasksData: z.code_rule_action_items,
            status: z?.code_status_type?.status_name,
            name: z?.phase_name.replaceAll(' ', ''),
            phase: z?.phase_name.replaceAll(' ', ''),
            phase_id: z.code_phase_type_id,
            current: x?.phaseId === z?.code_phase_type_id,
            phase_ordinal_position: z?.phase_ordinal_position,
            isDone: false,
            isLocked: false
          };
        })
      }
    }))
    let rawData2 = dataParsed?.map((x: any) => {
      if (x?.project_status?.length) {
        let flag = ((x?.project_status)?.some((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date))
        if (x?.project_status?.length > 0) {
          return {
            ...x,
            flag: (x?.code_phase_types?.length === (x?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4)?.length && !flag),
            schedule: x?.project_status?.map((z: any, index: number) => {
              const orderPhaseTypes = x?.code_phase_types?.sort((a: any, b: any) => a.phase_ordinal_position - b.phase_ordinal_position);
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
                show: (x?.code_phase_types?.length === (x?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4)?.length && !flag),
                current: x?.phaseId === z?.code_phase_type_id,
                isDone: z.is_done,
                isLocked: z.is_locked,
                currentIndex : orderPhaseTypes?.findIndex((z: any) => x?.phaseId === z?.code_phase_type_id),
                phaseIndex: orderPhaseTypes?.findIndex((y: any) => y?.code_phase_type_id === z?.code_phase_type_id),                
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
    setCalendarData(datasInt);
  }, [dataBody, favorites])

  useEffect(() => {
    if (datas.length !== 0){
      setIsLoading(true)
      //collapseItemStatus();
        const removechart: any = document.getElementById(`timeline-chart-${groupName}`);
        removeAllChildNodes(removechart);
      setZoomTimeline(0)
      timelineChart(datas);
      setSvgState(svg);
    }
  }, [calendarData,windowWidth,datas]);

  useEffect(() => {
    setZoomTimelineAux(zoomTimeline)
    const svg = d3.select(svgDivWrapperId).select('svg');
    const svgAx = d3.select(svgAxisDivWrapperId).select('svg');
    if (!svg.empty()) {
      let viewBox = svg.attr('viewBox');
      let viewBoxAx = svgAx.attr('viewBox');
      const [initX, initY, boxWidth, boxHeight] = viewBox.split(' ').map((x: any) => parseInt(x));
      const [initXax, initYax, boxWidthax, boxHeightax] = viewBoxAx.split(' ').map((x: any) => parseInt(x));
      svg.attr('viewBox', `${zoomTimeline} ${initY} ${boxWidth} ${boxHeight}`);
      svgAx.attr('viewBox', `${zoomTimeline} ${initYax} ${boxWidthax} ${boxHeightax}`);
      d3.selectAll('#buttonText').attr('transform', 'translate(' + zoomTimeline + ',0)')
      d3.selectAll('#buttonRect').attr('transform', 'translate(' + zoomTimeline + ',0)')
      let todayLineDiv: any = document.getElementById('todayLineDiv')
      var styleDiv = window.getComputedStyle(todayLineDiv);
      var matrix = new WebKitCSSMatrix(styleDiv.transform);
      let translateYTodayline = (currentZScale===0.9 ? -332 :-159) + (currentZScale===0.9 ? 800 <= zoomTimeline ? 2000 : zoomTimeline  : 600 <= zoomTimeline ? 2000 : zoomTimeline)
      d3.select('.dashed-line').attr('style', `transform: rotate(90deg) translate(${matrix.m42}px,${translateYTodayline}px)`)
    }
    setIsLoading(false)
    // if (svgState) {     
    //   const removechart: any = document.getElementById(`timeline-chart-${groupName}`);
    //   const removechartAxis: any = document.getElementById('timeline-chart-axis');
    //   removeAllChildNodes(removechart);
    //   removeAllChildNodes(removechartAxis);
    //   console.log('end2',datas)
    //   timelineChart(datas);
    // }
  }, [zoomTimeline]);

  useEffect(() => {
    setIsLoading(true)
    if (zoomSelected === 'Weekly' || zoomSelected === 'Monthly') { 
      setIsLoading(true)    
      if(currentZScale > 0.2){      
        wasMonthly = false;
      } else {
        wasMonthly = true;
      }
      const removechart: any = document.getElementById(`timeline-chart-${groupName}`);
      const removechartAxis: any = document.getElementById('timeline-chart-axis');
      removeAllChildNodes(removechart);
      removeAllChildNodes(removechartAxis);
      timelineChart(datas);
    }
      const svg = d3.select(svgDivWrapperId).select('svg');
      if (!svg.empty()) {
        if (zoomSelected === 'Weekly' && wasMonthly === true ){
          const newValuePan = (zoomTimelineAux === 0 ? 100: (((zoomTimelineAux/100)*10)-5)* 100)
          setZoomTimeline(newValuePan )
        } else if (zoomSelected === 'Monthly'&& wasMonthly === false){
          const newValuePan = (((zoomTimelineAux/100)+5)/10)* 100
          setZoomTimeline(newValuePan)
        }
      }
    setIsLoading(false)
  }, [zoomSelected]);

  useEffect(() => {
    let idForFilter = dataId.id;
    if(currentGroup === 'streams' && dataId.value !== ''){
      idForFilter = dataId.value;
    }
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup, idForFilter)}?page=${page}&limit=${LIMIT_PAGINATION}&code_project_type_id=${tabKey}`,
      filterProjectOptions,
      datasets.getToken(),
      controller.signal
    ).then((res: any) => {
      setDataBody(res);
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [ page, filterProjectOptions,updateForDates])

  const deleteFunction = (id: number) => {
    deleteFavorite(id);
  }
  const addFunction = (email: string, id: number, table: string) => {
    addFavorite(id);
  }
  const removeAllChildNodes = (parent: any) => {
    if (parent !== null && parent.firstChild) {
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
              <div className="text-search" key={d.id} id={d.id}>
                <p onClick={() => {
                  setDetailOpen(true);
                  setDataDetail(d)
                }} className="title-project" >{d.rowLabel}</p>
                {
                  d.isFavorite ? <HeartFilled
                    style={{ marginLeft: '7px', color: '#F5575C', marginRight: '10px' }}
                    onClick={() => deleteFunction(d.project_id)}
                  /> : <HeartOutlined
                    style={{ marginLeft: '7px', color: '#706B8A', marginRight: '10px' }}
                    onClick={() => addFunction('', d.project_id, '')} />}
              </div>
            ))
          }
        </Col>
        <Col xs={{ span: 34 }} lg={{ span: 19 }}>
            <div style={{ marginTop: marginTopFactor }}>
              <div style={{ height: calendarData.length=1*39, marginLeft: '2px' }} id={groupName === '?' ? 'questionMark' : `timeline-chart-${startsWithNumber(groupName) ? groupName.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :groupName.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}`} />
            </div>
        </Col>
      </Row>
    </div>
  </>
};

export default CalendarBody;
