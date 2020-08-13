import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Progress, Carousel, Modal, message } from 'antd';

import { FILTER_PROBLEMS_TRIGGER } from '../../../constants/constants';
 import { SERVER } from "../../../Config/Server.config";
import { Detailed } from '../../../store/types/detailedTypes';
import DetailedInfo from './DetailedInfo';
import CollapseItems from './CollapseItems';
import TeamCollaborator from './TeamCollaborator';

export default ({ type, visible, setVisible, data, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, getComponentsByProblemId,
    componentsOfProblems, loaderTableCompoents, componentCounter,
    getComponentCounter }:
  { type: string, visible: boolean, setVisible: Function, data: any, getDetailedPageProblem: Function, getDetailedPageProject: Function,
    detailed: Detailed, loaderDetailedPage: boolean, getComponentsByProblemId: Function, componentsOfProblems: any, loaderTableCompoents: boolean, componentCounter: number,
    getComponentCounter: Function }) => {

  const [typeDetail, setTypeDetail] = useState('');
  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      if(data.problemId){
        getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
      }
      setTypeDetail(type);
    } else {
      getDetailedPageProject(data.objectid, data.value, data.type);
      if(data.id){
        getComponentsByProblemId({id: data.id, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
      }
      setTypeDetail(type);
    }
  }, []);

  const updateModal = (problemId: number) => {
    //console.log('PROBLEM ID ', problemId);
    setTypeDetail(FILTER_PROBLEMS_TRIGGER);
    //console.log('CAMBIO DE TIPO ', typeDetail);
    getDetailedPageProblem(problemId);
    getComponentsByProblemId({id: problemId, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
  }
  const copyUrl = () => {
    function handler (event: any){
      let url = '';
      if (type === FILTER_PROBLEMS_TRIGGER) {
        url = `problemid=${data.problemid}`;
      } else {
        url = `objectid=${data.objectid}&cartoid=${data.value}&type=${data.type}&id=${data.id ? data.id: ''}`;
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
              <h1> {detailedPage?.problemname ? detailedPage?.problemname : detailedPage?.projectname} </h1>
              <p><span>{detailedPage?.problemtype ? (detailedPage.problemtype + ' Problem') : (detailedPage.projecttype + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span>{detailedPage?.problemtype ? ( detailedPage.jurisdiction + ', CO' ) : (detailedPage.sponsor)}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
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
              <Button className="disabled-btn"><img src="/Icons/icon-01.svg" alt="" /></Button>
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
                    <div className="detailed-c"> <img width="100%" src={"gallery/" + detailedPage.problemtype + ".jpg"} /> </div>
                  ) : (
                      <div className="detailed-c"> <img width="100%" src={detailedPage.attachments ? detailedPage.attachments : (
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
                  <CollapseItems type={typeDetail} data={componentsOfProblems}
                  getComponentsByProblemId={getComponentsByProblemId} id={data.problemid} typeid={'problemid'} loaderTableCompoents={loaderTableCompoents}
                   detailedPage={detailedPage} updateModal={updateModal}
                   componentCounter={componentCounter}
                   getComponentCounter={getComponentCounter} />
                ) : (
                  <CollapseItems type={typeDetail} data={componentsOfProblems}
                  getComponentsByProblemId={getComponentsByProblemId} id={data.id} typeid={'projectid'} loaderTableCompoents={loaderTableCompoents}
                  detailedPage={detailedPage} updateModal={updateModal}
                  componentCounter={componentCounter}
                  getComponentCounter={getComponentCounter} />
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
