import React, { useState } from 'react';
import { Col, Card, Button } from 'antd';

import { ComponentType } from '../../../Classes/MapTypes';
import DetailedModal from '../../../Components/Shared/Modals/DetailedModal';
import { numberWithCommas } from '../../../utils/utils';

const CardsView = ({
  data,
  type,
  detailed,
  deleted
}: {
  data: any,
  type: string,
  detailed: any,
  deleted: Function
}) => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(true);
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
  type={type}
  data={dataInformation}
  visible={visible}
  setVisible={setVisible}
  />}
    <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ width: '100%', display: 'inline-flex', alignSelf: 'stretch', paddingBottom: '15px' }}>
      <Card
        onClick={() => setVisible(true)}
        // hoverable
        style={{ width: '100%' }}
        className="card-information"
        cover={
          <div>
          {data.problemtype ? <img alt="example" height="100%" src={`gallery/${data.problemtype}.png`} /> :
            data.attachments ? <img alt="example" src={data.attachments} /> : 
                data.projecttype === 'Capital' ? <img alt="example" src="projectImages/capital.png" /> :
                    data.projecttype === 'Study' ? <img alt="example" src="projectImages/study.png" /> :
                        data.projecttype === 'Maintenance' ?
                            (data.projectsubtype === 'Vegetation Management' ? <img alt="example" src="projectImages/vegetation-management.png" /> :
                                data.projectsubtype === 'Sediment Removal' ? <img alt="example" src="projectImages/sediment-removal.png" /> :
                                    data.projectsubtype === 'Restoration' ? <img alt="example" src="projectImages/restoration.png" /> :
                                        data.projectsubtype === 'Minor Repairs' ? <img alt="example" src="projectImages/minor-repairs.png" /> :
                                            <img alt="example" src="projectImages/debris_management.png" />) : <img alt="example" src="Icons/eje.png" />}
            <div>
              <div className="like-btn">
              <Button onClick={(event) => {
                  event.stopPropagation();
                  deleted(data.problemid || data.projectid, data.type);
                  setClicked(false);
                  }
              }
                  >
                  <div className={clicked ? "like-img-on" : "like-img"}></div>
                  </Button>
              </div>
            </div>
          </div>
        }
      >
      <div style={{ height: 40 }}>
          {type === 'Problems' ? <h4>{data.problemname} </h4> : <h4>{data.projectname} </h4>}

      </div>
        {type === 'Problems' ? <h6>{data.county ? data.county : 'No County'}</h6> :
        <h6>{data.county ? data.county : 'No Sponsor'}</h6>}

        <h5>${numberWithCommas(data.estimatedcost ? data.estimatedcost : data.componentcost)}<span style={{ float: 'right' }}><b>{getComponentSizes(data.components)}</b> </span></h5>
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

export default CardsView;
