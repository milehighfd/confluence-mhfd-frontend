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
import { combine } from '@turf/turf';

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
    setNumberCarousel(1);
  },[visible])
  useEffect(() =>{
    const listAttachAux = attachments?.data?.filter((element:any) => {
      return element.mime_type === 'image/png' ||
             element.mime_type === 'image/jpg' ||
             element.mime_type === 'image/jpeg' ||
             element.mime_type === 'image/gif';
    });
    let indexCover = 0;
    listAttachAux?.map((element:any, index:number) => {
      if(element.is_cover){
        indexCover = index;
      }
      return index
    })
    if(listAttachAux && listAttachAux.length > 0){
       const temp = listAttachAux[indexCover];
      listAttachAux[indexCover] = listAttachAux[0];
      listAttachAux[0] = temp;
      setListAttachment(listAttachAux);
    }
   
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
  useEffect(() =>{
    setTimeout(() =>{
      carouselRef.current.goTo(numberCarousel - 1, false);
    },300);
  },[numberCarousel])
  const moveImage = (event:any) => {
    event.stopPropagation();
    if(active === 0){
      if (event.key === 'ArrowLeft') {
        if(listAttach.length > 0){
          if(numberCarousel=== 1) 
          {
            setNumberCarousel(numberElementCarousel);
          }else{
            setNumberCarousel(numberCarousel - 1);
          }
        }
      } else if (event.key === 'ArrowRight') {
        if(listAttach.length > 0){
          if(numberCarousel === numberElementCarousel){
            setNumberCarousel(1);
          }else{
            setNumberCarousel(numberCarousel + 1);
          }
        }
      }
    }
  }
  return (
    <Modal
      className="detailed-image"
      style={{ width: '455px' }}
      visible={visible}
      onCancel={() => {setVisible(false); setNumberCarousel(1);}}
      forceRender={false}
      destroyOnClose
      >
      <div className="detailed" onKeyDown={moveImage}>
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
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}} tabIndex={0} onKeyDown={moveImage} onClick={() =>{console.log('HACEcLI')}}>
          {active === 0 &&<>
            <Col xs={{ span: 48 }} lg={{ span: 7 }} className='body-modal-team image-modal-body' style={{height: '524px', overflowY:'auto'}}>
              <div className='grid-modal-image'>
                {listAttach && listAttach.length > 0 ? listAttach.map((element:any, index:number) => {
                  return <>
                    <div onClick={()=>{carouselRef.current.goTo(index, false);setNumberCarousel(index+1)}}><img src={element.attachment_url} alt="" height="100%" style={index === (numberCarousel - 1) ? {border: '3px solid #62b596'} : {}}/></div>
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
            <Col xs={{ span: 48 }} lg={{ span: 17 }} className='body-modal-team image-modal-body' style={{overflowX:'hidden', height:'100%'}} onKeyDown={moveImage}>
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
