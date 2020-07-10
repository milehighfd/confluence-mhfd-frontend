import React, { useState } from 'react';
import { Col, Card } from 'antd';

import { ComponentType } from '../../../Classes/MapTypes';
import DetailedModal from '../../Shared/Modals/DetailedModal';

export default ({ data, type, numberWithCommas, getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId,
        displayModal, detailed, loaderDetailedPage, componentsOfProblems, loaderTableCompoents }: { data: any, type: string, numberWithCommas: Function,
        getDetailedPageProblem: Function, getDetailedPageProject: Function, getComponentsByProblemId: Function, displayModal: any, 
        detailed: any, loaderDetailedPage: any, componentsOfProblems: any, loaderTableCompoents: any }) => {
    const [visible, setVisible] = useState(false);
    const getComponentSizes = (components: Array<ComponentType>) => {
        if (components && components.length) {
            let sideText = ' Components';
            if (components.length === 1) {
                sideText = sideText.slice(0, -1);
            }
            return components.length + sideText;
        } else {
            return '';
        }
    }
    const dataInformation = {
        problemid: data.problemid,
        id: data.projectid,
        objectid: data.objectid,
        value: data.cartodb_id,
        type: data.type
      };
      
    return <>
        {visible && <DetailedModal
            detailed={detailed}
            getDetailedPageProblem={getDetailedPageProblem}
            getDetailedPageProject={getDetailedPageProject}
            loaderDetailedPage={loaderDetailedPage}
            getComponentsByProblemId={getComponentsByProblemId}
            type={type}
            data={dataInformation}
            visible={visible}
            setVisible={setVisible}
            componentsOfProblems={componentsOfProblems}
            loaderTableCompoents={loaderTableCompoents}
        />}
        <Col span={6}>
            <Card
                onClick={() => setVisible(true)}
                hoverable
                style={{ width: '100%' }}
                className="card-information"
                cover={
                    data.problemtype ? <img alt="example" src={`gallery/${data.problemtype}.jpg`} /> :

                        data.attachments ? <img alt="example" src={data.attachments} /> : (
                            data.projecttype === 'Capital' ? <img alt="example" src="projectImages/capital.png" /> :
                                data.projecttype === 'Study' ? <img alt="example" src="projectImages/study.png" /> :
                                    data.projecttype === 'Maintenance' ?
                                        (data.projectsubtype === 'Vegetation Mangement' ? <img alt="example" src="projectImages/maintenance_vegetationmanagement.png" /> :
                                            data.projectsubtype === 'Sediment Removal' ? <img alt="example" src="projectImages/maintenance_sedimentremoval.png" /> :
                                                data.projectsubtype === 'Restoration' ? <img alt="example" src="projectImages/maintenance_restoration.png" /> :
                                                    data.projectsubtype === 'Minor Repairs' ? <img alt="example" src="projectImages/maintenance_minorrepairs.png" /> :
                                                        <img alt="example" src="projectImages/maintenance_debrismanagement.png" />) : <img alt="example" src="Icons/eje.png" />
                        )

                }
            >
                <div style={{ height: 40 }}>
                    {type === 'Problems' ? <h4>{data.problemname} </h4> : <h4>{data.projectname} </h4>}

                </div>
                {type === 'Problems' ? <h6>{data.county ? data.county : 'No County'}</h6> :
                    <h6>{data.county ? data.county : 'No Sponsor'}</h6>}

                <h5>${numberWithCommas(data.solutioncost ? data.solutioncost : data.estimatedCost)} <span style={{ float: 'right' }}><b>{getComponentSizes(data.components)}</b> </span></h5>
                <hr />
                {type === 'Problems' ? (
                    <div style={{ display: 'flex', width: '100%' }}>
                        {data.problempriority === 'High' ? <p style={{ color: 'red', width: '60%', fontSize: '13px' }}>{data.problempriority} Priority</p> :
                            data.problempriority === 'Low' ? <p style={{ color: '#28c499', width: '60%', fontSize: '13px' }}>{data.problempriority} Priority</p> :
                                <p style={{ color: '#FFD300', width: '60%', fontSize: '13px' }}>{data.problempriority} Priority</p>
                        }
                        <span style={{ textAlign: 'right', width: '40%', fontSize: '13px' }}>Solved {data.solutionstatus}%</span>
                    </div>
                ) : (
                        <div style={{ display: 'flex', width: '100%' }}>
                            <p style={{ color: ' #11093c', width: '60%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype}</p>
                            <span style={{ textAlign: 'right', width: '40%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
                        </div>
                    )}
            </Card>
        </Col>
    </>
}
