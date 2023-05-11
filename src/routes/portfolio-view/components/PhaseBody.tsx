import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import store from 'store';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import { FILTER_PROJECTS_TRIGGER } from 'constants/constants';
import DetailModal from 'routes/detail-page/components/DetailModal';
import { getCurrentProjectStatus, getServiceAreas, getStreams, getTotalEstimatedCost } from 'utils/parsers';
import * as datasets from 'Config/datasets';
import { LIMIT_PAGINATION } from 'constants/constants';
import { colorScale } from 'routes/portfolio-view/constants/PhaseViewData';
import { usePortflioState, usePortfolioDispatch } from '../../../hook/portfolioHook';
import { useMapState } from 'hook/mapHook';

const PhaseBody = ({
  dataId,
  tabKey,
  next,
  prev,
  setNext,
  setPrev,
  index,
  phaseRef,
  totalLabelWidth,
  scheduleList,
  phaseList,
  statusCounter,
  setTollData,
  setOpenModalTollgate,
  actionsDone,
  userBrowser,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  groupName,
  setOpenPiney,
  setPopUpData,
  headerRef,
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
  phaseRef: any,
  totalLabelWidth: number,
  scheduleList: any,
  phaseList: any,
  statusCounter: any,
  setTollData: Function,
  setOpenModalTollgate: Function,
  actionsDone: any,
  userBrowser: any,
  setGrapphicOpen: Function,
  setPositionModalGraphic: Function,
  setDataModal: Function,
  groupName: string,
  setOpenPiney: Function,
  setPopUpData: Function,
  headerRef: any,
  counter:  never[],
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {
  const appUser = store.getState().profile;
  const email = appUser.userInformation?.email;
  const {
    filterProjectOptions,
  } = useMapState();

  const { currentGroup, favorites } = usePortflioState();
  const { deleteFavorite, addFavorite } = usePortfolioDispatch();
  const [updateFavorite, setUpdateFavorite] = useState(false);
  const [dataBody, setDataBody] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [phaseData, setPhaseData] = useState<any>([]);
  let limitPage = Number(counter) % LIMIT_PAGINATION > 0 ?  Math.floor(Number(counter) / LIMIT_PAGINATION + 1) : Number(counter) / LIMIT_PAGINATION;
  let svg: any;
  const windowWidth: any = window.innerWidth;
  const marginLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 45 : (windowWidth >= 2550 && windowWidth <= 3000 ? 32.5 : (windowWidth >= 2001 && windowWidth <= 2549 ? 29 : (windowWidth >= 1450 && windowWidth <= 2000 ? 20 : (windowWidth >= 1199 && windowWidth <= 1449 ? 22 : 20)))))
  const marginRight = (windowWidth >= 1900 && windowWidth <= 2549 ? 30 : (windowWidth >= 2550 && windowWidth <= 3000 ? 50 : (windowWidth >= 3001 && windowWidth <= 3999 ? 40 : 30)))
  const marginTop = (windowWidth >= 3001 && windowWidth <= 3999 ? -41.2 : (windowWidth >= 1900 && windowWidth <= 2549 ? -27 : (windowWidth >= 2550 && windowWidth <= 3000 ? -31 : -22)))
  const marginBottom = (windowWidth >= 3001 && windowWidth <= 3999 ? -40.5 : (windowWidth >= 2550 && windowWidth <= 3000 ? -43 : (windowWidth >= 1900 && windowWidth <= 2549 ? -35 : -26)))
 
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
    if (Object.keys(phaseData).length > 0) {
      phaseData.map((elem: any, index: number) => (
        elem.values.map((value: any) => (
          removeAllChildNodes(document.getElementById(`dotchart_${value.id.replace(/\s/g, '')}`))          
        ))
      ));
    }
    if (phaseData.length > 0) {     
      phaseData.forEach((element:any) => {
        element.values.forEach((value:any) => {
          phaseChart(value);
        })
      });
    }    
  }, [phaseData, windowWidth]);

  //Start of phase chart generation
  const phaseChart = (dataDotchart: any) => {
    if (Object.keys(scheduleList).length > 0) {
      let margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
      let width: any = totalLabelWidth;
      let heightDiv: any;
      heightDiv = (windowWidth >= 3001 && windowWidth <= 3999 ? 146.6 : (windowWidth >= 2550 && windowWidth <= 3000 ? 127.56 : (windowWidth >= 2001 && windowWidth <= 2549 ? 105 : (windowWidth >= 1450 && windowWidth <= 2000 ? 106.12 : (windowWidth >= 1199 && windowWidth <= 1449 ? 78 : 78)))))
      let factorHeight = (windowWidth >= 3001 && windowWidth <= 3999 ? 0 : 0);
      let height: any = factorHeight + heightDiv + 3;
      let heightContainer: any = height + margin.top + margin.bottom;
      if (heightContainer > 0) {
        removeAllChildNodes(document.getElementById(`dotchart_${dataDotchart.id.replace(/\s/g, '')}`))
        svg = d3
          .select(`#dotchart_${dataDotchart.id.replace(/\s/g, '')}`)
          .append("svg")
          .attr("width", totalLabelWidth)
          .attr("height", heightContainer)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let datas = [dataDotchart];
        let arrayForCirclesAndLines = [];
        for (var i = 0; i < scheduleList.length; i++) {
          arrayForCirclesAndLines.push(i);
        }
        let svgDefinitions = svg.append("defs");
        svg.selectAll("defs")
          .data(datas)
          .enter()
        gradientLinesClass(svgDefinitions)

        // Add X axis
        var x = d3.scaleLinear().domain([0, phaseList.length]).range([margin.left, width + margin.right]);
        let xdr: any = (r: any) => {
          let offset: any = x(r);
          return offset;
        }
        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .style('visibility', 'hidden')
          .call(d3.axisBottom(x));

        // Y axis
        var y = d3
          .scaleBand()
          .range([0, height])
          .domain(
            datas.map((d: any) => {
              return d.id.replace(/\s/g, '')
            })
          )
          .padding(1);
        svg.append("g")
          .style('visibility', 'hidden')
          .call(d3.axisLeft(y));

        let hasDateData = true;
        let button = svg.selectAll("button").data(datas).enter().append("g");
        button
          .append("rect")
          .attr('rx', 3)
          .attr('ry', 3)
          .attr("x", () => {
            let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? -25 : (windowWidth >= 2001 && windowWidth <= 2549 ? -23 : (windowWidth >= 2550 && windowWidth <= 3000 ? -20 : (windowWidth >= 1450 && windowWidth <= 2000 ? -13 : (windowWidth >= 1199 && windowWidth <= 1449 ? -10 : 10)))));
            return xdr(0) + xAddButton
          })
          .attr("width", () => {
            let widthAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 25 : (windowWidth >= 2001 && windowWidth <= 2549 ? 23 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 20 : (windowWidth >= 1199 && windowWidth <= 1449 ? -10 : 10)))));
            return xdr(0 + 1) - xdr(0) + widthAddButton;
          })
          .attr("y", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            // console.log('ydname', ydname, ydname + 10)
            let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? -15 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? -15 : (windowWidth >= 1450 && windowWidth <= 2000 ? -12 : (windowWidth >= 1199 && windowWidth <= 1449 ? -9 : 10)))));
            return ydname + yAddButton;
          })
          .attr("height", (windowWidth >= 3001 && windowWidth <= 3999 ? 40 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 32 : (windowWidth >= 1450 && windowWidth <= 2000 ? 28 : (windowWidth >= 1199 && windowWidth <= 1449 ? 25 : 25))))))
          .style("fill", "#251863")
          .style('visibility', (d: any) => {
            if (statusCounter === (d?.project_status).filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length) {
              hasDateData = false;
            }
            //return hasDateData ? 'visible':'hidden'})
            return 'hidden'
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
          .data(datas)
          .enter()
          .append("text")
          .attr("class", "circletext")
          .attr('fill', '#ffffff')
          .attr('font-size', (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11))))))
          .attr('font-weight', 600)
          .text('Add Dates')
          .attr("x", () => {
            let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 14 : (windowWidth >= 1450 && windowWidth <= 2000 ? 6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 4 : 2)))));
            return xdr(0) + xAddButton
          })
          .attr("y", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 15 : (windowWidth >= 2001 && windowWidth <= 2549 ? 13 : (windowWidth >= 2550 && windowWidth <= 3000 ? 9 : (windowWidth >= 1450 && windowWidth <= 2000 ? 7 : (windowWidth >= 1199 && windowWidth <= 1449 ? 7 : 2)))));
            return ydname + yAddButton;
          })
          .style('visibility', (d: any) => {
            if (statusCounter === (d?.project_status).filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length) {
              hasDateData = false;
            }
            return 'hidden'
          })
          .on("click", function (d: any) {
            const sendTollgate = { d, scheduleList }
            setTollData(sendTollgate);
            setOpenModalTollgate(true);
          })
          ;

        // Lines
        let z1 = true;
        let colorChange = true;
        arrayForCirclesAndLines.forEach((r) => {
          hasDateData = true
          if (r < arrayForCirclesAndLines.length - 1) {
            svg
              .selectAll("myline")
              .data(datas)
              .enter()
              .append("rect")
              .attr("x", xdr(r))
              .attr("width", xdr(r + 1) - xdr(r))
              .attr("y", (d: any) => {
                let ydname: any = y(d.id.replace(/\s/g, ''));
                return ydname;
              })
              .attr("height", 2)
              .attr("stroke", (d: any) => {
                if (d.phaseId === scheduleList[r].code_phase_type_id) {
                  return colorScale['Current'];
                } else if (d.project_status[r]?.is_done) {
                  return colorScale['Done'];
                } else {
                  return colorScale['NotStarted'];
                }
              })
              .attr("stroke", function (d: any) {
                const endDate = (d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date)
                let today = moment()
                let indexStatus;
                scheduleList.forEach((element: any, index: number) => {
                  if (d.phaseId === element.code_phase_type_id) {
                    indexStatus = index;
                  }
                });
                if (indexStatus === r) {
                  if (endDate) {
                    const diffDates = ((moment(endDate).diff(today, 'M', true)))
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
                  return `url(#Done_Current)`
                }
                else {
                  return colorScale['NotStarted'];
                }
              })
              .attr("stroke-width", "2.5px")
          }
        });
        const radius = (windowWidth >= 3001 && windowWidth <= 3999 ? 24 : (windowWidth >= 2001 && windowWidth <= 2549 ? 14 : (windowWidth >= 2550 && windowWidth <= 3000 ? 20 : (windowWidth >= 1450 && windowWidth <= 2000 ? 15 : (windowWidth >= 1199 && windowWidth <= 1449 ? 12 : 12)))));
        let circles = svg.selectAll("mycircle").data(datas).enter();
        let z = true;
        arrayForCirclesAndLines.forEach((r) => {
          hasDateData = true
          circles
            .append("circle")
            .attr('id', (d: any) => {             
              return `${d.id.replace(/\s/g, '')}_${scheduleList[r].phase_id}${d.project_id}`
              // return `${d.id.replace(/\s/g, '')}_${(scheduleList[r].phase)}`;
            })
            .attr("cx", xdr(r))
            .attr("cy", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              return ydname;
            })
            .attr("r", radius)
            .style("fill", function (d: any) {
              let indexStatus;
              const endDate = (d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date)
              let today = moment()
              scheduleList.forEach((element: any, index: number) => {
                if (d.phaseId === element.code_phase_type_id) {
                  indexStatus = index;
                }
              });
              if (indexStatus === r) {
                if (endDate) {
                  const diffDates = ((moment(endDate).diff(today, 'M', true)))
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
            })
          circles
            .append("circle")
            .attr("cx", xdr(r))
            .attr("cy", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              return ydname;
            })
            .attr("r", radius - 1)
            .style("fill", function (d: any) {
              return "white";
            })
          circles
            .append("circle")
            .attr("cx", xdr(r))
            .attr("cy", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              return ydname;
            })
            .attr("r", radius - 3)
            .style("fill", function (d: any) {
              let indexStatus;
              const endDate = (d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date)
              let today = moment()
              scheduleList.forEach((element: any, index: number) => {
                if (d.phaseId === element.code_phase_type_id) {
                  indexStatus = index;
                }
              });
              if (indexStatus === r) {
                if (endDate) {
                  const diffDates = ((moment(endDate).diff(today, 'M', true)))
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
            })
          hasDateData = true
          svg
            .selectAll("myText")
            .data(datas)
            .enter()
            .append("text")
            .attr('id', (d: any) => {
              return `${(d.id).replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}_text`
            })
            .attr('id2', (d: any) => {
              return `${(d.id).replaceAll(' ', '')}_${scheduleList[r].phase_id}${d.project_id}_text`
            })
            .attr("class", "circletext")
            .attr('fill', '#ffffff')
            .attr('font-size', (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11))))))
            .text(function (d: any) {
              let counterdown = 0;
              for (let i = 0; i < Object.keys(actionsDone).length; i++) {
                if (d.project_id === actionsDone[i].project_id) {
                  counterdown += scheduleList[r].tasksData.some((option: any) => option.code_rule_action_item_id === actionsDone[i].code_rule_action_item_id);
                }
              }
              return scheduleList[r].tasks - counterdown
            })
            .attr("x", function (d: any) {
              const factorCenter: any = (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 1.65 : (windowWidth >= 3001 && windowWidth <= 3999 ? 1.8 : (windowWidth >= 1450 && windowWidth <= 2000 ? 1.6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 1.8 : 2)))))
              let offset = 0;
              offset =
                +scheduleList[r].tasks > 9 ? xdr(r) - radius / factorCenter : xdr(r) - radius / 4;
              return offset;
            })
            .attr("y", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              return ydname + radius / 3;
            })
          hasDateData = true
          circles
            .append("circle")
            .attr('id', (d: any) => { return `${d.id.replace(/\s/g, '')}_${scheduleList[r].phase_id}${d.project_id}_outer` })
            .attr("cx", xdr(r))
            .attr("cy", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              return ydname;
            })
            .attr("r", radius + 0.5)
            .style("fill", 'white')
            .style('opacity', 0)
            .on("click", (d: any) => {             
              setOpenPiney(false)              
              let searchTextId2 = d3.event.target.id.slice(0, -6);
              let actualNumber = d3.selectAll(`#${searchTextId2}_text`).text();
              let flag = ((d?.project_status)?.find((ps: any) => !ps?.planned_start_date || !ps?.planned_end_date))
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
                  show: (statusCounter === (d?.project_status)?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length && !flag),
                  current: d?.phaseId === z?.code_phase_type_id,
                  isDone: z.is_done,
                  isLocked: z.is_locked
                };
              })
              let scheduleParsed = { ...d, schedule: dataParsed }            
              setPopUpData({
                project_name: d.rowLabel,
                phase: scheduleList[r].phase,
                project_type: d.project_type,
                phase_id: scheduleList[r].phase_id,
                project_id: d.project_id,
                d3_pos: searchTextId2,
                d3_text: actualNumber,
                mhfd: d.mhfd,
                estimated_cost: d.estimated_cost,
                data: scheduleParsed,
                scheduleList: scheduleList
              })
              setOpenPiney(true)
            })
            .on("mousemove", (d: any) => {
              let popupVisible: any = document.getElementById('popup-phaseview');
              setGrapphicOpen(true);
              let searchTextId2 = d3.event.target.id.slice(0, -6);
              let actualNumber = d3.selectAll(`#${searchTextId2.replaceAll(' ', '')}_text`).text();
              const lenghtSc = Object.keys(scheduleList[r].tasksData).length
              const phaseSc = (scheduleList[r].phase)
              const phaseId = (scheduleList[r].phase_id)
              const sendModal = { d, actualNumber: actualNumber, scheduleList: lenghtSc, schedulePhase: phaseSc, phase_id: phaseId, to:(d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date)}
              setDataModal(sendModal);
              if (popupVisible !== null) {
                let popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 280 :
                  (windowWidth >= 2550 && windowWidth <= 3000 ? 215 :
                    (windowWidth >= 2001 && windowWidth <= 2549 ? 60 :
                      (windowWidth >= 1450 && windowWidth <= 2000 ? 170 :
                        (windowWidth >= 1199 && windowWidth <= 1449 ? 140 : 140)))))
                if (userBrowser === 'Safari') {
                  popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 400 :
                    (windowWidth >= 2550 && windowWidth <= 3000 ? 335 :
                      (windowWidth >= 2001 && windowWidth <= 2549 ? 60 :
                        (windowWidth >= 1450 && windowWidth <= 2000 ? 285 :
                          (windowWidth >= 1199 && windowWidth <= 1449 ? 250 : 140)))))
                }
                if (userBrowser === 'Edge') {
                  popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 245 :
                    (windowWidth >= 2550 && windowWidth <= 3000 ? 180 :
                      (windowWidth >= 2001 && windowWidth <= 2549 ? 60 :
                        (windowWidth >= 1450 && windowWidth <= 2000 ? 170 :
                          (windowWidth >= 1199 && windowWidth <= 1449 ? 155 : 140)))))
                }
                let popupfactorLeft = 
                (windowWidth >= 3001 && windowWidth <= 3999 ? 910 : 
                  (windowWidth >= 2550 && windowWidth <= 3000 ? 620 : 
                    (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : 
                      (windowWidth >= 1450 && windowWidth <= 2000 ? 475 : 
                        (windowWidth >= 1199 && windowWidth <= 1449 ? 380 : 345)))))
                let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
                let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
                let positionTop: any = d3.event.y - heightOfPopup-20 ; // Delete 120 when the popup is fixed
                let positionLeft: any = d3.event.x - widthOfPopup / 2; //Delete 35 when the popup is fixed
                setPositionModalGraphic({ left: positionLeft, top: positionTop })
                d3.selectAll(`#${d3.event.target.id.slice(0, -6)}`).style('fill', 'white');
                let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
                d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
                d3.select(`#${searchTextId}`).style('text-decoration', 'underline');
              }
            })
            .on("mouseout", (d: any) => {
              setGrapphicOpen(false);
              setPositionModalGraphic({ left: 10000, top: 10000 })
              d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', function (d: any) {
                let indexStatus;
                const endDate = (d?.project_status?.find((x: any) => x.code_phase_type_id === d.phaseId)?.actual_end_date)
                let today = moment()
                scheduleList.forEach((element: any, index: number) => {
                  if (d.phaseId === element.code_phase_type_id) {
                    indexStatus = index;
                  }
                });
                if (indexStatus === r) {
                  if (endDate) {
                    const diffDates = ((moment(endDate).diff(today, 'M', true)))
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
              let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
              d3.select(`#${searchTextId}`).style('background-color', 'white');
              d3.select(`#${searchTextId}`).style('text-decoration', 'none');
            })
            ;
        });
      }
    }
  }

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
    let phaseD = dataParsed.map((elem: any) => {
      return {
        ...elem,
        values: dataParsed.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
      }
    });
    setPhaseData(phaseD)
  }, [dataBody, favorites])

  useEffect(() => {
    let idForFilter = dataId.id;
    if(currentGroup === 'streams' && dataId.value !== ''){
      idForFilter = dataId.value;
    }
    const controller = new AbortController();
    datasets.postData(
      SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup, idForFilter) + `?page=${page}&limit=${LIMIT_PAGINATION}&code_project_type_id=${tabKey}`,
      filterProjectOptions,
      datasets.getToken(),
      controller.signal
    ).then((res: any) => {
      setDataBody(res);
    });
    return () => {
      controller.abort();
    };
  }, [page, filterProjectOptions])

  const deleteFunction = (id: number, email: string, table: string) => {
    deleteFavorite(id);
  }
  const addFunction = (email: string, id: number, table: string) => {
    addFavorite(id);
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
          <hr className="line-progress"  style={{width: `${(((page) * 100 )/ limitPage)}%`}}/>
          {
            phaseData.map((d: any, index_elem: number) => (
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
          <div
            className="container-phase"
            ref={el => phaseRef.current[index] = el}
            onScrollCapture={(e: any) => {
              let dr: any = phaseRef.current[index];
              if (headerRef.current) {
                if (phaseRef.current) {
                  phaseRef.current.forEach((elem: any, index: number) => {
                    phaseRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                    headerRef.current.scrollTo(dr.scrollLeft, dr.scrollTop);
                  })
                }
              }
            }}>
            <div className="container-timeline"
              style={{ paddingLeft: '5px' }}>
              {phaseData.map((elem: any, index: number) => (
                elem.values.map((value: any, indexinside: number) => {
                  return <div key={`value.id${indexinside}`}>
                    <div className="phaseview-timeline" style={{ width: totalLabelWidth }}>
                      <div id={`dotchart_${value.id.replace(/\s/g, '')}`}></div>
                    </div>
                    {elem.values.length - 1 === indexinside && phaseData.length - 1 !== index ? <div className="header-timeline" style={{ width: totalLabelWidth }}></div> : ''}
                  </div>
                })
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </>
};

export default PhaseBody;