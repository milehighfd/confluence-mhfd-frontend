import React, { useEffect, useState } from 'react';
import { Row, Col, Collapse, Dropdown, Menu, Button, Input, Progress, Carousel, Modal, Table, message } from 'antd';

import DetailedView from '../../DetailedProblem/DetailedView';
import { FILTER_PROBLEMS_TRIGGER } from '../../../constants/constants';
 import { SERVER } from "../../../Config/Server.config";
import { Detailed } from '../../../store/types/detailedTypes';
import DetailedInfo from './DetailedInfo';
import CollapseItems from './CollapseItems';
import TeamCollaborator from './TeamCollaborator';

export default ({ type, visible, setVisible, data, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, getComponentsByProblemId, componentsOfProblems }:
  { type: string, visible: boolean, setVisible: Function, data: any, getDetailedPageProblem: Function, getDetailedPageProject: Function,
    detailed: Detailed, loaderDetailedPage: boolean, getComponentsByProblemId: Function, componentsOfProblems: any }) => {
  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
    } else {
      getDetailedPageProject(data.objectid, data.value, data.type);
      getComponentsByProblemId({id: data.id, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
    }
  }, []);
  const copyUrl = () => {
    function handler (event: any){
      let url = '';
      if (type === FILTER_PROBLEMS_TRIGGER) {
        url = `problemid=${data.problemid}`;
      } else {
        url = `objectid=${data.objectid}&cartid=${data.value}&type=${data.type}`;
      }
      event.clipboardData.setData('text/plain', SERVER.SHARE_MAP_PROJECT + '?' + url);
      event.preventDefault();
      document.removeEventListener('copy', handler, true);
    }
    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
    message.success('Copied to Clipboard!');
  }
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
              <span>{detailedPage.problemtype ? ( detailedPage.jurisdiction + ', CO' ) : (detailedPage.sponsor)}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.county} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.servicearea} </span></p>
            </Col>
            <Col span={5}>
              { 
              detailedPage.problemtype ? (
                <div className="status-d">
                <label>Solution Status <b>{detailedPage.solutionstatus}%</b></label>
                <Progress percent={detailedPage.solutionstatus} size="small" status="active" />
              </div>
              ) : (
                <div className="nn-hh">{detailedPage.status}</div>
              )
              }
              
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              {
                detailedPage.problemtype ? (
                  <div className="detailed-mm">
                    <b>${new Intl.NumberFormat("en-EN").format(detailedPage.solutioncost ? detailedPage.solutioncost : detailedPage.estimatedcost)}</b>
                  </div>
                ) : (
                  <div className="detailed-mm">
                    <b>${new Intl.NumberFormat("en-EN").format(detailedPage.finalcost ? detailedPage.finalcost : detailedPage.estimatedcost)}</b>
                  </div>
                )
              }
            </Col>
            <Col span={3} style={{ textAlign: 'right' }}>
              <Button><img src="/Icons/icon-01.svg" alt="" /></Button>
              {/* <Button><img src="/Icons/icon-06.svg" alt="" /></Button> */}
              <Button><img src="/Icons/icon-06.svg" alt="" onClick={() => copyUrl()} /></Button>
              <Button onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
          </Row>
          <Row className="detailed-b">
            <Col span={17} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }}>
              <Carousel autoplay>
                <div>
                  {detailedPage.problemid ? (
                    <div className="detailed-c"> <img height={280} width="100%" src={"gallery/" + detailedPage.problemtype + ".jpg"} /> </div>
                  ) : (
                      <div className="detailed-c"> <img height={280} width="100%" src={detailedPage.attachments.length > 0 ? detailedPage.attachments : (
                        detailedPage.projecttype === 'Capital' ? 'projectImages/capital.png' :
                          detailedPage.projecttype === 'Study' ? 'projectImages/study.png' :
                            detailedPage.projecttype === 'Maintenance' ?
                              (detailedPage.projectsubtype === 'Vegetation Mangement' ? 'projectImages/maintenance_vegetationmanagement.png' :
                                detailedPage.projectsubtype === 'Sediment Removal' ? 'projectImages/maintenance_sedimentremoval.png' :
                                  detailedPage.projectsubtype === 'Restoration' ? 'projectImages/maintenance_restoration.png' :
                                    detailedPage.projectsubtype === 'Minor Repairs' ? 'projectImages/maintenance_minorrepairs.png' :
                                      'projectImages/maintenance_debrismanagement.png') : 'Icons/eje.png'
                      )} /> </div>
                    )}
                </div>
              </Carousel>
              <DetailedInfo detailedPage={detailedPage} />
              {detailedPage.problemid ? (
                  <CollapseItems type={'problem'} data={componentsOfProblems} detailedPage={detailedPage}/>
                ) : (
                  <CollapseItems type={'project'} data={componentsOfProblems} detailedPage={detailedPage}/>
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
