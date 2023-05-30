import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";
import { useAttachmentState } from "hook/attachmentHook";


const Documents = () => {
  const [docs, setDocs] = useState<any[]>([]); 
  const { attachments } = useAttachmentState();
  useEffect(()=>{
    if (attachments.data){
      const docs = attachments?.data?.filter(
        (_: any) => !(_.mime_type?.includes('png') || _.mime_type?.includes('jpeg') || _.mime_type?.includes('jpg'))
      ).map((file: any) => {
        return {
          key: file.project_attachment_id,         
          name: file.file_name,
        }
      });
      setDocs(docs)
    }   
  },[attachments])
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{paddingBottom:'15px', paddingTop:'20px', marginRight:'35px'}} id="attachments">ATTACHMENTS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'40px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          {docs.map((doc: any) => {
            return <><p style={{color:'#11093C', marginRight:'10px'}}><FileOutlined style={{opacity:'0.35'}}/> {doc.name}</p></>
          })}
        </Col>
      </Row>
    </>
  )
}

export default Documents;