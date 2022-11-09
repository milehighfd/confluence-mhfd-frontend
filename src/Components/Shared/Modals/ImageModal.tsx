import { HeartOutlined, LeftOutlined, RightOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Carousel, MenuProps, Select } from 'antd';
import { Button, Col, Dropdown, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef, useState } from 'react';

const ImageModal = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  let carouselRef = useRef<undefined | any>(undefined);
  const [active, setActive] = useState(0);
  return (
    <Modal
      className="detailed-image"
      style={{ top: 30, width: '455px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', borderBottom:'1px solid #eae8f0', paddingBottom:'0px', minHeight:'71px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 2 }} style={{paddingTop:'15px'}}>
            <span className={active===0 ? 'active title' : 'title'} onClick={()=>{setActive(0)}}>Photos</span>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }}style={{paddingTop:'15px'}}>
            <span className={active===1 ? 'active title' : 'title'} onClick={()=>{setActive(1)}}>3D Component View</span>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 2 }}style={{paddingTop:'15px'}}>
            <span className={active===2 ? 'active title' : 'title'} onClick={()=>{setActive(2)}}>Map View</span>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 16 }} style={{textAlign: 'end', alignItems: 'center'}}>
            <div style={{color:'#11093C'}}>
              <HeartOutlined /> Favorite &nbsp; &nbsp; &nbsp;
              <ShareAltOutlined /> Share &nbsp; &nbsp; &nbsp;
              <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </div>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 8 }} className='body-modal-team' style={{maxHeight:'calc(100vh - 166px)', overflowY:'auto'}}>
           <img width="47.5%" src={'picture/img-1.png'} alt="" style={{marginRight:'2.5%', marginBottom:'15px'}}/>
           <img width="47.5%" src={'picture/img-2.png'} alt="" style={{marginLeft:'2.5%', marginBottom:'15px'}} />
           <img width="100%"src={'picture/img-3.png'} alt="" style={{ marginBottom:'15px'}}/>
           <img width="47.5%" src={'picture/img-4.png'} alt="" style={{marginRight:'2.5%', marginBottom:'15px'}}/>
           <img width="47.5%" src={'picture/img-5.png'} alt="" style={{marginLeft:'2.5%', marginBottom:'15px'}} />
          </Col>
          <Col xs={{ span: 48 }} lg={{ span: 16 }} className='body-modal-team'>
            <Carousel className="detail-carousel" ref={carouselRef} style={{paddingTop:'0px', width:'79.5%', marginTop:'-20px', marginLeft:'85px'}} >
              <div key={1} className="detailed-c">
                <img width="100%" height="100%" src={'picture/img-6.png'} alt="" />
              </div>
              <div key={2} className="detailed-c">
                <img width="100%" height="100%" src={'picture/img-1.png'} alt="" />
              </div>
            </Carousel>
            <div style={{position:'absolute', left: '50px', top: '205px'}}>
              <LeftOutlined className="button-next" onClick={()=>{carouselRef.current.prev()}}/>
            </div>
            <div style={{position:'absolute', right: '50px', top: '205px'}}>
              <RightOutlined className="button-next" onClick={()=>{carouselRef.current.next() }}/>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ImageModal;
