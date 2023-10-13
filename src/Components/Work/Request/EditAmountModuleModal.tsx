import { Col, Input, Modal, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import * as datasets from 'Config/datasets';
import { formatter } from "./RequestViewUtil";
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import { useProfileState } from 'hook/profileHook';
import { BOARD_STATUS_TYPES, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, WORK_PLAN_TAB } from 'constants/constants';
import { useMapState } from 'hook/mapHook';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const EditAmountModuleModal = ({ project, completeProjectData, visible, setVisible }: {project: any; completeProjectData:any; visible: boolean; setVisible: Function }) => {
  
  const { tabKey,year: startYear, boardStatus } = useRequestState();
  const {
    listComponents,
  } = useProjectState();
  const {
    getComponentsByProjectId,
  } = useProjectDispatch();
  const { loadOneColumn } = useRequestDispatch();
  const { userInformation } = useProfileState();
  const isMaintenance = tabKey === 'Maintenance';
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const { board_project_id } = project;
  const [requestFunding, setRequestFunding] = useState<any>(0);
  const [tableHeader, setTableHeader] = useState<any>([]);
  const [cost, setCost] = useState<any>({})
  const startYearInt = parseInt(startYear);
  const [totalCosts, setTotalCosts] = useState<any>([]);
  const [totalCombinedSum, setTotalCombinedSum] = useState<any>(0);
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
    setTableHeader([{business_name: 'Years', code_partner_type_id: 555},...tableHeaderPartners ])

  }, [completeProjectData]);

  useEffect(() => {
    if (tabKey === 'Capital') {
      getComponentsByProjectId(project?.project_id);
    }
  }, [project])

  useEffect(() => {
    if (tabKey === 'Capital') {
      const costComponents = listComponents?.result?.map((item: any) => {
        return item.original_cost;
      });
      const totalComponents = costComponents?.reduce((acc: any, curr: any) => acc + curr, 0);
      const costWithoutMHFD = completeProjectData.project_costs.filter((item:any) => item.code_cost_type_id !== 22)
      const costProject = costWithoutMHFD.map((item: any) => {
        return item.cost;
      });
      const totalProject = costProject?.reduce((acc: any, curr: any) => acc + curr, 0);
      const totalIndependent = cost?.projectData?.independent_actions.map((item: any) => {
        return item.cost;
      });
      const totalIndependentCost = totalIndependent?.reduce((acc: any, curr: any) => acc + curr, 0);
      let totalCost = totalComponents + totalProject + totalIndependentCost;
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
        cost.amounts.forEach((item:any,index:any) => {
          const { code_partner_type_id, values } = item;
          const totalCost = Object.values(values).reduce((sum:any, value:any) => (value ? sum + value : sum), 0);

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
      const totalCombined = totals.reduce((sum:any, item:any) => sum + item.totalCost, 0);
      setTotalCombinedSum(totalCombined);
    }, [cost]);

    const costDataList = useCostDataFormattingHook(tabKey, 'subType', startYear, board_project_id, true);

    const handleChange = (e: any, item: any, index:any) => {
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
        newCost.amounts[indexOfValue].values[`req${index}`] = inputValue ? (+currentValue) : null;
        return newCost;
      });
    }
    const handleOkandSave = () => {
      // const send = { ...cost, isMaintenance };
      const amounts = cost.amounts;
      const filteredAmounts = amounts.filter((item:any) => {
        return !(item.business_name === 'MHFD' && item.code_partner_type_id === 11);
      });
      const send =  {amounts: filteredAmounts, isWorkPlan: isWorkPlan};
      console.log('send', send)
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
      cancelText="Clear"
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
          <h1>{formatter.format(requestFunding)}</h1>
        </Col>
      </Row>
      <Col className="edit-amount-modal-body">
        <Row className="edit-amount-modal-body-title">
          How much funding is the Local Government providing and requesting from MHFD?
        </Row>


        <div className="edit-amount-modal-body-table">
          <Row className="edit-amount-modal-body-table-title">
            {tableHeader.length !==0 && tableHeader.map((item: any) => {
              if(item.code_partner_type_id === 11 && item.business_name === 'MHFD'){
                return;
              }else if(item.code_partner_type_id === 11){
                return (
                  <Col style={{width: widthInput}}>
                    {item.business_name} <p>Sponsor</p>
                  </Col>
                )
              } else if(item.code_partner_type_id === 12){
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
                          {completedYears.map((year: any) => {
                          return (
                            <Row className='rowname'>{year}:</Row>
                          )
                         })}
                          </Col>
                          <Col>
                          {Object.keys(cost).length !== 0 && cost?.amounts.map((item: any) => {
                            if (item.code_cost_type_id === 22 && item.code_partner_type_id === 88) {
                              return (
                                <Col span={3} style={{paddingLeft: '10px'}}>
                                {Object.keys(item?.values).map((amount: any, index:number) => {
                                  return (
                                    <Row className='rowname'>
                                      ${item.values[`req${index+1}`] ? item.values[`req${index+1}`]?.toLocaleString('en-US') : '0'}
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
                    }><ExclamationCircleOutlined style={{opacity:"0.4"}}/></Tooltip>}
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
            {completedYears.map((year: any) => {
              return (
                <Row className='rowname'>{year}</Row>
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
              if(item.code_partner_type_id === 11 && item.business_name === 'MHFD'){
                return;
              }
              if (item.code_cost_type_id === 22 && item.code_partner_type_id === 88) {
                return;
              }
            }else{
              if (item.code_cost_type_id === 21) {
                return;
              }
            }
              return (
                <Col span={3} id='colInput'>
                {Object.keys(item?.values).map((amount: any, index:number) => {
                  const conditionUnableInputs = (!isWorkPlan && (item.code_partner_type_id !== 88 && item.code_partner_type_id !== 11)) || boardStatus === BOARD_STATUS_TYPES.APPROVED ? true : false;

                  return (
                    <Row className='rowInputContainer'>
                      <Input disabled={conditionUnableInputs} prefix="$" value={item.values[`req${index+1}`]?.toLocaleString('en-US')} onChange={(event:any) => handleChange(event, item, index+1)} />
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
                  if(item.code_partner_type_id === 11 && item.business_name === 'MHFD'){
                    return;
                  }
                  if (item.code_cost_type_id === 22 && item.code_partner_type_id === 88) {
                    return;
                  }
                }else{
                  if (item.code_cost_type_id === 21) {
                    return;
                  }
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
