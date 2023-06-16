import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";
import { useAttachmentState } from "hook/attachmentHook";

const GalleryDetail = () => {
  const { attachments } = useAttachmentState();
  const [listAttach, setListAttachment] = useState([]) 

  useEffect(() =>{
    const listAttachAux = attachments?.data?.filter((element:any) => {
      return element.mime_type === 'image/png' ||
             element.mime_type === 'image/jpg' ||
             element.mime_type === 'image/jpeg' ||
             element.mime_type === 'image/gif';
    });
    let indexCover = 0;
    listAttachAux.map((element:any, index:number) => {
      if(element.is_cover){
        indexCover = index;
      }
      return index
    })
    const temp = listAttachAux[indexCover];
    listAttachAux[indexCover] = listAttachAux[0];
    listAttachAux[0] = temp;
    setListAttachment(listAttachAux);
  }, [attachments]);
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{paddingBottom:'15px', paddingTop:'20px', marginRight:'35px'}} id="gallery">GALLERY</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'0px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal" style={{display:'flex', justifyContent: 'space-between'}}>
          <div className="grid">
            {listAttach && listAttach.length > 0 ? listAttach?.map((element:any, index:number) => {
              if(element.mime_type === 'image/png' || element.mime_type === 'image/jpg' || element.mime_type === 'image/jpeg' || element.mime_type === 'image/gif'){
                return <>
                  <div><img src={element.attachment_url} alt="" height="100%" /></div>
                </>
              }
            }):<>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            </>}
          </div> 
        </Col>
      </Row>
    </>
  )
}

export default GalleryDetail;