import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import ImageModal from 'Components/Shared/Modals/ImageModal';
import { SERVER } from 'Config/Server.config';
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip, message } from 'antd';
import { ADMIN, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, STAFF } from 'constants/constants';
import { saveAs } from 'file-saver';
import { useDetailedState } from 'hook/detailedHook';
import { useMapDispatch } from 'hook/mapHook';
import { toJpeg } from 'html-to-image';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import PineyView from 'routes/portfolio-view/components/PineyView';
import store from 'store/index';
import TeamCollaborator from 'Components/Shared/Modals/TeamCollaborator';
import * as datasets from 'Config/datasets';
import {
  getCounties,
  getCurrentProjectStatus,
  getJurisdictions,
  getServiceAreas,
  getSponsors,
  getStreams,
  getTotalEstimatedCost,
} from 'utils/parsers';
import ComponentSolucions from './ComponentSolucions';
import ComponentSolucionsByProblems from './ComponentSolutionByProblems';
import DetailInformationProblem from './DetailInformationProblem';
import DetailInformationProject from './DetailInformationProject';
import Documents from './Documents';
import Financials from './Financials';
import GalleryDetail from './GalleryDetail';
import History from './History';
import Map from './Map';
import ProblemParts from './ProblemParts';
import ProblemsProjects from './ProblemsProjects';
import Roadmap from './Roadmap';
import Vendors from './Vendors';
import ModalTollgate from 'routes/list-view/components/ModalTollgate';
import { useAttachmentDispatch, useAttachmentState } from 'hook/attachmentHook';

