import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Progress, Carousel, Modal, message, Tooltip } from 'antd';
import * as datasets from "../../../Config/datasets";
import { saveAs } from 'file-saver';

import { FILTER_PROBLEMS_TRIGGER } from '../../../constants/constants';
 import { SERVER } from "../../../Config/Server.config";
import { Detailed } from '../../../store/types/detailedTypes';
import DetailedInfo from './DetailedInfo';
import CollapseItems from './CollapseItems';
import TeamCollaborator from './TeamCollaborator';
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { useDetailedState } from '../../../hook/detailedHook';

const DetailedModal = ({
  type,
  visible,
  setVisible,
  data,
  detailed
}: {
  type: string,
  visible: boolean,
  setVisible: Function,
  data: any,
  detailed: Detailed
}) => {
  const {
    spin: loaderDetailedPage
  } = useDetailedState();
  const {
    componentsByProblemId: componentsOfProblems
  } = useMapState();
  const {
    getDetailedPageProblem,
    getDetailedPageProject,
    getComponentsByProblemId,
    resetDetailed
  } = useMapDispatch();
  useEffect(() => {
    console.log(detailed);
  }, [detailed]);

  const ciprRef = useRef(null);
  const cipjRef = useRef(null);
  const [typeDetail, setTypeDetail] = useState('');
  const [loading, setLoading] = useState(false);
  const [problemPart, setProblemPart] = useState<any[]>([]);
  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(type);
      datasets.getData(SERVER.PROBLEM_PARTS_BY_ID + '/' + data.problemid, datasets.getToken()).then(data => {
        const t: any[] = [];
        data.data.forEach((element: any) => {
          element.forEach((d: any, idnex: number) => {
            t.push(d);
          })
        });
        t.sort((a: any, b: any) => {
          if (a.problem_type.localeCompare(b.problem_type) === 0) {
            if (a.problem_part_category.localeCompare(b.problem_part_category) === 0) {
              return a.problem_part_subcategory.localeCompare(b.problem_part_subcategory);
            }
            return a.problem_part_category.localeCompare(b.problem_part_category);
          }
          return a.problem_type.localeCompare(b.problem_type);
        });
        setProblemPart(t);
      });
    } else {
      console.log('my data after clicking ', data);
      getDetailedPageProject(data.project_id);
      getComponentsByProblemId({id: data.id || data.projectid, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(type);
    }
    return () => {
      resetDetailed();
    };
  }, []);

  
  const updateModal = (problemId: any) => {
    setTypeDetail(FILTER_PROBLEMS_TRIGGER);
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
        url = `type=${data.type}&project_id=${data.project_id}`;
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
    setLoading(true);
    if (type === FILTER_PROBLEMS_TRIGGER) {
      url = `${process.env.REACT_APP_API_URI}/gallery/problem-by-id/${data.problemid}/pdf`;
      fileName = 'problem.pdf';
      let c: any = ciprRef.current;
      if (c) {
        map = await c.getCanvasBase64()
      }
    } else {
      let params = `projectid=${data.id ? data.id : data.projectid}`;
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

  useEffect(() => {
    console.log('detailedPage', detailedPage);
  }, [detailedPage]);
  return (
    <>
      <Modal
        className="detailed-modal"
        style={{ top: 30 }}
        visible={visible}
        onCancel={() => setVisible(false)}
        forceRender={false}
        destroyOnClose>
        {loaderDetailedPage && <div className="detailed">
          <Row className="detailed-h" gutter={[16, 8]}>
            <Col xs={{ span: 24 }} lg={{ span: 13 }}>
              <h1> {detailedPage?.problemname ? detailedPage?.problemname : detailedPage?.project_name} </h1>
              <p><span>{detailedPage?.problemtype ? (detailedPage?.problemtype + ' Problem') : (detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span>{detailedPage?.problemtype ? ( detailedPage?.jurisdiction + ', CO' ) : ('TODO ADD SPONSOR ON BACKEND')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage?.codeStateCounty.county_name + ' County'} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
              <span> {detailedPage?.codeServiceArea.service_area_name + ' Service Area'} </span></p>
              <Button className="btn-transparent btn-close-mobile" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 5 }}>
              {
              detailedPage?.problemtype ? (
                <div className="status-d">
                <label>Solution Status <b>{detailedPage?.solutionstatus ? detailedPage?.solutionstatus : 0}%</b></label>
                <Progress percent={detailedPage?.solutionstatus ? detailedPage?.solutionstatus : 0} size="small" status="active" />
              </div>
              ) : (
                <div className="btn-opacity">{detailedPage?.project_status?.code_phase_type?.code_status_type?.status_name ?
                  detailedPage?.project_status?.code_phase_type?.code_status_type?.status_name: 'N/A'}</div>
              )
              }

            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 3 }} style={{ textAlign: 'center' }}>
              {
                detailedPage?.problemtype ? (
                  <div className="detailed-mm">
                    <b>{ 
                      (detailedPage?.estimatedcost
                      ? 
                        ('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format((detailedPage?.estimatedcost)))
                        : 
                        (detailedPage?.component_cost?( '$'+ new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(detailedPage?.component_cost)): 'No Cost Data'))}
                    </b>
                  </div>
                ) : (
                  <div className="detailed-mm">
                    <b>{ 
                      (detailedPage?.sumCost != null ?('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(detailedPage?.sumCost)): 'No Cost Data')}
                    </b>
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
                  {detailedPage?.problemid ? (
                    <div className="detailed-c"> <img  src={"detailed/" + detailedPage?.problemtype + ".png"} /> </div>
                  ) : (
                      detailedPage?.attachments?.length == 0 ? (
                        <div className="detailed-c"> <img  src={detailedPage?.projecttype === 'Capital' ? 'detailed/capital.png' :
                            detailedPage?.projecttype === 'Study' ? 'projectImages/study.jpg' :
                              detailedPage?.projecttype === 'Maintenance' ?
                                (detailedPage?.projectsubtype === 'Vegetation Management' ? 'detailed/vegetation-management.png' :
                                  detailedPage?.projectsubtype === 'Sediment Removal' ? 'detailed/sediment-removal.png' :
                                    detailedPage?.projectsubtype === 'Restoration' ? 'detailed/restoration.png' :
                                      detailedPage?.projectsubtype === 'Minor Repairs' ? 'detailed/minor-repairs.png' :
                                        'detailed/debris-management.png') : 'Icons/eje.png'
                        } /> </div>
                      ) : (
                        detailedPage?.attachments && detailedPage?.attachments.map((image: string, index: number) => {
                          return <div key={index} className="detailed-c">
                            <img width="100%" height="100%" src={image} alt="" />
                          </div>
                        })
                      )

                    )}
              </Carousel>
              <DetailedInfo detailedPage={detailedPage} />
              {detailedPage?.problemid ? (
                  <CollapseItems ref={ciprRef} type={typeDetail} data={componentsOfProblems}
                    id={data.problemid} typeid={'problemid'}
                    detailedPage={detailedPage} updateModal={updateModal}
                    problemParts={problemPart}
                  />
                ) : (
                  <CollapseItems ref={cipjRef} type={typeDetail} data={componentsOfProblems}
                    id={data.id} typeid={'projectid'}
                    detailedPage={detailedPage} updateModal={updateModal}
                  />
              )}
            </Col>
            <Col span={7} className="mobile-display" style={{opacity:'0.7'}}>
              <TeamCollaborator />
            </Col>
          </Row>
        </div>}
      </Modal>
    </>
  )
}

export default DetailedModal;
