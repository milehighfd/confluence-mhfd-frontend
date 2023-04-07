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
  const numberElementCarousel = detailed?.attachments?.length;
  const appUser = store.getState().profile;
  const email = appUser.userInformation?.email
  const [favorite,setFavorite] = useState(false);

  const deleteFunction = (id: number, email: string, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {      
      setFavorite(false)
      if(deleteCallback){
        deleteCallback(id)
      }      
    });

  }
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
            <Col xs={{ span: 48 }} lg={{ span: 7 }} className='body-modal-team image-modal-body' style={{maxHeight:'calc(100vh - 166px)', overflowY:'auto'}}>
              {detailed?.attachments && detailed?.attachments?.length !== 0  ? detailed?.attachments.map((image: string, index: number) => {
                if(index % 3){
                  return <img src={image} alt="" className='img-list-big' onClick={carouselRef.current.goTo(index)}/>
                }else {
                  if(index % 2){
                    return <img src={image} alt="" className='img-list'/>
                  }else{
                    return <img src={image} alt="" style={{marginRight:'5%'}} className='img-list'/>
                  }
                }
                }):
                <>

                    <img src="/picture/no-image.png" alt="" style={{marginRight:'2.5%', background:'#f5f7ff', borderRadius:'15px', border:'transparent' }} className='img-list'/>
                    <img src="/picture/no-image.png" alt="" style={{marginLeft:'2.5%', background:'#f5f7ff', borderRadius:'15px', border:'transparent' }} className='img-list'/>
                    <img src="/picture/no-image.png" alt="" className='img-list-big' style={{background:'#f5f7ff', borderRadius:'15px', border:'transparent'}}/>
                    {/* <br></br> */}
                    <img src="/picture/no-image.png" alt="" style={{marginRight:'2.5%', background:'#f5f7ff', borderRadius:'15px', border:'transparent'}} className='img-list'/>
                    <img src="/picture/no-image.png" alt="" style={{marginLeft:'2.5%', background:'#f5f7ff', borderRadius:'15px', border:'transparent'}} className='img-list'/>
                </>
               
              }
              </Col>
            <Col xs={{ span: 48 }} lg={{ span: 17 }} className='body-modal-team image-modal-body' style={{overflowX:'hidden'}}>
              <Carousel className="detail-carousel" ref={carouselRef} style={{paddingTop:'0px', width:'85.1%', marginTop:'-20px', marginLeft:'85px'}} >
                {detailed?.problemid ? (
                  <div className="detailed-c" > <img  src={"detailed/" + detailed?.problemtype + ".png"}/> </div>
                ) : (
                detailed?.attachments?.length !== 0 &&
                  detailed?.attachments ? detailed?.attachments.map((image: string, index: number) => {
                  return <div key={index} className="detailed-c">
                    <img  className='img-modal' src={image} alt=""/>
                  </div>
                }):
                <div className="detailed-c">
                  <div className='img-modal' style={{background:'#f5f7ff'}}>
                  </div>
                </div>
                )}
              </Carousel>
              <div className='tag-div'>
                <div className={detailed?.attachments?.length !== 0 && detailed?.attachments ? 'tag-carousel' : 'tag-carousel no-image'}>
                  {detailed?.attachments?.length !== 0 && detailed?.attachments ?
                  `${numberCarousel} of ${numberElementCarousel}`
                  :
                  'No Image Available'
                  }
                </div>
              </div>
              <div className='btn-left-carousel'>
                <LeftOutlined className="button-next" onClick={()=>{if(detailed?.attachments?.length > 0){carouselRef.current.prev(); if(numberCarousel=== 1){setNumberCarousel(numberElementCarousel)}else{setNumberCarousel(numberCarousel - 1)}}}}/>
              </div>
              <div className='btn-right-carousel'>
                <RightOutlined className="button-next" onClick={()=>{if(detailed?.attachments?.length > 0){carouselRef.current.next(); if(numberCarousel=== numberElementCarousel){setNumberCarousel(1)}else{setNumberCarousel(numberCarousel + 1)}}}}/>
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