const DetailModal = ({
  visible,
  setVisible,
  data,
  type,
  deleteCallback,
  addCallback,
  addFavorite,
}: {
  visible: boolean;
  setVisible: Function;
  data: any;
  type: string;
  deleteCallback?: any;
  addCallback?: any;
  addFavorite?: any;
}) => {
  const { getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId, resetDetailed } = useMapDispatch();
  const { detailed } = useDetailedState();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const project_idS = query.get('project_id') || data?.project_id;
  const problem_idS = query.get('problem_id') || data?.problemid;
  const ciprRef = useRef(null);
  const cipjRef = useRef(null);
  const typeS = query.get('type') || type;
  const [isLoading, setIsLoading] = useState(true);
  const [openSecction, setOpenSecction] = useState(0);
  const [projectType, setProjecttype] = useState('');
  const [active, setActive] = useState(0);
  const [openPiney, setOpenPiney] = useState(false);
  const [activeScroll, setActiveScroll] = useState(true);
  const [openImage, setOpenImage] = useState(false);
  const [problemPart, setProblemPart] = useState<any[]>([]);
  const [dataRoadmap, setDataRoadmap] = useState<any[]>([]);
  const [updateAction, setUpdateAction] = useState(false);
  const appUser = store.getState().profile.userInformation;
  const [coverImage, setCoverImage] = useState<any>('');

  let divRef = useRef<null | HTMLDivElement>(null);
  let carouselRef = useRef<undefined | any>(undefined);
  const { getAttachmentProjectId } = useAttachmentDispatch();
  const { attachments } = useAttachmentState();
  useEffect(() => {
    if (detailed?.project_id) {
      getAttachmentProjectId(detailed.project_id);
    }
  }, [detailed]);
  useEffect(() => {
    if (attachments.data) {
      attachments?.data
        ?.filter(
          (_: any) => _.mime_type?.includes('png') || _.mime_type?.includes('jpeg') || _.mime_type?.includes('jpg'),
        )
        .forEach((file: any) => {
          if (file.is_cover) {
            setCoverImage(file.attachment_url);
          }
        });
    }
  }, [attachments]);
  useEffect(() => {
    resetDetailed();
    if (typeS === FILTER_PROBLEMS_TRIGGER) {
      console.log('PROBLEM', problem_idS);
      getDetailedPageProblem(problem_idS);
      getComponentsByProblemId({ id: problem_idS, typeid: 'problemid', sortby: 'type', sorttype: 'asc' });
      datasets.getData(SERVER.PROBLEM_PARTS_BY_ID + '/' + problem_idS, datasets.getToken()).then(data => {
        const t: any[] = [];
        data.data.forEach((element: any) => {
          element.forEach((d: any, idnex: number) => {
            t.push(d);
          });
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
      const project_id = project_idS ? +project_idS : +problem_idS ? +problem_idS : 0;
      getDetailedPageProject(project_id);
      getComponentsByProblemId({
        id: data?.on_base || project_id || data?.id || data?.cartodb_id,
        typeid: 'projectid',
        sortby: 'type',
        sorttype: 'asc',
      });
    }
  }, []);
  useEffect(() => {
    const projectType = detailed?.code_project_type?.project_type_name;
    setProjecttype(projectType);
    const roadmapData = [];
    if (detailed && Object.keys(detailed).length !== 0) {
      roadmapData.push({
        id: `${detailed.project_id}`,
        project_id: detailed.project_id,
        code_project_type_id: detailed.code_project_type_id,
        headerLabel: detailed.project_name,
        rowLabel: detailed.project_name, //description
        date: moment('2022/08/11'),
        key: detailed.project_id,
        phase: getCurrentProjectStatus(detailed)?.code_phase_type?.phase_name,
        phaseId: getCurrentProjectStatus(detailed)?.code_phase_type_id,
        mhfd:
          detailed?.project_staffs && detailed?.project_staffs.length > 0
            ? detailed?.project_staffs.reduce((accumulator: string, pl: any) => {
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
              }, '')
            : [],
        mhfd_support: null,
        lg_lead: null,
        developer: null,
        consultant:
          detailed?.project_partners && detailed?.project_partners.length > 0
            ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
                const sa = pl?.business_associate?.business_name || '';
                const sa1 = pl?.code_partner_type_id || '';
                let value = accumulator;
                if (sa && sa1 === 3) {
                  if (value) {
                    value += ',';
                  }
                  value += sa;
                }
                return value;
              }, '')
            : [], //'detailed?.consultants[0]?.consultant[0]?.business_name',
        civil_contractor:
          detailed?.project_partners && detailed?.project_partners.length > 0
            ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
                const sa = pl?.business_associate?.business_name || '';
                const sa1 = pl?.code_partner_type_id || '';
                let value = accumulator;
                if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
                  if (value) {
                    value += ',';
                  }
                  value += sa;
                }
                return value;
              }, '')
            : [], // 'detailed?.civilContractor[0]?.business[0]?.business_name',
        landscape_contractor:
          detailed?.project_partners && detailed?.project_partners.length > 0
            ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
                const sa = pl?.business_associate?.business_name || '';
                const sa1 = pl?.code_partner_type_id || '';
                let value = accumulator;
                if (sa && sa1 === 9) {
                  if (value) {
                    value += ',';
                  }
                  value += sa;
                }
                return value;
              }, '')
            : [], // 'detailed?.landscapeContractor[0]?.business[0]?.business_name',
        construction_start_date:
          detailed?.project_status?.code_phase_type?.code_phase_type_id === 125
            ? detailed?.project_status?.planned_start_date
            : detailed?.project_status?.actual_start_date, //detailed?.construction_start_date,
        jurisdiction_id:
          detailed?.project_local_governments && detailed?.project_local_governments.length > 0
            ? detailed?.project_local_governments.reduce((accumulator: Array<string>, pl: any) => {
                const sa = pl?.CODE_LOCAL_GOVERNMENT?.code_local_government_id || '';
                let value = accumulator;
                if (sa) {
                  value = [...value, sa];
                }
                return value;
              }, '')
            : [],
        county_id:
          detailed?.project_counties && detailed?.project_counties.length > 0
            ? detailed?.project_counties?.reduce((accumulator: Array<string>, pl: any) => {
                const county = pl?.CODE_STATE_COUNTY?.state_county_id || '';
                let value = accumulator;
                if (county) {
                  value = [...value, county];
                }
                return value;
              }, '')
            : [],
        servicearea_id:
          detailed?.project_service_areas && detailed?.project_service_areas.length > 0
            ? detailed?.project_service_areas.reduce((accumulator: Array<string>, pl: any) => {
                const sa = pl?.CODE_SERVICE_AREA?.code_service_area_id || '';
                let value = accumulator;
                if (sa) {
                  value = [...value, sa];
                }
                return value;
              }, '')
            : [],
        consultant_id:
          detailed?.project_partners && detailed?.project_partners.length > 0
            ? detailed?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
                const sa = pl?.business_associate?.business_associates_id || '';
                const sa1 = pl?.code_partner_type_id || '';
                let value = accumulator;
                if (sa && sa1 === 3) {
                  value = [...value, sa];
                }
                return value;
              }, '')
            : [],
        contractor_id:
          detailed?.project_partners && detailed?.project_partners.length > 0
            ? detailed?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
                const sa = pl?.business_associate?.business_associates_id || '';
                const sa1 = pl?.code_partner_type_id || '';
                let value = accumulator;
                if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
                  value = [...value, sa];
                }
                return value;
              }, '')
            : [],
        local_government:
          detailed?.project_local_governments && detailed?.project_local_governments.length > 0
            ? detailed?.project_local_governments.reduce((accumulator: string, pl: any) => {
                const sa = pl?.CODE_LOCAL_GOVERNMENT?.local_government_name || '';
                let value = accumulator;
                if (sa) {
                  if (value) {
                    value += ',';
                  }
                  value += sa;
                }
                return value;
              }, '')
            : [],
        on_base: detailed?.onbase_project_number,
        total_funding: null,
        project_sponsor: detailed?.project_partners ? getSponsors(detailed.project_partners) : {},
        project_type: detailed?.code_project_type?.project_type_name,
        status: getCurrentProjectStatus(detailed)?.code_phase_type?.code_status_type?.status_name || '',
        project_status: detailed?.project_statuses
          ? detailed?.project_statuses.filter(
              (ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4,
            )
          : {},
        service_area: getServiceAreas(detailed?.project_service_areas || []),
        county: getCounties(detailed?.project_counties || []),
        estimated_cost: getTotalEstimatedCost(detailed?.project_costs),
        stream: getStreams(detailed?.project_streams || []).join(' , '),
        contact: 'ICON',
        view: 'id',
        options: 'red',
        schedule: [
          {
            objectId: 1,
            type: 'rect',
            categoryNo: 1,
            from: moment('2022/06/22 07:30:00'),
            to: moment('2022/07/01 08:30:00'),
            status: 'completed',
            name: 'Draft',
            phase: 'Draft',
            tasks: 6,
            show: false,
            current: false,
          },
          {
            objectId: 2,
            type: 'rect',
            categoryNo: 2,
            from: moment('2022/07/02 00:00:00'),
            to: moment('2022/07/21 07:00:00'),
            status: 'completed',
            name: 'Work Request',
            phase: 'WorkRequest',
            tasks: 8,
            show: false,
            current: false,
          },
          {
            objectId: 3,
            type: 'rect',
            categoryNo: 3,
            from: moment('2022/07/22 08:30:00'),
            to: moment('2022/08/17 10:00:00'),
            status: 'completed',
            name: 'Work Plan',
            phase: 'WorkPlan',
            tasks: 12,
            show: false,
            current: false,
          },
          {
            objectId: 4,
            type: 'rect',
            categoryNo: 4,
            from: moment('2022/08/18 08:30:00'),
            to: moment('2022/09/10 10:00:00'),
            status: 'active',
            name: 'Start Up',
            phase: 'StartUp',
            tasks: 32,
            show: false,
            current: false,
          },
        ],
      });
    }
    setDataRoadmap(roadmapData);
  }, [detailed]);

  useEffect(() => {
    let mapCanvas: any;
    mapCanvas = document.querySelector('.mapboxgl-canvas');
    if (mapCanvas instanceof HTMLCanvasElement) {
      if (detailed?.problemname || detailed?.project_name) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } else {
      if (detailed?.problemname || detailed?.project_name) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }
  }, [detailed]);

  const copyUrl = () => {
    function handler(event: any) {
      let origin = `${window.location.origin.toString()}/detailed-modal`;
      let url = '';
      if (typeS === FILTER_PROBLEMS_TRIGGER) {
        console.log('problem');
        url = `type=Problems&problem_id=${problem_idS}`;
      } else {
        console.log('project');
        url = `type=Projects&project_id=${project_idS}`;
      }
      event.clipboardData.setData('text/plain', origin + '?' + url);
      event.preventDefault();
      document.removeEventListener('copy', handler, true);
    }
    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
    message.success('Copied to Clipboard!');
  };

  const downloadPdf = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    let url: string;
    let fileName: string;
    let map: any;
    let roadMap: any;
    if (typeS === FILTER_PROBLEMS_TRIGGER) {
      url = `${process.env.REACT_APP_API_URI}/gallery/problem-by-id/${problem_idS}/pdf`;
      fileName = 'problem.pdf';
      let c: any = ciprRef.current;
      if (c) {
        map = await c.getCanvasBase64();
      }
    } else {
      url = `${process.env.REACT_APP_API_URI}/gallery/project-pdf/${detailed.project_id}`;
      fileName = 'project.pdf';
      let c: any = cipjRef.current;
      if (c) {
        map = await c.getCanvasBase64();
      }
    }
    const roadMapSelector = document.getElementById('get-roadmap-content');
    const widthCustom = roadMapSelector?.scrollWidth ? roadMapSelector?.scrollWidth + 50 : 1250;
    const heightCustom = roadMapSelector?.scrollHeight ? roadMapSelector?.scrollHeight + 10 : 250;
    if (roadMapSelector) {
      roadMap = await toJpeg(roadMapSelector, {
        width: widthCustom,
        height: heightCustom,
        style: {
          overflow: 'visible',
          fontFamily: 'Ubuntu',
          border: 'none',
          borderColor: 'transparent',
          backgroundColor: 'white',
        },
      });
    }

    let body = { mapImage: map, roadMap, appUser };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then(res => res.blob())
      .then(r => {
        var blob = new Blob([r], { type: 'application/pdf' });
        saveAs(blob, fileName);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const toCamelCase = (str: string): string => {
    return str.toLowerCase().replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  };
  const activeTab = (numberTab: number, nameLink: string) => {
    if (activeScroll) {
      window.location.href = nameLink;
      setActiveScroll(false);
      setOpenSecction(numberTab);
      setTimeout(() => {
        setActiveScroll(true);
      }, 1850);
    }
  };
  return (
    <>
      <ModalTollgate setOpenPiney={setOpenPiney} />
      <ImageModal
        visible={openImage}
        setVisible={setOpenImage}
        type={typeS}
        active={active}
        setActive={setActive}
        copyUrl={copyUrl}
        deleteCallback={deleteCallback}
        addCallback={addCallback}
        addFavorite={addFavorite}
      />
      <Modal
        className="detailed-modal modal-detailed-modal"
        style={{ top: 30 }}
        visible={visible || !!query.get('type')}
        onCancel={() => setVisible(false)}
        forceRender={false}
        destroyOnClose
      >
        <div className="detailed" style={{ overflowY: 'clip', maxHeight: 'calc(100vh - 8vh)' }}>
          {isLoading && <LoadingViewOverall />}
          <Row className="detailed-h" gutter={[16, 8]} style={{ background: '#f8f8fa' }}>
            <Col xs={{ span: 24 }} lg={typeS === FILTER_PROBLEMS_TRIGGER ? { span: 13 } : { span: 18 }}>
              <div className="header-detail" style={{ alignItems: 'normal' }}>
                <div style={detailed?.problemtype ? { width: '100%' } : { width: '76%' }}>
                  <h1>{detailed?.problemname ? detailed?.problemname : detailed?.project_name}</h1>
                  <p>
                    <span>
                      {detailed?.problemtype
                        ? detailed?.problemtype + ' Problem'
                        : detailed?.code_project_type?.project_type_name + ' Project'}
                    </span>
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    <span style={{ textTransform: 'capitalize' }}>
                      {' '}
                      {detailed?.problemtype
                        ? toCamelCase(detailed?.jurisdiction + ', CO')
                        : getJurisdictions(detailed?.project_local_governments || []) || 'N/A'}{' '}
                    </span>
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    <span style={{ textTransform: 'capitalize' }}>
                      {' '}
                      {detailed?.problemtype
                        ? toCamelCase(detailed?.county + ' County')
                        : toCamelCase(getCounties(detailed?.project_counties || []) || 'N/A')}
                    </span>
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    <span style={{ textTransform: 'capitalize' }}>
                      {' '}
                      {detailed?.problemtype
                        ? toCamelCase(detailed?.servicearea + ' Service Area')
                        : toCamelCase(getServiceAreas(detailed?.project_service_areas || []) || 'N/A')}{' '}
                    </span>
                  </p>
                </div>
                {detailed?.problemtype ? (
                  <></>
                ) : (
                  <div className="status-d" style={{ display: 'flex' }}>
                    <p>
                      Status<br></br>
                      <span className="status-active" style={{ marginRight: '20px' }}>
                        {getCurrentProjectStatus(detailed)?.code_phase_type?.code_status_type?.status_name || 'N/A'}
                      </span>
                    </p>
                    <p style={{}}>
                      Phase<br></br>
                      <span className="status-final">
                        {getCurrentProjectStatus(detailed)?.code_phase_type?.phase_name || 'N/A'}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={{ span: 10 }} lg={typeS === FILTER_PROBLEMS_TRIGGER ? { span: 10 } : { span: 5 }}>
              <div className="header-button">
                {detailed?.problemtype ? (
                  <>
                    <div className="progress">
                      <div className="text-progress">
                        <p>Solution Status</p>
                        <p className="value">{detailed?.solutionstatus ? detailed.solutionstatus : 0}%</p>
                      </div>
                      <Progress percent={detailed?.solutionstatus ? detailed.solutionstatus : 0} />
                    </div>
                    <div className="detailed-mmm">
                      <p style={{ marginTop: '-10px' }}>Cost</p>
                      <b>
                        {detailed?.component_cost != null
                          ? '$' +
                            new Intl.NumberFormat('en-EN', { maximumFractionDigits: 0 }).format(
                              detailed?.component_cost,
                            )
                          : 'No Cost Data'}
                      </b>
                    </div>
                  </>
                ) : (
                  <div className="detailed-mmm">
                    <p style={{ marginTop: '-10px' }}>Estimated Cost</p>
                    <b>
                      {getTotalEstimatedCost(detailed?.project_costs || []) != null
                        ? '$' +
                          new Intl.NumberFormat('en-EN', { maximumFractionDigits: 0 }).format(
                            getTotalEstimatedCost(detailed?.project_costs || []),
                          )
                        : 'No Cost Data'}
                    </b>
                  </div>
                )}
                <Button className="btn-circle" onClick={downloadPdf}>
                  <img src="/Icons/icon-01.svg" alt="" style={{ margin: '1px -10px', height: '17px' }} />
                </Button>
                <Button style={{ marginLeft: '10px' }} className="btn-circle" onClick={copyUrl}>
                  <img src="/Icons/icon-06.svg" alt="" />
                </Button>
              </div>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 1 }} style={{ textAlign: 'right' }}>
              <Tooltip title="Close Window">
                <Button className="btn-transparent mobile-display" onClick={() => setVisible(false)}>
                  <img src="/Icons/icon-62.svg" alt="" height="15px" />
                </Button>
              </Tooltip>
            </Col>
          </Row>
          {!detailed?.problemtype && (
            <div
              style={{
                display: 'flex',
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
                zIndex: '10000',
                paddingLeft: '20px',
                scrollBehavior: 'smooth',
                marginBottom: '1.5px',
              }}
            >
              <p
                onClick={() => {
                  activeTab(0, '#project-basics');
                }}
                className={openSecction === 0 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Project Basics
              </p>
              <p
                onClick={() => {
                  activeTab(1, '#problem');
                }}
                className={openSecction === 1 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Problem
              </p>
              <p
                onClick={() => {
                  activeTab(2, '#vendors');
                }}
                className={openSecction === 2 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Vendors
              </p>
              <p
                onClick={() => {
                  activeTab(3, '#proposed-actions');
                }}
                className={openSecction === 3 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Proposed Actions
              </p>
              <p
                onClick={() => {
                  activeTab(4, '#project-roadmap');
                }}
                className={openSecction === 4 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Project Roadmap
              </p>
              {/* <p style={{opacity:'0.25'}} className={openSecction === 5 ? "header-tab-modal-detail header-tab-modal-detail-active" : "header-tab-modal-detail"} >Graph</p> */}
              {appUser && appUser.designation && (appUser.designation === ADMIN || appUser.designation === STAFF) && (
                <p
                  onClick={() => {
                    activeTab(6, '#project-financials');
                  }}
                  className={openSecction === 6 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                  style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
                >
                  Project Financials
                </p>
              )}
              {/* <p style={{opacity:'0.25'}} className={openSecction === 7 ? "header-tab-modal-detail header-tab-modal-detail-active" : "header-tab-modal-detail"} >Project Management</p> */}
              <p
                onClick={() => {
                  activeTab(8, '#maps');
                }}
                className={openSecction === 8 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Maps
              </p>
              <p
                onClick={() => {
                  activeTab(9, '#gallery');
                }}
                className={openSecction === 9 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Gallery
              </p>
              <p
                onClick={() => {
                  activeTab(10, '#attachments');
                }}
                className={openSecction === 10 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                Attachments
              </p>
              <p
                onClick={() => {
                  if (activeScroll) {
                    activeTab(11, '#history');
                  }
                }}
                className={openSecction === 11 ? 'header-tab-modal-detail header-tab-modal-detail-active' : 'header-tab-modal-detail'}
                style={!activeScroll ? { cursor: 'default' } : { cursor: 'pointer' }}
              >
                History
              </p>
            </div>
          )}
          <Row className="detailed-b">
            <Col
              xs={{ span: 24 }}
              lg={{ span: 17 }}
              style={
                detailed?.problemtype
                  ? {
                      borderRight: '1.5px solid rgba(61, 46, 138, 0.07)',
                      height: 'calc(100vh - 138px)',
                      overflowY: 'auto',
                      scrollBehavior: 'smooth',
                    }
                  : {
                      borderRight: '1.5px solid rgba(61, 46, 138, 0.07)',
                      height: 'calc(100vh - 200px)',
                      overflowY: 'auto',
                      scrollBehavior: 'smooth',
                    }
              }
              className="carouse-detail body-detail-modal"
              onScrollCapture={e => {
                if (activeScroll) {
                  const projectDiv = document.getElementById('project-basics');
                  const rectProject = projectDiv?.getBoundingClientRect();
                  if (
                    rectProject &&
                    rectProject.top >= 0 &&
                    rectProject.left >= 0 &&
                    rectProject.bottom <= window.innerHeight &&
                    rectProject.right <= window.innerWidth
                  ) {
                    setOpenSecction(0);
                  }
                  const problemDiv = document.getElementById('problem');
                  const rectProblem = problemDiv?.getBoundingClientRect();
                  if (
                    rectProblem &&
                    rectProblem.top >= 0 &&
                    rectProblem.left >= 0 &&
                    rectProblem.bottom <= window.innerHeight &&
                    rectProblem.right <= window.innerWidth
                  ) {
                    setOpenSecction(1);
                  }
                  const vendorsDiv = document.getElementById('vendors');
                  const rectVendors = vendorsDiv?.getBoundingClientRect();
                  if (
                    rectVendors &&
                    rectVendors.top >= 0 &&
                    rectVendors.left >= 0 &&
                    rectVendors.bottom <= window.innerHeight &&
                    rectVendors.right <= window.innerWidth
                  ) {
                    setOpenSecction(2);
                  }
                  const solutionsDiv = document.getElementById('proposed-actions');
                  const rectSolutions = solutionsDiv?.getBoundingClientRect();
                  if (
                    rectSolutions &&
                    rectSolutions.top >= 0 &&
                    rectSolutions.left >= 0 &&
                    rectSolutions.bottom <= window.innerHeight &&
                    rectSolutions.right <= window.innerWidth
                  ) {
                    setOpenSecction(3);
                  }
                  const roadmapDiv = document.getElementById('project-roadmap');
                  const rectRoadmap = roadmapDiv?.getBoundingClientRect();
                  if (
                    rectRoadmap &&
                    rectRoadmap.top >= 0 &&
                    rectRoadmap.left >= 0 &&
                    rectRoadmap.bottom <= window.innerHeight &&
                    rectRoadmap.right <= window.innerWidth
                  ) {
                    setOpenSecction(4);
                  }
                  const projectFinancialsDiv = document.getElementById('project-financials');
                  const rectProjectFinancials = projectFinancialsDiv?.getBoundingClientRect();
                  if (
                    rectProjectFinancials &&
                    rectProjectFinancials.top >= 0 &&
                    rectProjectFinancials.left >= 0 &&
                    rectProjectFinancials.bottom <= window.innerHeight &&
                    rectProjectFinancials.right <= window.innerWidth
                  ) {
                    setOpenSecction(6);
                  }
                  const mapDiv = document.getElementById('maps');
                  const rectMap = mapDiv?.getBoundingClientRect();
                  if (
                    rectMap &&
                    rectMap.top >= 0 &&
                    rectMap.left >= 0 &&
                    rectMap.bottom <= window.innerHeight &&
                    rectMap.right <= window.innerWidth
                  ) {
                    setOpenSecction(8);
                  }
                  const galleryDiv = document.getElementById('gallery');
                  const rectGallery = galleryDiv?.getBoundingClientRect();
                  if (
                    rectGallery &&
                    rectGallery.top >= 0 &&
                    rectGallery.left >= 0 &&
                    rectGallery.bottom <= window.innerHeight &&
                    rectGallery.right <= window.innerWidth
                  ) {
                    setOpenSecction(9);
                  }
                  const attachmentsDiv = document.getElementById('attachments');
                  const rectAttachments = attachmentsDiv?.getBoundingClientRect();
                  if (
                    rectAttachments &&
                    rectAttachments.top >= 0 &&
                    rectAttachments.left >= 0 &&
                    rectAttachments.bottom <= window.innerHeight &&
                    rectAttachments.right <= window.innerWidth
                  ) {
                    setOpenSecction(10);
                  }
                  const historyDiv = document.getElementById('history');
                  const rectHistory = historyDiv?.getBoundingClientRect();
                  if (
                    rectHistory &&
                    rectHistory.top >= 0 &&
                    rectHistory.left >= 0 &&
                    rectHistory.bottom <= window.innerHeight &&
                    rectHistory.right <= window.innerWidth
                  ) {
                    setOpenSecction(11);
                  }
                }
              }}
              ref={divRef}
            >
              <div className="placeholder-carousel"></div>
              <div
                style={{
                  background: '#f5f7ff',
                  zIndex: '1',
                  height: '266px',
                  width: '100%',
                  position: 'absolute',
                  top: '0',
                }}
                className="placeholder-carousel"
              >
                {/* <div className="detailed-c"></div> */}
              </div>
              <Carousel className="detail-carousel" ref={carouselRef} style={{ zIndex: '3', height: '266px' }}>
                {detailed?.problemid ? (
                  <div className="detailed-c">
                    {' '}
                    <img
                      src={
                        detailed?.problemtype === 'Watershed Change'
                          ? 'detailed/watershed-change.png'
                          : 'detailed/' + detailed?.problemtype + '.png'
                      }
                    />{' '}
                  </div>
                ) : detailed?.attachments ? (
                  detailed?.attachments.map((image: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="detailed-c"
                        onClick={() => {
                          setOpenImage(true);
                          setActive(0);
                        }}
                      >
                        <img width="100%" height="100%" src={image} alt="" />
                      </div>
                    );
                  })
                ) : projectType ? (
                  <div
                    className="detailed-c"
                    onClick={() => {
                      setOpenImage(true);
                      setActive(0);
                    }}
                  >
                    {' '}
                    <img
                      alt=""
                      className="img-carousel-backgraund"
                      src={
                        coverImage !== ''
                          ? coverImage
                          : projectType === 'CIP'
                          ? '/detailed/capital.png'
                          : projectType === 'Study'
                          ? '/detailed/study.png'
                          : projectType === 'Special'
                          ? '/detailed/special.png'
                          : projectType === 'Vegetation Management'
                          ? '/detailed/vegetation-management.png'
                          : projectType === 'Sediment Removal'
                          ? '/detailed/sediment-removal.png'
                          : projectType === 'Restoration'
                          ? '/detailed/restoration.png'
                          : projectType === 'Acquisition'
                          ? '/detailed/acquisition.png'
                          : projectType === 'General Maintenance'
                          ? '/detailed/minor-repairs.png'
                          : projectType === 'Routine Trash and Debris'
                          ? '/detailed/debris-management.png'
                          : '/detailed/watershed-change.png'
                      }
                    />{' '}
                  </div>
                ) : (
                  <></>
                )}
              </Carousel>
              {typeS === FILTER_PROJECTS_TRIGGER && (
                <>
                  <div className="img-carousel-detail">
                    <img
                      src="/picture/map-denver.png"
                      alt=""
                      style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                      onClick={() => {
                        setOpenImage(true);
                        setActive(2);
                      }}
                    />
                  </div>
                  <div className="detail-left">
                    <LeftOutlined
                      className="button-next"
                      onClick={() => {
                        carouselRef.current.prev();
                      }}
                    />
                  </div>
                  <div className="detail-right">
                    <RightOutlined
                      className="button-next"
                      onClick={() => {
                        carouselRef.current.next();
                      }}
                    />
                  </div>
                </>
              )}
              <div className="detailed-info">
                {typeS === 'Problems' ? (
                  <>
                    <DetailInformationProblem />
                    <br></br>
                    <ProblemParts problemParts={problemPart} />
                    <br></br>
                    <ComponentSolucionsByProblems />
                    <br></br>
                    <Map type={typeS} ref={ciprRef} />
                    <br></br>
                    <br></br>
                  </>
                ) : (
                  <>
                    <DetailInformationProject />
                    <ProblemsProjects />
                    <Vendors />
                    <ComponentSolucions />
                    <Roadmap
                      data={dataRoadmap}
                      setOpenPiney={setOpenPiney}
                      openPiney={openPiney}
                      updateAction={updateAction}
                      setUpdateAction={setUpdateAction}
                    />
                    <br></br>
                    {appUser &&
                      appUser.designation &&
                      (appUser.designation === ADMIN || appUser.designation === STAFF) && (
                        <Financials projectId={project_idS} />
                      )}
                    <br></br>
                    {/* <Management /> */}
                    <Map type={typeS} ref={cipjRef} />
                    <br></br>
                    <GalleryDetail />
                    <br></br>
                    <Documents />
                    <History />
                  </>
                )}
              </div>
            </Col>
            <Col
              span={7}
              className="mobile-display"
              style={{ height: 'calc(100vh - 183px)', overflowY: 'auto', scrollBehavior: 'smooth' }}
            >
              {appUser.firstName === '' || appUser.firstName === 'guest' ? (
                ''
              ) : openPiney ? (
                <div className="piney-modal-detail">
                  <PineyView
                    isDetail={true}
                    setOpenPiney={setOpenPiney}
                    setUpdateAction={setUpdateAction}
                    updateAction={updateAction}
                  />
                </div>
              ) : (
                <TeamCollaborator />
              )}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DetailModal;
