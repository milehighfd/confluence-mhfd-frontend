import { Col, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import * as datasets from 'Config/datasets';
import { formatter } from "./RequestViewUtil";
import { useRequestState } from 'hook/requestHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';

const EditAmountModuleModal = ({ project, completeProjectData, visible, setVisible }: {project: any; completeProjectData:any; visible: boolean; setVisible: Function }) => {
  
  const { tabKey,year: startYear } = useRequestState();
  const {
    listComponents,
  } = useProjectState();
  const {
    getComponentsByProjectId,
  } = useProjectDispatch();
  const { board_project_id } = project;
  const [requestFunding, setRequestFunding] = useState<any>(0);
  const [tableHeader, setTableHeader] = useState<any>([]);
  const [cost, setCost] = useState<any>({})
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
    console.log('costt', cost)
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
    console.log(listCounties(project));
  }, [project]);

  useEffect(() => {
    const projectPartners = completeProjectData.project_partners;
    let projectPartnerOrdered = orderArrayForCost(projectPartners)
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
      console.log('listComponents', listComponents)
      const costComponents = listComponents?.result?.map((item: any) => {
        return item.original_cost;
      });
      const totalComponents = costComponents?.reduce((acc: any, curr: any) => acc + curr, 0);
      const costProject = cost?.projectData?.currentCost?.map((item: any) => {
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
        res.amounts = costNotOrdered;
        setCost(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
    }, [board_project_id, visible]);

    useEffect(() => {
      console.log('cost', cost)
    }, [cost]);
    useEffect(() => {
      console.log('completeProjectData', completeProjectData)
    }, [completeProjectData]);
    const costDataList = useCostDataFormattingHook(tabKey, 'subType', startYear, board_project_id, true);

    const handleChange = (e: any) => {
      console.log('e', e)
    }

  return (
    <Modal
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      className="edit-amount-modal"
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
              if(item.code_partner_type_id === 11){
                return (
                  <Col>
                    {item.business_name} <p>Sponsor</p>
                  </Col>
                )
              } else if(item.code_partner_type_id === 12){
                return (
                  <Col>
                    {item.business_name} <p>Co-Sponsor</p>
                  </Col>
                )
              } else if(item.code_partner_type_id === 88){
                return (
                  <Col>
                    {item.business_name} Funding 
                  </Col>
                )
              }
              else { 
                return (
                  <Col>
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
            <Row className='rowname'>--</Row>
            <Row className='rowname'>2023</Row>
            <Row className='rowname'>2024</Row>
            <Row className='rowname'>2025</Row>
            <Row className='rowname'>2026</Row>
            <Row className='rowname'>2027</Row>
          </Col>
          {Object.keys(cost).length !== 0 && cost?.amounts.map((item: any) => {
            return (
              <Col span={3}>
              {Object.keys(item?.values).map((amount: any, index:number) => {
                return (
                  <Row>
                    <Input prefix="$" value={item.values[`req${index+1}`]} onChange={handleChange} />
                  </Row>
                )
              })}
              </Col>
            )
          })}
          {/* <Col span={3}>
            <Row>
              <Input prefix="$" value={'1111.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'111.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'5111.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'1111.000'} />
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Input prefix="$" value={'100.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Input prefix="$" value={'100.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Input prefix="$" value={'100.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
            <Row>
              <Input prefix="$" value={'500.000'} />
            </Row>
          </Col> */}
          </Row>
          <Row className="edit-amount-modal-body-table-sum">
            <Col>Total Sum Requested</Col>
            <Col>$500.000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
          </Row>
          <Row className="edit-amount-modal-body-table-total">
            <Col>Total Combined Funding</Col>
            <Col>$4,320,500</Col>
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
