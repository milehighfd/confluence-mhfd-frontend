import { Col, Input, Modal, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import * as datasets from 'Config/datasets';
import { formatter } from "./RequestViewUtil";
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import { useProfileState } from 'hook/profileHook';
import { BOARD_STATUS_TYPES, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, WORK_PLAN, WORK_PLAN_TAB, WORK_REQUEST, YEAR_LOGIC_2024 } from 'constants/constants';
import { useMapState } from 'hook/mapHook';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { SPONSOR_ID } from 'constants/databaseConstants';

const EditAmountModuleModal = ({ project, completeProjectData, visible, setVisible }: {project: any; completeProjectData:any; visible: boolean; setVisible: Function }) => {
  
  const { tabKey,year: startYear, boardStatus, namespaceId } = useRequestState();
  const {
    listComponents,
  } = useProjectState();
  const {
    getComponentsByProjectId,
    sendProjectToBoardYear
  } = useProjectDispatch();
  const { loadOneColumn } = useRequestDispatch();
  const { userInformation } = useProfileState();
  const isMaintenance = tabKey === 'Maintenance';
  const priorFundingString = 'priorFunding';
  const [maintenanceSubtype, setMaintenanceSubtype] = useState<any>();
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const { board_project_id } = project;
  const [requestFunding, setRequestFunding] = useState<any>(0);
  const [tableHeader, setTableHeader] = useState<any>([]);
  const [mainSponsor, setMainSponsor] = useState<any>({});
  const [cost, setCost] = useState<any>({})
  const startYearInt = parseInt(startYear);
  const [totalCosts, setTotalCosts] = useState<any>([]);
  const [totalCombinedSum, setTotalCombinedSum] = useState<any>(0);
  const [estimatedCostFromDB, setEstimatedCostFromDB] = useState(0);
  const widthInput = document.getElementById('colInput')?.offsetWidth;
  const desiredOrder = [88, 11, 12];
  const statusColor:any = {
    1: {color: '#FF8938', backgroundColor: 'rgba(255, 221, 0, 0.3)', projectStatus: 'Draft'},
    2: {color: '#9309EA', backgroundColor: 'rgba(94, 61, 255, 0.15)', projectStatus: 'Requested'},
    3: {color: '#139660', backgroundColor: 'rgba(143, 252, 83, 0.3)', projectStatus: 'Approved'},
    8: {color: '#FF0000', backgroundColor: 'rgba(255, 0, 0, 0.08)', projectStatus: 'Cancelled'},
    5: {color: '#139660', backgroundColor: 'rgba(143, 252, 83, 0.3)', projectStatus: 'Active'},
    9: {color: '#9309EA', backgroundColor: 'rgba(204, 146, 240, 0.2)', projectStatus: 'Closed'},
  }
  const defaultColor = {color: '#FF8938', backgroundColor: 'rgba(255, 221, 0, 0.3)', projectStatus: ''}

  const completedYears = Array.from({ length: 5 }, (_, index) => startYearInt + index);

  const orderArrayForCost = (data: any) => {
    const orderedArray = data.sort((a:any, b:any) => {

      const orderA = desiredOrder.indexOf(a.code_partner_type_id);
      const orderB = desiredOrder.indexOf(b.code_partner_type_id);
    
      if (orderA < orderB) return -1;
      if (orderA > orderB) return 1;
      return 0;
    });
    return orderedArray;
  }

  const listCounties = (project: any) => {
    let counties = '';
    project?.projectData?.project_counties?.forEach((element: any) => {
      counties = counties + element.county_name + ', ';
    });
    return counties.slice(0, counties.length - 2);
  };

  const listServiceAreas = (project: any) => {
    let serviceArea = '';
    project?.projectData?.project_service_areas?.forEach((element: any) => {
      serviceArea = serviceArea + element.service_area_name + ', ';
    });
    return serviceArea.slice(0, serviceArea.length - 2);
  }
  
  const getColorAndStatus = (status: string) => {
    const {color, backgroundColor, projectStatus} = statusColor[status] || defaultColor;
    return <span style={{color, backgroundColor}}>{projectStatus}</span>;
  }
  
  const getSumOfcosts = () => {
    let totalSum = 0;
    for(let key in cost) {
      if(key.includes('req')){
        console.log('key', key, cost[key])
        totalSum += cost[key];
      }
    }
    console.log('totalSum', totalSum)
    return totalSum;
  }

  useEffect(() => {
    let estimatedCostDB = completeProjectData.project_costs.filter((e: any) => e.code_cost_type_id === 1)[0];
    setEstimatedCostFromDB(estimatedCostDB ? estimatedCostDB.cost : 0);
    setMaintenanceSubtype(completeProjectData.code_project_type.project_type_name)
    const projectPartnersRaw = completeProjectData.project_partners;
    const projectPartners = projectPartnersRaw.filter((item:any) => item.code_partner_type_id === 11 || item.code_partner_type_id === 12 || item.code_partner_type_id === 88)
    let projectPartnerOrdered = orderArrayForCost(projectPartners)
    projectPartnerOrdered = projectPartnerOrdered.sort((a:any, b:any) => {
      if(a.code_partner_type_id === 12 && b.code_partner_type_id === 12) {
        return a.business_associate.business_name.localeCompare(b.business_associate.business_name);
      }
    })   
    const tableHeaderPartners = projectPartnerOrdered.map((partner:any) => ({
      business_name: partner.business_associate.business_name,
      code_partner_type_id: partner.code_partner_type_id
    }));
    // get sponsor of tableheaderpartners, where codepartnertypeid is 11 
    const sponsor = tableHeaderPartners.find((item:any) => item.code_partner_type_id === 11);
    setMainSponsor(sponsor);
    setTableHeader([{business_name: 'Years', code_partner_type_id: 555},...tableHeaderPartners ])

  }, [completeProjectData]);

  useEffect(() => {
    if (tabKey === 'Capital') {
      getComponentsByProjectId(project?.project_id);
    }
  }, [project])

  useEffect(() => {
    if (tabKey === 'Capital') {
      let totalCost=0;
      const costComponents = listComponents?.result?.map((item: any) => {
        return item.original_cost;
      });
      const totalComponents = costComponents?.reduce((acc: any, curr: any) => acc + curr, 0);

      const additionalAndOverheadCostIds = [4, 6, 7, 8, 9, 10, 11, 12, 13]
      const costProject = additionalAndOverheadCostIds.map((id:any) => {
        const matchingCost = completeProjectData.project_costs.find((cost:any) => cost.code_cost_type_id === id);
        return matchingCost ? matchingCost.cost : 0;
      });
      const totalProject = costProject?.reduce((acc: any, curr: any) => acc + curr, 0);

      const totalIndependent = cost?.projectData?.independent_actions.map((item: any) => {
        return item.cost;
      });
      const totalIndependentCost = totalIndependent?.reduce((acc: any, curr: any) => acc + curr, 0);
      if(totalComponents === 0 && totalIndependentCost === 0){
        let estimatedCostValue = completeProjectData.project_costs.filter((e: any) => e.code_cost_type_id === 1)[0]
        totalCost = estimatedCostValue ? parseInt(estimatedCostValue.cost) : 0;
      } else{
        totalCost = totalComponents + totalProject + totalIndependentCost;
      }
      setRequestFunding(isNaN(totalCost) ? 0 : totalCost);
    }
  }, [listComponents, cost])

  useEffect(() => {
    if (!visible) return;
    datasets.getData(
      BOARD_PROJECT_COST(board_project_id),
      datasets.getToken()
    )
      .then((res: any) => {
        let costNotOrdered =orderArrayForCost(res?.amounts);
        costNotOrdered = costNotOrdered.sort((a:any, b:any) => {
          if(a.code_partner_type_id === 12 && b.code_partner_type_id === 12) {
            return a.business_name.localeCompare(b.business_name);
          }
        })
        res.amounts = costNotOrdered;
        setCost(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
    }, [board_project_id, visible]);

    useEffect(() => {
      const totals:any = [];
        if(Object.keys(cost).length !== 0) {
          const initialAmounts = cost.amounts;
          let filteredAmounts = isWorkPlan
          ? initialAmounts.filter((item:any) => !(item.code_cost_type_id === 22 && item.code_partner_type_id !== 12))
          : initialAmounts.filter((item:any) => !(item.code_cost_type_id === 21 && item.code_partner_type_id !== 12));
        filteredAmounts = filteredAmounts.map((item:any) => {
          if (!isWorkPlan && item.code_partner_type_id === 12) {
            item.values = {
              priorFunding: item.values.priorFunding,
              req3: null,
              req1: null,
              req2: null,
              req4: null,
              req5: null
            };
          }
          return item;
        });
        filteredAmounts.forEach((item:any,index:any) => {
          const { code_partner_type_id, values } = item;

          const totalCost = Object.keys(values)
          .filter(key => key !== 'priorFunding')
          .reduce((sum, key) => sum + values[key], 0);
          if (!totals[index]) {
            totals.push({
              code_cost_type_id: item.code_cost_type_id,
              business_name: item.business_name,
              code_partner_type_id,
              totalCost,
            });
          } else {
            totals[index].totalCost += totalCost;
          }
        });
      }

      setTotalCosts(totals);

      // init: filter added to remove MHFD as cosponsor (code_partner_type_id 12) and remove cosponsor if is also sponsor
      const totalsFiltered = totals.filter((item:any) => {
        if (item.business_name === 'MHFD' && item.code_partner_type_id === 12) {
          return false;
        } else if (
          item.code_partner_type_id === 12 &&
          totals.some((otherItem:any) => otherItem.business_name === item.business_name && otherItem.code_partner_type_id === 11)
        ) {
          return false;
        }
        return true;
      });
      // end of filter
      const totalCombined = totalsFiltered.reduce((sum:any, item:any) => sum + item.totalCost, 0);
      setTotalCombinedSum(totalCombined);
    }, [cost]);

    const costDataList = useCostDataFormattingHook(tabKey, maintenanceSubtype, startYear, board_project_id, true);

    function updateMhfdBasedOnOthers(data: any, updatedReqField: string) {
      const CODE_COST_TYPE = namespaceId.type === WORK_PLAN ? 21 : 22;
      const nonMhfdEntries = data.filter((entry: any) =>  entry.code_cost_type_id === CODE_COST_TYPE && entry.business_name !== "MHFD");
      const mhfdEntries = data.filter((entry: any) => entry.code_cost_type_id === CODE_COST_TYPE && entry.business_name === "MHFD");    
      mhfdEntries.forEach((mhfdEntry: any) => {
        const isAnyNonMhfdValuePresent = nonMhfdEntries.some((nonMhfdEntry: any) => 
          nonMhfdEntry.values[updatedReqField] !== null
        );    
        if (!isAnyNonMhfdValuePresent && mhfdEntry.values[updatedReqField] === 0) {
          mhfdEntry.values[updatedReqField] = null;
        } else if (isAnyNonMhfdValuePresent && mhfdEntry.values[updatedReqField] === null) {
          mhfdEntry.values[updatedReqField] = 0;
        }
      });    
      return data;
    }
    
    const handleChange = (e: any, item: any, key:any) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      // if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      //   console.log('inputValue', inputValue);
      //   values[`req${index}`]=(+inputValue);
      // }
      const currentValue = inputValue.replace(/,/g, '');
      setCost((prev: any) => {
        const newCost = {...prev};
        const current_business_name = item.business_name;
        const current_code_cost_type_id = item.code_cost_type_id;
        const indexOfValue = newCost.amounts.findIndex((itemAmount: any) => itemAmount.business_name === current_business_name && itemAmount.code_cost_type_id === current_code_cost_type_id);
        newCost.amounts[indexOfValue].values[key] = inputValue ? (+currentValue) : null;
        updateMhfdBasedOnOthers(newCost.amounts, key);
        return newCost;
      });
    }

  function convertObjectToArrays(input: any, year: number) {
    const extraYears = [];
    const extraYearsAmounts = [];
    for (let i = 1; i <= 5; i++) {
      const value = input[`req${i}`];
      if (value !== null && value !== 0) {
        extraYears.push(+year + i - 1);
        extraYearsAmounts.push(value);
      }
    }
    return { extraYears, extraYearsAmounts };
  }

  function convertObjectToArraysMaintenance(obj: any, currentYear: number) {
    const extraYears = [];
    const extraYearsAmounts = [];
    const value = obj[`req1`];
    const valueYear2 = obj[`req11`];
    const valueYear3 = obj[`req12`];
    if (value !== null && value !== 0) {
      extraYears.push(+currentYear + 1 - 1);
      extraYearsAmounts.push(value);
    }
    if (valueYear2 !== null && valueYear2 !== 0) {
      extraYears.push(+currentYear + 2 - 1);
      extraYearsAmounts.push(valueYear2);
    }
    if (valueYear3 !== null && valueYear3 !== 0) {
      extraYears.push(+currentYear + 3 - 1);
      extraYearsAmounts.push(valueYear3);
    }
    return { extraYears, extraYearsAmounts };
  }

    const handleOkandSave = () => {
      // const send = { ...cost, isMaintenance };
      const amounts = cost.amounts;
      const filteredAmounts = amounts.filter((item:any) => {
        return !(item.business_name === 'MHFD' && item.code_partner_type_id === 11);
      });
      const send =  {amounts: filteredAmounts, isWorkPlan: isWorkPlan, isMaintenance};
      datasets.putData(
        BOARD_PROJECT_COST(board_project_id),
        send,
        datasets.getToken()
      ).then((res: any) => {
        // setCost(res.newCost);
        res.columnsChanged.forEach((columnNumber: number) => {
          loadOneColumn(columnNumber);
        });
      })
        .catch((err: any) => {
          console.log(err);
        });

      if (namespaceId.type === WORK_PLAN
        && boardStatus === 'Approved' &&
        namespaceId.year >= YEAR_LOGIC_2024
      ) {
        let subTypeSend = '';
        const MhfdAmmounts = send?.amounts?.find((obj: any) => obj.code_cost_type_id === 21);
        let years: { extraYears: number[]; extraYearsAmounts: number[] } = {extraYears:[], extraYearsAmounts:[]};  
        if (namespaceId.projecttype === 'Maintenance') {
          subTypeSend = maintenanceSubtype;
          years = convertObjectToArraysMaintenance(MhfdAmmounts?.values, namespaceId.year);
        }else{
          years = convertObjectToArrays(MhfdAmmounts?.values, namespaceId.year);
        }
        const sendBody = {
          project_id: project?.projectData?.project_id,
          year: namespaceId.year,
          extraYears: years.extraYears,
          sponsor: project?.projectData?.project_partners.find((x:any)=> x.code_partner_type_id === SPONSOR_ID)?.business_associate.business_name,
          project_type: namespaceId.projecttype,
          extraYearsAmounts: years.extraYearsAmounts,
          subType: subTypeSend,
        }
        sendProjectToBoardYear(
          sendBody.project_id,
          sendBody.year,
          sendBody.extraYears,
          sendBody.sponsor,
          sendBody.project_type,
          sendBody.extraYearsAmounts,
          sendBody.subType
        );
      }
      setVisible(false);
    }

  return (
    <Modal
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      className="edit-amount-modal"
      onOk={() => handleOkandSave()}
      okText="Save"
      cancelText="Cancel"
    >
      <Row className="edit-amount-modal-header">
        <Col className="edit-amount-modal-header-text">
          <h2>{project?.projectData?.project_name}</h2>
          <p>
            {project?.projectData?.code_project_type?.project_type_name} Project • {listCounties(project)} County •{' '}
            {listServiceAreas(project)} Service Area
          </p>
        </Col>
        <Col>
          <p>Status</p>
          {getColorAndStatus(project?.code_status_type_id)}
        </Col>
        <Col>
          <p>Phase</p>
          <span style={{ backgroundColor: '#E3EDF5', color: '#288CC4' }}>{project?.projectData?.currentId[0]?.phase_name}</span>
        </Col>
        <Col>
          <p>Estimated Cost</p>
          <h1>{formatter.format(estimatedCostFromDB)}</h1>
        </Col>
      </Row>
      <Col className="edit-amount-modal-body">
        <Row className="edit-amount-modal-body-title">
          How much funding is the Local Government providing and requesting from MHFD?
        </Row>


        <div className="edit-amount-modal-body-table">
          <Row className="edit-amount-modal-body-table-title">
            {tableHeader.length !==0 && tableHeader.map((item: any) => {
              if((item.code_partner_type_id === 11 || item.code_partner_type_id === 12) && item.business_name === 'MHFD'){
                return;
              }else if(item.code_partner_type_id === 11){
                return (
                  <Col style={{width: widthInput}}>
                    {item.business_name} <p>{'Sponsor '}
                    {isWorkPlan && <Tooltip title={
                      <div style={{zIndex:"1000"}}>
                        Requested Amounts: <br/>
                        <Row>
                          <Col>
                          {costDataList.map((year: any) => {
                          return (
                            (year.show && year.key !== priorFundingString) && <Row className='rowname'>{year.label}:</Row>
                          )
                         })}
                          </Col>
                          <Col>
                          {Object.keys(cost).length !== 0 && cost?.amounts.map((item: any) => {
                            if (item.code_cost_type_id === 22 && item.code_partner_type_id === 11) {
                              return (
                                <Col span={3} style={{paddingLeft: '10px'}}>
                                {costDataList.map((amount: any, index:number) => {
                                  return (
                                    (amount.show && amount.key !== priorFundingString) && <Row className='rowname'>
                                      ${item.values[amount.key] ? item.values[amount.key]?.toLocaleString('en-US') : '0'}
                                    </Row>
                                  )
                                })}
                                </Col>
                              )
                            }
                          })}
                          </Col>
                        </Row>
                      </div>
                    }><ExclamationCircleOutlined style={{opacity:"0.4", paddingTop: '3px'}}/></Tooltip>}</p>
                  </Col>
                )
              } else if(item.code_partner_type_id === 12){
                if (item.business_name === mainSponsor?.business_name) {
                  return;
                }
                return (
                  <Col style={{width: widthInput}}>
                    {item.business_name} <p>Co-Sponsor</p>
                  </Col>
                )
              } else if(item.code_partner_type_id === 88){
                return (
                  <Col style={{width: widthInput}}>
                    {item.business_name} Funding 
                    {isWorkPlan && <Tooltip title={
                      <div style={{zIndex:"1000"}}>
                        Requested Amounts: <br/>
                        <Row>
                          <Col>
                          {costDataList.map((year: any) => {
                          return (
                            (year.show && year.key !== priorFundingString) && <Row className='rowname'>{year.label}:</Row>
                          )
                         })}
                          </Col>
                          <Col>
                          {Object.keys(cost).length !== 0 && cost?.amounts.map((item: any) => {
                            if (item.code_cost_type_id === 22 && item.code_partner_type_id === 88) {
                              return (
                                <Col span={3} style={{paddingLeft: '10px'}}>
                                {costDataList.map((amount: any, index:number) => {
                                  return (
                                    (amount.show && amount.key !== priorFundingString) && <Row className='rowname'>
                                      ${item.values[amount.key] ? item.values[amount.key]?.toLocaleString('en-US') : '0'}
                                    </Row>
                                  )
                                })}
                                </Col>
                              )
                            }
                          })}
                          </Col>
                        </Row>
                      </div>
                    }><ExclamationCircleOutlined style={{opacity:"0.4", paddingTop: '3px'}}/></Tooltip>}
                  </Col>
                )
              }
              else { 
                return (
                  <Col style={{width: widthInput}}>
                    {item.business_name}
                  </Col>
                )
              }
            })
            }
          </Row>
          <Row>
          <Col span={3}>
            {/* <Row>Prior Funding</Row> */}
            {/* <Row className='rowname'>--</Row> */}
            <Row className='rowname'>Prior Funding</Row>
            {costDataList.map((year: any) => {
              return (
                (year.show && year.key !== priorFundingString) && <Row className='rowname'>{year.label}</Row>
              )
            })}
            {/*  <Row className='rowname'>2023</Row>
             <Row className='rowname'>2024</Row>
             <Row className='rowname'>2025</Row>
             <Row className='rowname'>2026</Row>
             <Row className='rowname'>2027</Row> */}
          </Col>
          {Object.keys(cost).length !== 0 && cost?.amounts.map((item: any) => {
            if(isWorkPlan){
              if (item.code_cost_type_id === 22 && item.code_partner_type_id !== 12) {
                return;
              }
            }else{
              if (item.code_cost_type_id === 21 && item.code_partner_type_id !== 12) {
                return;
              }
            }
            if((item.code_partner_type_id === 11 || item.code_partner_type_id === 12) && item.business_name === 'MHFD'){
              return;
            }
            if (item.code_partner_type_id === 12 && item.business_name === mainSponsor?.business_name) {
              return;
            }
            
              return (
                <Col span={3} id='colInput'>
                {/* {Object.keys(item?.values).map((amount: any, index:number) => { */}
                {costDataList.map((amount: any, index:number) => {
                  const conditionUnableInputs = (!isWorkPlan && (item.code_partner_type_id !== 88 && item.code_partner_type_id !== 11)); 
                  const isApprovedWR = boardStatus === BOARD_STATUS_TYPES.APPROVED && namespaceId.type === WORK_REQUEST;
                  const conditionPriorFunding = amount.key === priorFundingString ? true : false;
                  return (
                    amount.show && <Row className='rowInputContainer'>
                      <Input disabled={conditionUnableInputs || conditionPriorFunding || isApprovedWR} prefix="$" value={item.values[amount.key]?.toLocaleString('en-US')} onChange={(event:any) => handleChange(event, item, amount.key)} />
                    </Row>
                  )
                })}
                </Col>
              )
            
          })}
          </Row>
          <Row className="edit-amount-modal-body-table-sum">
            <Col>Total Sum Requested</Col>
            {
              totalCosts.map((item: any) => {
                if(isWorkPlan){
                  if (item.code_cost_type_id === 22 && item.code_partner_type_id !== 12) {
                    return;
                  }
                }else{
                  if (item.code_cost_type_id === 21 && item.code_partner_type_id !== 12) {
                    return;
                  }
                }
                if((item.code_partner_type_id === 11 || item.code_partner_type_id === 12) && item.business_name === 'MHFD'){
                  return;
                }
                if (item.code_partner_type_id === 12 && item.business_name === mainSponsor?.business_name) {
                  return;
                }
                  return (
                    <Col>{formatter.format(item.totalCost)}</Col>
                  )
                
              })
            }
          </Row>
          <Row className="edit-amount-modal-body-table-total">
            <Col>Total Combined Funding</Col>
            <Col>{formatter.format(totalCombinedSum)}</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      </Col>
    </Modal>
  );
};

export default EditAmountModuleModal;
