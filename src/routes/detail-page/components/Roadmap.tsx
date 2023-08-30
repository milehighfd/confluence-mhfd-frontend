import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import * as d3 from 'd3';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
import ModalGraphic from 'routes/portfolio-view/components/ModalGraphic';
import { colorScale } from 'routes/portfolio-view/constants/PhaseViewData';
import { getUserBrowser } from 'utils/utils';
import * as datasets from 'Config/datasets';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';

const Roadmap = ({
  setOpenPiney,
  data,
  updateAction,
}: {
  setOpenPiney: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  updateAction: any;
}) => {
  const { graphicOpen, statusCounter, updateGroup, actionsDone } = usePortflioState();
  const {
    setPositionModalGraphic,
    setDataModal,
    setGraphicOpen,
    setPineyData,
    getListPMTools,
    setDatesData,
    getActionsDone,
  } = usePortfolioDispatch();
  const [phaseList, setPhaseList] = useState<any>([]);
  const [scheduleList, setScheduleList] = useState<any>({});
  const [statusList, setStatusList] = useState<any>([]);
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [userBrowser, setUserBrowser] = useState<any>();
  const [availableStatusList, setAvailableStatusList] = useState<any>([]);

  const windowWidth: any = window.innerWidth;
  let labelWidth: any;
  let projectTypeOffset = 0;
  let projectType,
    marginLeftChart = '21px',
    fontSizeLabels = '11px';
  let paddingTopLegend =
    windowWidth > 1900 && windowWidth <= 2549
      ? '24px'
      : windowWidth > 2550 && windowWidth <= 2999
      ? '24px'
      : windowWidth >= 3001 && windowWidth <= 3999
      ? '24px'
      : '10px';

  if (data.length > 0) {
    projectType = data[0].code_project_type_id;
    labelWidth =
      windowWidth > 1900 && windowWidth <= 2549
        ? projectType >= 8 && projectType <= 11
          ? 59
          : projectType === 13
          ? 80
          : 72
        : windowWidth > 2550 && windowWidth <= 2999
        ? projectType >= 8 && projectType <= 11
          ? 71
          : projectType === 13
          ? 95
          : 87
        : windowWidth >= 3001 && windowWidth <= 3999
        ? projectType >= 8 && projectType <= 11
          ? 90
          : projectType === 13
          ? 125
          : 115
        : projectType >= 8 && projectType <= 11
        ? 48.7
        : projectType === 13
        ? 70
        : 65;
    // marginLeftChart = projectType >= 8 && projectType <= 11 ? '-10px' : '21px'
    fontSizeLabels =
      windowWidth > 1900 && windowWidth <= 2549
        ? projectType >= 8 && projectType <= 11
          ? '0px'
          : '10px'
        : windowWidth > 2550 && windowWidth <= 2999
        ? projectType >= 8 && projectType <= 11
          ? '-5px'
          : '10px'
        : windowWidth >= 3001 && windowWidth <= 3999
        ? projectType >= 8 && projectType <= 11
          ? '14.5px'
          : projectType === 13
          ? '18px'
          : '18px'
        : projectType >= 8 && projectType <= 11
        ? '8.7px'
        : '11px';

    marginLeftChart =
      windowWidth > 1900 && windowWidth <= 2549
        ? projectType >= 8 && projectType <= 11
          ? '0px'
          : projectType === 13
          ? '32px'
          : '22px'
        : windowWidth > 2550 && windowWidth <= 2999
        ? projectType >= 8 && projectType <= 11
          ? '-5px'
          : projectType === 13
          ? '35px'
          : '28px'
        : windowWidth >= 3001 && windowWidth <= 3999
        ? projectType >= 8 && projectType <= 11
          ? '-4px'
          : projectType === 13
          ? '53px'
          : '40px'
        : projectType >= 8 && projectType <= 11
        ? '-10px'
        : projectType === 13
        ? '28px'
        : '20px';

    projectTypeOffset =
      data[0].code_project_type_id === 5
        ? 65
        : data[0].code_project_type_id === 7 || data[0].code_project_type_id === 13
        ? 120
        : data[0].code_project_type_id === 1
        ? 260
        : data[0].code_project_type_id === 6
        ? 280
        : 0;
  }
  let totalLabelWidth = phaseList.length * labelWidth;
  let svg: any;

  const marginLeft =
    windowWidth >= 3001 && windowWidth <= 3999
      ? 30
      : windowWidth >= 2550 && windowWidth <= 3000
      ? 24
      : windowWidth >= 2001 && windowWidth <= 2549
      ? 29
      : windowWidth >= 1450 && windowWidth <= 2000
      ? 19
      : windowWidth >= 1199 && windowWidth <= 1449
      ? 17
      : 14;
  const marginRight =
    windowWidth >= 1900 && windowWidth <= 2549
      ? 15
      : windowWidth >= 2550 && windowWidth <= 3000
      ? 18
      : windowWidth >= 3001 && windowWidth <= 3999
      ? 25
      : 15;
  const marginTop =
    windowWidth >= 3001 && windowWidth <= 3999
      ? -41
      : windowWidth >= 1900 && windowWidth <= 2549
      ? -20
      : windowWidth >= 2550 && windowWidth <= 3000
      ? -35
      : -15.8;

  const gradientLinesClass = (svgDefinitions: any) => {
    let completedtoActive = svgDefinitions.append('linearGradient');
    completedtoActive
      .attr('id', 'Done_Current')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0')
      .attr('y2', '0');
    completedtoActive
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#5E5FE2');
    completedtoActive
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#047CD7');

    let completedtoDelayed = svgDefinitions.append('linearGradient');
    completedtoDelayed
      .attr('id', 'Current_NotStarted')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0')
      .attr('y2', '0');
    completedtoDelayed
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#047CD7');
    completedtoDelayed
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#D4D2D9');

    let ActivetoNotStarted = svgDefinitions.append('linearGradient');
    ActivetoNotStarted.attr('id', 'Overdue_NotStarted')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0')
      .attr('y2', '0');
    ActivetoNotStarted.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#F5575C');
    ActivetoNotStarted.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#D4D2D9');
  };

  const phaseChart = (dataDotchart: any) => {
    let dataDetailed = dataDotchart.filter((e: any) => e.specificId === 3);
    if (Object.keys(scheduleList).length > 0) {
      let margin = { top: marginTop, right: marginRight, bottom: -30, left: marginLeft };
      let width: any = totalLabelWidth; //document.getElementById('phaseviewTitleDetailPage')?.offsetWidth;//= 1405 - margin.left - margin.right,
      let heightDiv: any;
      heightDiv = document.getElementById(`ProjectRoadmapHeader`)?.offsetHeight; //265 - margin.top - margin.bottom;
      let factorHeight = windowWidth >= 3001 && windowWidth <= 3999 ? 10 : 0;
      let height: any = factorHeight + heightDiv + 40;
      let heightContainer: any = height + margin.top + margin.bottom;

      if (heightContainer > 0) {
        // append the svg object to the body of the page
        svg = d3
          .select(`#dotchart_detailPage`)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        let datas = dataDotchart;

        let arrayForCirclesAndLines = [];
        for (var i = 0; i < scheduleList.length; i++) {
          arrayForCirclesAndLines.push(i);
        }
        let svgDefinitions = svg.append('defs');
        svg
          .selectAll('defs')
          .data(datas)
          .enter();

        gradientLinesClass(svgDefinitions);

        // Add X axis
        var x = d3
          .scaleLinear()
          .domain([0, phaseList.length])
          .range([margin.left, width + margin.right]);
        let xdr: any = (r: any) => {
          let offset: any = x(r);
          return offset;
        };
        svg
          .append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .style('visibility', 'hidden')
          .call(d3.axisBottom(x));

        // Y axis
        var y = d3
          .scaleBand()
          .range([0, height])
          .domain(
            datas.map((d: any) => {
              return d.id;
            }),
          )
          .padding(1);
        svg
          .append('g')
          .style('visibility', 'hidden')
          .call(d3.axisLeft(y));

        // Lines
        arrayForCirclesAndLines.forEach(r => {
          if (r < arrayForCirclesAndLines.length - 1) {
            svg
              .selectAll('myline')
              .data(datas)
              .enter()
              .append('rect')
              .attr('x', xdr(r))
              .attr('width', xdr(r + 1) - xdr(r))
              .attr('y', (d: any) => {
                let ydname: any = y(d.id);
                return ydname;
              })
              .attr('height', 2)
              .attr('stroke', function(d: any) {
                const endDate = d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)
                  ?.actual_end_date;
                let today = moment();
                let indexStatus;
                scheduleList.forEach((element: any, index: number) => {
                  if (d.phaseId === element.code_phase_type_id) {
                    indexStatus = index;
                  }
                });
                if (indexStatus === r) {
                  if (endDate) {
                    const diffDates = moment(endDate).diff(today, 'M', true);
                    if (diffDates > 0) {
                      return `url(#Current_NotStarted)`;
                    } else {
                      return `url(#Overdue_NotStarted)`;
                    }
                  } else {
                    return `url(#Current_NotStarted)`;
                  }
                }
                if (indexStatus && r < indexStatus - 1) {
                  return colorScale['Done'];
                }
                if (indexStatus && r === indexStatus - 1) {
                  return `url(#Done_Current)`;
                } else {
                  return colorScale['NotStarted'];
                }
              })
              .attr('stroke-width', '2.5px');
          }
        });
        const radius =
          windowWidth >= 3001 && windowWidth <= 3999
            ? 24
            : windowWidth >= 2001 && windowWidth <= 2549
            ? 14
            : windowWidth >= 2550 && windowWidth <= 3000
            ? 20
            : windowWidth >= 1450 && windowWidth <= 2000
            ? 15
            : windowWidth >= 1199 && windowWidth <= 1449
            ? 12
            : 12;
        let circles = svg
          .selectAll('mycircle')
          .data(datas)
          .enter();
        arrayForCirclesAndLines.forEach(r => {
          circles
            .append('circle')
            .attr('id', (d: any) => {
              return `${d.view.replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}`;
            })
            .attr('cx', xdr(r))
            .attr('cy', (d: any) => {
              let ydname: any = y(d.id);
              return ydname;
            })
            .attr('r', radius)
            .style('fill', function(d: any) {
              const endDate = d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date;
              let today = moment();
              let indexStatus;
              scheduleList.forEach((element: any, index: number) => {
                if (d.phaseId === element.code_phase_type_id) {
                  indexStatus = index;
                }
              });
              if (indexStatus === r) {
                if (endDate) {
                  const diffDates = moment(endDate).diff(today, 'M', true);
                  if (diffDates > 0) {
                    return colorScale['Current'];
                  } else {
                    return colorScale['Overdue'];
                  }
                } else {
                  return colorScale['Current'];
                }
              }
              if (indexStatus && r < indexStatus) {
                return colorScale['Done'];
              } else {
                return colorScale['NotStarted'];
              }
            });
          circles
            .append('circle')
            .attr('cx', xdr(r))
            .attr('cy', (d: any) => {
              let ydname: any = y(d.id);
              return ydname;
            })
            .attr('r', radius - 1)
            .style('fill', function(d: any) {
              return 'white';
            });

          circles
            .append('circle')
            .attr('cx', xdr(r))
            .attr('cy', (d: any) => {
              let ydname: any = y(d.id);
              return ydname;
            })
            .attr('r', radius - 3)
            .style('fill', function(d: any) {
              const endDate = d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date;
              let today = moment();
              let indexStatus;
              scheduleList.forEach((element: any, index: number) => {
                if (d.phaseId === element.code_phase_type_id) {
                  indexStatus = index;
                }
              });
              if (indexStatus === r) {
                if (endDate) {
                  const diffDates = moment(endDate).diff(today, 'M', true);
                  if (diffDates > 0) {
                    return colorScale['Current'];
                  } else {
                    return colorScale['Overdue'];
                  }
                } else {
                  return colorScale['Current'];
                }
              }
              if (indexStatus && r < indexStatus) {
                return colorScale['Done'];
              } else {
                return colorScale['NotStarted'];
              }
            });

          svg
            .selectAll('myText')
            .data(datas)
            .enter()
            .append('text')
            .attr('id', (d: any) => {
              return `${d.view.replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}_text`;
            })
            .attr('id2', (d: any) => {
              return `${d.view.replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}_text`;
            })
            .attr('class', 'circletext')
            .attr('fill', '#ffffff')
            .attr(
              'font-size',
              windowWidth >= 3001 && windowWidth <= 3999
                ? 23
                : windowWidth >= 2001 && windowWidth <= 2549
                ? 18
                : windowWidth >= 2550 && windowWidth <= 3000
                ? 21
                : windowWidth >= 1450 && windowWidth <= 2000
                ? 16
                : windowWidth >= 1199 && windowWidth <= 1449
                ? 11
                : 11,
            )
            .text(function(d: any) {
              let counterdown = 0;
              const projectId = d.project_id;
              const arrayToCompare = actionsDone[projectId];
              if (arrayToCompare !== undefined) {
                for (let i = 0; i < Object.keys(arrayToCompare).length; i++) {
                  counterdown += scheduleList[r].tasksData.some(
                    (option: any) => option.code_rule_action_item_id === arrayToCompare[i].code_rule_action_item_id,
                  );
                }
              }
              return scheduleList[r].tasks - counterdown;
            })
            .attr('x', function(d: any) {
              let counterdown = 0;
              let pendingTasks;
              const projectId = d.project_id;
              const arrayToCompare = actionsDone[projectId];
              if (arrayToCompare !== undefined) {
                for (let i = 0; i < Object.keys(arrayToCompare).length; i++) {
                  counterdown += scheduleList[r].tasksData.some(
                    (option: any) => option.code_rule_action_item_id === arrayToCompare[i].code_rule_action_item_id,
                  );
                }
              }
              pendingTasks = scheduleList[r].tasks - counterdown;
              const factorCenter: any =
                windowWidth >= 2001 && windowWidth <= 2549
                  ? 18
                  : windowWidth >= 2550 && windowWidth <= 3000
                  ? 1.65
                  : windowWidth >= 3001 && windowWidth <= 3999
                  ? 1.8
                  : windowWidth >= 1450 && windowWidth <= 2000
                  ? 1.6
                  : windowWidth >= 1199 && windowWidth <= 1449
                  ? 1.8
                  : 2;
              let offset = 0;
              offset = +pendingTasks > 9 ? xdr(r) - radius / factorCenter : xdr(r) - radius / 4;
              return offset;
            })
            .attr('y', (d: any) => {
              let ydname: any = y(d.id);
              return ydname + radius / 3;
            });

          circles
            .append('circle')
            .attr('id', (d: any) => {
              return `${d.view.replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}_outer`;
            })
            .attr('cx', xdr(r))
            .attr('cy', (d: any) => {
              let ydname: any = y(d.id);
              return ydname;
            })
            .attr('r', radius + 0.5)
            .style('fill', 'white')
            .style('opacity', 0)
            .on('click', (d: any) => {
              setOpenPiney(false);
              const sendTollgate = { d, scheduleList };
              console.log(d);
              setDatesData(sendTollgate);
              let searchTextId2 = d3.event.target.id.slice(0, -6);
              let actualNumber = d3.selectAll(`#${searchTextId2}_text`).text();
              let flag = d?.project_status?.find((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date);
              let dataParsed = d?.project_status?.map((z: any, index: number) => {
                return {
                  project_data: d,
                  objectId: index + 1,
                  type: 'rect',
                  categoryNo: index + 1,
                  from: moment(z?.planned_start_date),
                  to: moment(z?.planned_end_date),
                  status: z?.code_phase_type?.code_status_type?.status_name,
                  name: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                  phase: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                  phaseId: z.code_phase_type_id,
                  tasks: 10,
                  show:
                    statusCounter ===
                      d?.project_status?.filter(
                        (ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4,
                      ).length && !flag,
                  current: d?.phaseId === z?.code_phase_type_id,
                  isDone: z.is_done,
                  isLocked: z.is_locked,
                };
              });
              let scheduleParsed = { ...d, schedule: dataParsed };
              setPineyData({
                project_name: d.rowLabel,
                phase: scheduleList[r].phase,
                project_type: d.project_type,
                phase_id: scheduleList[r].phase_id,
                project_id: d.project_id,
                d3_pos: searchTextId2,
                d3_text: actualNumber,
                mhfd: d.mhfd,
                data: scheduleParsed,
                estimated_cost: d.estimated_cost,
                scheduleList: scheduleList,
              });
              setOpenPiney(true);
            })
            .on('mousemove', (d: any) => {
              let popupVisible: any = document.getElementById('popup-phaseview');
              setGraphicOpen(true);
              let searchTextId2 = d3.event.target.id.slice(0, -6);
              let actualNumber = d3.selectAll(`#${searchTextId2.replaceAll(' ', '')}_text`).text();
              const lenghtSc = Object.keys(scheduleList[r].tasksData).length;
              const phaseSc = scheduleList[r].phase;
              const phaseId = scheduleList[r].phase_id;
              const sendModal = {
                data: d,
                actualNumber: actualNumber,
                scheduleList: lenghtSc,
                schedulePhase: phaseSc,
                phase_id: phaseId,
                to: moment(d?.project_status?.find((x: any) => x.code_phase_type_id === phaseId)?.actual_end_date),
              };
              setDataModal(sendModal);
              if (popupVisible !== null) {
                let popupfactorTop =
                  windowWidth >= 3001 && windowWidth <= 3999
                    ? 270
                    : windowWidth >= 2550 && windowWidth <= 3000
                    ? 185
                    : windowWidth >= 2001 && windowWidth <= 2549
                    ? 160
                    : windowWidth >= 1450 && windowWidth <= 2000
                    ? 170
                    : windowWidth >= 1199 && windowWidth <= 1449
                    ? 160
                    : 140;
                if (userBrowser === 'Safari') {
                  popupfactorTop =
                    windowWidth >= 3001 && windowWidth <= 3999
                      ? 400
                      : windowWidth >= 2550 && windowWidth <= 3000
                      ? 335
                      : windowWidth >= 2001 && windowWidth <= 2549
                      ? 60
                      : windowWidth >= 1450 && windowWidth <= 2000
                      ? 285
                      : windowWidth >= 1199 && windowWidth <= 1449
                      ? 250
                      : 140;
                }
                if (userBrowser === 'Edge') {
                  popupfactorTop =
                    windowWidth >= 3001 && windowWidth <= 3999
                      ? 245
                      : windowWidth >= 2550 && windowWidth <= 3000
                      ? 180
                      : windowWidth >= 2001 && windowWidth <= 2549
                      ? 60
                      : windowWidth >= 1450 && windowWidth <= 2000
                      ? 170
                      : windowWidth >= 1199 && windowWidth <= 1449
                      ? 155
                      : 140;
                }
                let popupfactorLeft =
                  windowWidth >= 3001 && windowWidth <= 3999
                    ? 745
                    : windowWidth >= 2550 && windowWidth <= 3000
                    ? 355
                    : windowWidth >= 2001 && windowWidth <= 2549
                    ? 200
                    : windowWidth >= 1450 && windowWidth <= 2000
                    ? 180
                    : windowWidth >= 1199 && windowWidth <= 1449
                    ? 70
                    : 345;
                let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
                let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
                //let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
                let positionTop: any = d3.event.y - heightOfPopup - 50; // Delete 120 when the popup is fixed
                let positionLeft: any = d3.event.x - widthOfPopup / 2;
                // let positionTop: any = d3.event.layerY - heightOfPopup + popupfactorTop;
                // let positionLeft: any = d3.event.layerX - widthOfPopup / 2 + popupfactorLeft;
                setPositionModalGraphic(positionLeft, positionTop);
                //d3.selectAll('.text-search:hover').attr('text-search');
                let colorCircle = d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill');
                d3.selectAll(`#${d3.event.target.id.slice(0, -6)}`)
                  .attr('r', radius + 4)
                  .style('fill', colorCircle)
                  .style('opacity', 0.5);
                let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
                d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
                d3.select(`#${searchTextId}`).style('text-decoration', 'underline');
              }
            })
            .on('mouseout', (d: any) => {
              setGraphicOpen(false);
              setPositionModalGraphic(10000, 10000);
              let colorCircle = d3.selectAll(`#${d3.event.target.id.slice(0, -6)}`).style('fill');
              d3.selectAll(`#${d3.event.target.id.slice(0, -6)}`)
                .attr('r', radius)
                .style('fill', colorCircle)
                .style('opacity', 1);
              let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
              d3.select(`#${searchTextId}`).style('background-color', 'white');
              d3.select(`#${searchTextId}`).style('text-decoration', 'none');
            });
        });
      }
    }
  };
  const removeAllChildNodes = (parent: any) => {
    while (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      if (document.getElementById(`dotchart_detailPage`)) {
        removeAllChildNodes(document.getElementById(`dotchart_detailPage`));
      }
      getListPMTools(data[0].code_project_type_id);
      let rawData2 = data?.map((x: any, index: number) => {
        if (x?.project_status?.length) {
          let flag = x?.project_status?.some((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date);
          if (x?.project_status?.length > 0) {
            return {
              ...x,
              flag:
                x?.code_phase_types?.length ===
                  x?.project_status?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4)
                    ?.length && !flag,
              schedule: x?.project_status?.map((z: any, index: number) => {
                const orderPhaseTypes = x?.code_phase_types?.sort(
                  (a: any, b: any) => a.phase_ordinal_position - b.phase_ordinal_position,
                );
                return {
                  project_data: x,
                  objectId: index + 1,
                  type: 'rect',
                  categoryNo: index + 1,
                  from: moment(z?.planned_start_date).isValid() ? moment(z?.planned_start_date) : undefined,
                  to: moment(z?.planned_end_date).isValid() ? moment(z?.planned_end_date) : undefined,
                  status: z?.code_phase_type?.code_status_type?.status_name,
                  name: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                  phase: z?.code_phase_type?.phase_name.replaceAll(' ', ''),
                  phaseId: z.code_phase_type_id,
                  tasks: 10,
                  show:
                    x?.code_phase_types?.length ===
                      x?.project_status?.filter(
                        (ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4,
                      )?.length && !flag,
                  current: x?.phaseId === z?.code_phase_type_id,
                  isDone: z.is_done,
                  isLocked: z.is_locked,
                  currentIndex: orderPhaseTypes?.findIndex((z: any) => x?.phaseId === z?.code_phase_type_id),
                  phaseIndex: orderPhaseTypes?.findIndex((y: any) => y?.code_phase_type_id === z?.code_phase_type_id),
                };
              }),
            };
          } else {
            return {
              ...x,
              schedule: [
                {
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
                  isLocked: false,
                },
              ],
            };
          }
        } else {
          return {
            ...x,
            schedule: [
              {
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
                isLocked: false,
              },
            ],
          };
        }
      });
      phaseChart(rawData2);
    }
  }, [data, scheduleList, updateGroup]);

  useEffect(() => {
    let z = [];
    let typeProject;
    if (data.length === 0) return;
    typeProject = data[0].code_project_type_id;
    const controller = new AbortController();
    datasets
      .postData(`${SERVER.PHASE_TYPE}`, { tabKey: typeProject }, datasets.getToken(), controller.signal)
      .then(rows => {
        setPhaseList(rows);
        z = rows.map((x: any, index: number) => {
          return {
            categoryNo: index,
            from: moment('2023/11/21 00:00:00'),
            to: moment('2023/12/30 00:00:00'),
            status: x?.code_status_type?.status_name,
            name: x.phase_name,
            phase: x.phase_name,
            tasks: x.code_rule_action_items.length,
            phase_id: x.code_phase_type_id,
            tasksData: x.code_rule_action_items,
            duration: x.duration,
            duration_type: x.duration_type,
            code_phase_type_id: x.code_phase_type_id,
          };
        });
        setScheduleList(z);
        const y = rows.map((x: any) => {
          return x.code_status_type;
        });
        setStatusList(y);
        setUpdatePhaseList(!updatePhaseList);
        return rows;
      })
      .catch(e => {
        console.log(e);
      });
    return () => {
      controller.abort();
    };
  }, [actionsDone, data]);

  useEffect(() => {
    setUserBrowser(getUserBrowser());
    getActionsDone();
  }, [data?.code_project_type_id, updateAction]);

  useEffect(() => {
    const z: any = [];
    statusList.map((img: any) => {
      if (z.indexOf(img.status_name) === -1) {
        z.push(img.status_name);
      }
    });
    const counts = z.map((item1: any) => [
      item1,
      statusList.filter((item: any) => item.status_name === item1).length * labelWidth,
    ]);
    setAvailableStatusList(counts);
  }, [updatePhaseList]);

  return (
    <>
      {graphicOpen && <ModalGraphic />}
      <Row id="ProjectRoadmapHeader">
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="project-roadmap">
            PROJECT ROADMAP
          </h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row>
        <div className="roadmap-content" id="get-roadmap-content">
          <div className="roadmap-title-label" id="phaseviewTitleDetailPage" style={{}}>
            {availableStatusList.map((item: any, index: number) => {
              return (
                <p style={index === 0 ? { width: item[1], borderLeft:'none' }:{ width: item[1] }} className={index === 0 ? 'roadmap-p' : 'roadmap-pp'}>
                  <hr className="roadmap-hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                  {item[0]}
                  <hr className="roadmap-hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                </p>
              );
            })}
          </div>
          <div id="dotchart_detailPage" className="roadmap-detail-page" style={{ marginLeft: marginLeftChart }}></div>
          <div className="roadmap-title roadmap-title-detail-page" id="phaseviewTitleDetailPage">
            <div
              style={{ width: totalLabelWidth }}
              className="roadmap-title roadmap-title-width"
              id="phaseviewTitlleWidth"
            >
              {phaseList.map((item: any) => {
                return (
                  <p style={{ width: labelWidth, fontFamily: 'Ubuntu', fontSize: fontSizeLabels }}>{item.phase_name}</p>
                );
              })}
            </div>
          </div>
          <div className='roadmap-body-display ' style={{ paddingTop: paddingTopLegend }}>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#5E5FE2' }} />
              <span className='roadmap-dots-leyend'>Done</span>
            </span>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
              <span className='roadmap-dots-leyend'>Current</span>
            </span>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#D4D2D9' }} />
              <span className='roadmap-dots-leyend'>Not Started</span>
            </span>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#F5575C' }} />
              <span className='roadmap-dots-leyend'>Overdue</span>
            </span>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Roadmap;
