import React, { useEffect, useState } from 'react';
import { Row, Col, Collapse, Dropdown, Menu, Button, Input, Progress, Carousel, Modal, Table } from 'antd';

import DetailedView from '../../DetailedProblem/DetailedView';
import { FILTER_PROBLEMS_TRIGGER } from '../../../constants/constants';
import { Detailed } from '../../../store/types/detailedTypes';
import DetailedInfo from './DetailedInfo';
import CollapseItems from './CollapseItems';
import TeamCollaborator from './TeamCollaborator';

export default ({ type, visible, setVisible, data, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, getComponentsByProblemId, componentsOfProblems }:
  { type: string, visible: boolean, setVisible: Function, data: any, getDetailedPageProblem: Function, getDetailedPageProject: Function,
    detailed: Detailed, loaderDetailedPage: boolean, getComponentsByProblemId: Function, componentsOfProblems: any }) => {
  // const [ spin, setSpin] = useState<boolean>(false);
  //console.log(' COMPONENTEEEEEES',getComponentsByProblemId);
  console.log('componentsOfProblems:::', componentsOfProblems, detailed, 'data:::', data);
  
  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
    } else {
      getDetailedPageProject(data.objectid, data.value, data.type);
      getComponentsByProblemId({id: data.id, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
    }
  }, []);

  /* useEffect(() => {
    getComponentsByProblemId(data.problemid);
  }, []); */
  const detailedPage = detailed as any;
  return (
    <>
      <Modal
        className="detailed-modal"
        style={{ top: 60 }}
        visible={visible}
        onCancel={() => setVisible(false)}
        forceRender={false}
        destroyOnClose>
        {/* <DetailedView
          data={data}
          setVisible={setVisible} /> */}
        {loaderDetailedPage && <div className="detailed">
          <Row className="detailed-h" gutter={[16, 8]}>
            <Col span={13}>
              <h1> {detailedPage.problemname ? detailedPage.problemname : detailedPage.projectname} </h1>
              <p><span>{detailedPage.problemtype ? (detailedPage.problemtype + ' Problem') : (detailedPage.projecttype + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span>{detailedPage.jurisdiction}, CO</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.county} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.servicearea} </span></p>
            </Col>
            <Col span={5}>
              <div className="status-d">
                <label>Solution Status <b>{detailedPage.solutionstatus}%</b></label>
                <Progress percent={detailedPage.solutionstatus} size="small" status="active" />
              </div>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <div className="detailed-mm">
                <b>${new Intl.NumberFormat("en-EN").format(detailedPage.solutioncost ? detailedPage.solutioncost : detailedPage.estimatedcost)}</b>
              </div>
            </Col>
            <Col span={3} style={{ textAlign: 'right' }}>
              <Button><img src="/Icons/icon-01.svg" alt="" /></Button>
              <Button><img src="/Icons/icon-06.svg" alt="" /></Button>
              <Button><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
          </Row>
          <Row className="detailed-b">
            <Col span={17} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }}>
              <Carousel autoplay>
                <div>
                  {detailedPage.problemid ? (
                    <div className="detailed-c"> <img height={280} width="100%" src={"gallery/" + detailedPage.problemtype + ".jpg"} /> </div>
                  ) : (
                      <div className="detailed-c"> <img height={280} width="100%" src={detailedPage.attachments ? detailedPage.attachments : (
                        detailedPage.projecttype === 'Capital' ? '/projectImages/capital.png' :
                          detailedPage.projecttype === 'Study' ? '/projectImages/study.png' :
                            detailedPage.projecttype === 'Maintenance' ?
                              (detailedPage.projectsubtype === 'Vegetation Mangement' ? '/projectImages/maintenance_vegetationmanagement.png' :
                                detailedPage.projectsubtype === 'Sediment Removal' ? '/projectImages/maintenance_sedimentremoval.png' :
                                  detailedPage.projectsubtype === 'Restoration' ? '/projectImages/maintenance_restoration.png' :
                                    detailedPage.projectsubtype === 'Minor Repairs' ? '/projectImages/maintenance_minorrepairs.png' :
                                      '/projectImages/maintenance_debrismanagement.png') : '/Icons/eje.png'
                      )} /> </div>
                    )}
                </div>
              </Carousel>
              <DetailedInfo detailedPage={detailedPage} />
              {detailedPage.problemid ? (
                  <CollapseItems type={'problem'} data={componentsOfProblems} />
                ) : (
                  <CollapseItems type={'project'} data={componentsOfProblems} />
              )}

            </Col>
            <Col span={7}>
              <TeamCollaborator />
            </Col>
          </Row>
        </div>}
      </Modal>
    </>
  )
}
