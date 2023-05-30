/* eslint-disable jsx-a11y/alt-text */
import { HeartFilled, HeartOutlined, LeftOutlined, RightOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Carousel, MenuProps, Select } from 'antd';
import { Button, Col, Dropdown, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useDetailedState } from 'hook/detailedHook';
import React, { useEffect, useRef, useState } from 'react';
import MapModal from 'routes/detail-page/components/MapModal';
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';
import store from "../../../store";
import { useMapDispatch } from 'hook/mapHook';
import { useAttachmentState } from 'hook/attachmentHook';

const ImageModal = (
  {
    visible, 
    setVisible, 
    type, 
    active, 
    setActive,
    copyUrl,
    deleteCallback,
    addCallback,
    addFavorite
  }:{
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    type: any,
    active: any,
    setActive:React.Dispatch<React.SetStateAction<number>>,
    copyUrl: any,
    deleteCallback?:any,
    addCallback?:any,
    addFavorite?:any
  }) => {
  const {detailed} = useDetailedState();
  let carouselRef = useRef<undefined | any>(undefined);
  const [numberCarousel, setNumberCarousel] = useState(1);
  const [numberElementCarousel, setNnumberElementCarousel] = useState(0);
  const appUser = store.getState().profile;
  const email = appUser.userInformation?.email
  const [favorite,setFavorite] = useState(false);
  const { attachments } = useAttachmentState();
  const [listAttach, setListAttachment] = useState([]) 
  const deleteFunction = (id: number, email: string, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {      
      setFavorite(false)
      if(deleteCallback){
        deleteCallback(id)
      }      
    });

  }
  useEffect(() =>{
    setNumberCarousel(1)
  },[])
  useEffect(() =>{
    const listAttachAux = attachments?.data?.filter((element:any) => {
      return element.mime_type === 'image/png' ||
             element.mime_type === 'image/jpg' ||
             element.mime_type === 'image/jpeg' ||
             element.mime_type === 'image/gif';
    });
    setListAttachment(listAttachAux);
    setNnumberElementCarousel(listAttachAux? listAttachAux.length : 0)
    setNumberCarousel(1)
  }, [attachments]);
  const addFunction = (id: number, email: string, table: string) => {
    if (addFavorite) {
      addFavorite(email, id, false);
      setFavorite(true);
    } else {
      setFavorite(true);
      addCallback(id,email, false);
    }
  }

  useEffect(()=>{
    datasets.getData(SERVER.FAVORITE_PROJECTS, datasets.getToken()).then(result => {     
      if(result.findIndex((x:any)=>x.project_id === detailed?.project_id)>=0){
        setFavorite(true)
      }
    });
  },[visible])
  return (
    <Modal
      className="detailed-image"
      style={{ width: '455px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', borderBottom:'1px solid #eae8f0', paddingBottom:'0px', minHeight:'71px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 12 }} style={{paddingTop:'15px'}}>
            <span className={active===0 ? 'active title' : 'title'} onClick={()=>{setActive(0)}}>Photos</span>
            <span className={active===1 ? 'active title' : 'title'} onClick={()=>{setActive(1)}}>3D Component View</span>
            <span className={active===2 ? 'active title' : 'title'} onClick={()=>{setActive(2)}}>Map View</span>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 12 }} style={{textAlign: 'end', alignItems: 'center'}}>
            <div style={{color:'#11093C'}}>
              <Button className='btn-filter-k' onClick={favorite?() => (deleteFunction(detailed?.project_id, email, '')):() => (addFunction(detailed?.project_id, email, ''))}>{favorite ? <HeartFilled /> : <HeartOutlined />} &nbsp; &nbsp;Favorite</Button>
               &nbsp; &nbsp;
               <Button className='btn-filter-k' onClick={copyUrl}><ShareAltOutlined /> &nbsp; &nbsp;Share</Button>
               &nbsp; &nbsp;
              <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </div>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          {active === 0 &&<>
            <Col xs={{ span: 48 }} lg={{ span: 7 }} className='body-modal-team image-modal-body' style={{height: '524px', overflowY:'auto'}}>
              <div className='grid-modal-image'>
                {listAttach && listAttach.length > 0 ? listAttach.map((element:any, index:number) => {
                  return <>
                    <div><img src={element.attachment_url} alt="" height="100%" /></div>
                  </>
                }) :<>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </>
                }
              </div>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 17 }} className='body-modal-team image-modal-body' style={{overflowX:'hidden', height:'100%'}}>
              <Carousel className="detail-carousel" ref={carouselRef} style={{paddingTop:'0px', width:'85.1%', marginTop:'-20px', marginLeft:'62px'}} >
               {listAttach && listAttach.length > 0 ? listAttach.map((element:any, index:number) => {
                  return <>
                  <div key={index} className="detailed-c">
                  <img className='img-modal' src={element.attachment_url} alt="" height="100%" style={{marginTop: '28px'}} />
                  </div>
                  </>
                }):
                <>
                <div className="detailed-c">
                  <div className='img-modal proto-img' style={{background:'#f5f7ff'}}/>
                </div>
                </>
              }
              </Carousel>
              <div className='tag-div'>
                <div className={detailed?.attachments?.length !== 0 && detailed?.attachments ? 'tag-carousel' : 'tag-carousel no-image'}>
                  {numberElementCarousel !== 0  ?
                  `${numberCarousel} of ${numberElementCarousel}`
                  :
                  'No Image Available'
                  }
                </div>
              </div>
              <div className='btn-left-carousel'>
                <LeftOutlined className="button-next" onClick={()=>{if(listAttach.length > 0){carouselRef.current.prev(); if(numberCarousel=== 1){setNumberCarousel(numberElementCarousel)}else{setNumberCarousel(numberCarousel - 1)}}}}/>
              </div>
              <div className='btn-right-carousel'>
                <RightOutlined className="button-next" onClick={()=>{if(listAttach.length > 0){carouselRef.current.next(); if(numberCarousel=== numberElementCarousel){setNumberCarousel(1)}else{setNumberCarousel(numberCarousel + 1)}}}}/>
              </div>
            </Col>
          </>}
          {active === 1 &&
            <Col xs={{ span: 48 }} lg={{ span: 24 }} className='body-modal-team image-modal-body' style={{height:'calc(100vh - 166px)', overflowY:'auto'}}>
              {/* <img src={'picture/map-map.png'} alt="" className='img-modal' style={{width:'100%', height:'100%'}}/> */}
              <MapModal type={type} activeTab={active}/>
            </Col>
          }
          {active === 2 &&
            <Col xs={{ span: 48 }} lg={{ span: 24 }} className='body-modal-team image-modal-body' style={{height:'calc(100vh - 166px)', overflowY:'auto'}}>
            <MapModal type={type} activeTab={active}/>
          </Col>
          }
        </Row>
      </div>
    </Modal>
  )
};

export default ImageModal;
