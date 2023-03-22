import React, { useState } from 'react';
import { Button, Checkbox, Col, Collapse, Popover, Row, Tabs } from 'antd';
import GenericTabView from '../../../Components/Shared/GenericTab/GenericTabView';
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, PROBLEMS_TRIGGER, PROJECTS_TRIGGER } from '../constants/tabs.constants';
import { getCurrentProjectStatus } from 'utils/parsers';

let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));

const MobileMenu = () => {
  const [collapseKey, setCollapseKey] = useState('0');
  const [tabPosition, setTabPosition] = useState('1');
  const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
  const {
    applyFilter,
    galleryProblems,
    galleryProjects
  } = useMapState();
  const {
    getGalleryProblems, 
    getGalleryProjects,
    setApplyFilter,
    setTabCards
  } = useMapDispatch();

  const genExtra = () => (
    <Row justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col>
        <div className={'apply-filter-no-effect'}>
          Apply map view to filters
          <Checkbox style={{ paddingLeft: 6 }} checked={applyFilter} onChange={() => {
            setApplyFilter(!applyFilter)
            getGalleryProblems();
                                 console.log('get gallery'); 
                      getGalleryProjects();;
          }}></Checkbox>
          <div className="progress">
            <div className="progress-value"></div>
          </div>
        </div>
      </Col>
    </Row>
  );

  return (
    <div className="menu-desktop collapse-tabs">
      <Collapse accordion activeKey={collapseKey}>
        <Collapse.Panel header="" key="1" extra={
          <div className="title-explore" onClick={() => {
            console.log('on click');
            setCollapseKey(collapseKey => '' + (1 - +collapseKey));
          }}
          onTouchEnd={() => {
            console.log('on click');
            setCollapseKey(collapseKey => '' + (1 - +collapseKey));
          }}>
            Explore Confluence
          </div>
        }>
          <Button onClick={(e) => {
            e.stopPropagation();
            setCollapseKey('0');
          }} className="btn-map"><img src="/Icons/menu-green-02.svg" alt="" width="18px" /> Map</Button>
          <div className="ggyyyy">
            <div className="mhfd-mobile">
              <h6>About the Platform</h6>
              <p>Confluence is your one-stop Mile High Flood District data portal.
                MHFD has developed Confluence from the ground up to meet the unique data needs of a
                regional flood control and stream management district.</p>
            </div>
            <div className="ffoo">
              <Tabs onTabClick={(e: string) => {
                if (e === '0') {
                  setTabCards(PROBLEMS_TRIGGER);
                  getGalleryProblems();
                } else {
                  setTabCards(PROJECTS_TRIGGER);
                                       console.log('get gallery'); 
                      getGalleryProjects();;
                }
              }} activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map over-00" tabBarExtraContent={genExtra()}>
                {tabs.map((value: string, index: number) => {
                  let totalElements = 0;
                  let cardInformation: Array<Object> = [];
                  if (value === FILTER_PROBLEMS_TRIGGER) {
                    cardInformation = galleryProblems.map((problem: any) => {
                      return {
                        cartodb_id: problem.cartodb_id,
                        image: `gallery/${problem.problemtype}.png`,
                        requestName: problem.problemname,
                        jurisdiction: problem.jurisdiction,
                        estimatedCost: problem.estimatedcost,
                        field4: 'X',
                        field5: 'Components',
                        priority: problem.problempriority,
                        percentage: problem.solutionstatus,
                        problemid: problem.problemid,
                        type: problem.type,
                        value: problem.cartodb_id,
                        totalComponents: problem.totalComponents,
                        coordinates: problem.coordinates[0]
                      }
                    });
                    totalElements = cardInformation.length;
                  } else {
                    cardInformation = galleryProjects.map((project: any) => {
                      return {
                        cartodb_id: project.cartodb_id,
                        image: project.attachments ? project.attachments : (
                          project.projecttype === 'Capital' ? '/projectImages/capital.png' :
                            project.projecttype === 'Study' ? '/projectImages/study.png' :
                              project.projecttype === 'Maintenance' ?
                                (project.projectsubtype === 'Vegetation Management' ? '/projectImages/vegetation-management.png' :
                                  project.projectsubtype === 'Sediment Removal' ? '/projectImages/sediment-removal.png' :
                                    project.projectsubtype === 'Restoration' ? '/projectImages/restoration.png' :
                                      project.projectsubtype === 'Minor Repairs' ? '/projectImages/minor-repairs.png' :
                                        '/projectImages/debris_management.png') : '/Icons/eje.png'
                        ),
                        requestName: project.projectname ? project.projectname : project.requestedname,
                        sponsor: project.sponsor,
                        estimatedCost: project.finalcost ? project.finalcost : project.estimatedcost,
                        status: getCurrentProjectStatus(project)?.code_phase_type?.code_status_type?.status_name,
                        projecttype: project.projecttype,
                        objectid: project.objectid,
                        type: project.type,
                        value: project.cartodb_id,
                        id: project.projectid,
                        totalComponents: project.totalComponents,
                        coordinates: project.coordinates[0]
                      }
                    });
                    totalElements = cardInformation.length;
                  }

                  return (
                    <Tabs.TabPane tab={<span><Popover content={contents[index]} placement="rightBottom">{value} </Popover> </span>} key={'' + index}>
                      <GenericTabView
                        key={value + index}
                        type={value}
                        totalElements={totalElements}
                        cardInformation={cardInformation}
                      />
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default MobileMenu;
