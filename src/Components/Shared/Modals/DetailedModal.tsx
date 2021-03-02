import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Progress, Carousel, Modal, message, Tooltip } from 'antd';

import { saveAs } from 'file-saver';

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
  const ciprRef = useRef(null);
  const cipjRef = useRef(null);
  const [typeDetail, setTypeDetail] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(type);
    } else {
      console.log(data);
      getDetailedPageProject(data.id || data.projectid, data.type);
      getComponentsByProblemId({id: data.id || data.projectid, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
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
    console.log(data);
    function handler (event: any){
      let url = '';
      console.log(data);
      if (type === FILTER_PROBLEMS_TRIGGER) {
        url = `problemid=${data.problemid}`;
      } else {
        url = `type=${data.type}&projectid=${data.id ? data.id: ''}`;
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

  const downloadPdf = async () => {
    if (loading) {
      return;
    }
    let url, map: any, fileName: string ;
    if (type === FILTER_PROBLEMS_TRIGGER) {
      url = `${process.env.REACT_APP_API_URI}/gallery/problem-by-id/${data.problemid}/pdf`;
      fileName = 'problem.pdf';
      let c: any = ciprRef.current;
      if (c) {
        map = await c.getCanvasBase64()
      }
    } else {
      let params = `projectid=${data.projectid}`;
      console.log('params ', params);
      url = `${process.env.REACT_APP_API_URI}/gallery/project-by-ids/pdf?${params}`;
      fileName = 'project.pdf';
      let c: any = cipjRef.current;
      if (c) {
        map = await c.getCanvasBase64();
      }
    }
    let body: any = { map };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    .then( res => res.blob() )
    .then((r) => {
      var blob = new Blob([r], {type: 'application/pdf'});
      saveAs(blob, fileName)
    })
    .finally(() => {
      setLoading(false);
    })
  }

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
            <Col xs={{ span: 24 }} lg={{ span: 13 }}>
              <h1> {detailedPage?.problemname ? detailedPage?.problemname : detailedPage?.projectname} </h1>
              <p><span>{detailedPage?.problemtype ? (detailedPage.problemtype + ' Problem') : (detailedPage.projecttype + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span>{detailedPage?.problemtype ? ( detailedPage.jurisdiction + ', CO' ) : (detailedPage.sponsor)}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.county} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage.servicearea} </span></p>
              <Button className="btn-transparent btn-close-mobile" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 5 }}>
              {
              detailedPage.problemtype ? (
                <div className="status-d">
                <label>Solution Status <b>{detailedPage.solutionstatus}%</b></label>
                <Progress percent={detailedPage.solutionstatus} size="small" status="active" />
              </div>
              ) : (
                <div className="btn-opacity">{detailedPage.status}</div>
              )
              }

            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 3 }} style={{ textAlign: 'center' }}>
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
            <Col xs={{ span: 4 }} lg={{ span: 3 }}style={{ textAlign: 'right' }}>
              <Tooltip title="Download PDF">
                <Button className={'btn-transparent mobile-display'}><img src="/Icons/icon-01.svg" className={(loading? 'rotate-download' : '')} alt="" onClick={downloadPdf} />
                </Button>
              </Tooltip>
              <Tooltip title="Copy URL">
                <Button className="btn-transparent"><img src="/Icons/icon-06.svg" alt="" onClick={() => copyUrl()} /></Button>
              </Tooltip>
              <Tooltip title="Close Window">
                <Button className="btn-transparent mobile-display" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
              </Tooltip>
            </Col>
          </Row>
          <Row className="detailed-b">
            <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }}>
              <Carousel autoplay>
                {/* <div> */}
                {console.log(detailedPage)}
                  {detailedPage.problemid ? (
                    <div className="detailed-c"> <img width="100%" src={"gallery/" + detailedPage.problemtype + ".jpg"} /> </div>
                  ) : (
                      detailedPage.attachments.length == 0 ? (
                        <div className="detailed-c"> <img width="100%" src={detailedPage.projecttype === 'Capital' ? 'projectImages/capital.jpg' :
                            detailedPage.projecttype === 'Study' ? 'projectImages/study.jpg' :
                              detailedPage.projecttype === 'Maintenance' ?
                                (detailedPage.projectsubtype === 'Vegetation Mangement' ? 'projectImages/vegetation_management.jpg' :
                                  detailedPage.projectsubtype === 'Sediment Removal' ? 'projectImages/sediment_removal.jpg' :
                                    detailedPage.projectsubtype === 'Restoration' ? 'projectImages/restoration.jpg' :
                                      detailedPage.projectsubtype === 'Minor Repairs' ? 'projectImages/minor_repairs.jpg' :
                                        'projectImages/debris_management.jpg') : 'Icons/eje.png'
                        } /> </div>
                      ) : (
                        detailedPage.attachments.map((image: string, index: number) => {
                          return <div key={index} className="detailed-c">
                            <img width="100%" height="100%" src={image} alt="" />
                          </div>
                        })
                      )

                    )}
                {/* </div> */}
              </Carousel>
              <DetailedInfo detailedPage={detailedPage} />
              {detailedPage.problemid ? (
                  <CollapseItems ref={ciprRef} type={typeDetail} data={componentsOfProblems}
                  getComponentsByProblemId={getComponentsByProblemId} id={data.problemid} typeid={'problemid'} loaderTableCompoents={loaderTableCompoents}
                   detailedPage={detailedPage} updateModal={updateModal}
                   componentCounter={componentCounter}
                   getComponentCounter={getComponentCounter} />
                ) : (
                  <CollapseItems ref={cipjRef} type={typeDetail} data={componentsOfProblems}
                  getComponentsByProblemId={getComponentsByProblemId} id={data.id} typeid={'projectid'} loaderTableCompoents={loaderTableCompoents}
                  detailedPage={detailedPage} updateModal={updateModal}
                  componentCounter={componentCounter}
                  getComponentCounter={getComponentCounter} />
              )}
            </Col>
            <Col span={7} className="mobile-display">
              <TeamCollaborator />
            </Col>
          </Row>
        </div>}
      </Modal>
    </>
  )
}
