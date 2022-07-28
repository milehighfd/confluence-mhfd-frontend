import React, {useEffect, useState} from "react";
import { Button, Row, Col, Modal, Input } from 'antd';

export const UploaderModal = (
  {modal, setModal, addFile, type}:{ modal: any, setModal: any, addFile: any, type: string}
) => {
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const [descriptionFile, setDescriptionFile] = useState<string>('');
  const handleFileUpload = (event: any) => {
    if(event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }
  return (
    <>
    <Modal
      className="detailed-upload"
      style={{ top: 60, width: '100%' }}
      visible={modal}
      onCancel={() => setModal(false)}
      forceRender={false}
      destroyOnClose>
      <div className="upload">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '15px'}}>{ type === 'images' ? 'Upload Images' : 'Upload Documents'}
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setModal(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
        <label className="sub-title" style={{color:'#11093C'}}>Title </label>
          <Input placeholder="Add description" onChange={(e) => setDescriptionFile(e.target.value)}/>
          <input 
            id="uploader"
            type="file"
            style={{ display: 'none' }} 
            multiple accept={type === 'images' ? "image/png, image/jpeg" : "application/pdf, application/msword, application/vnd.ms-excel, .xlsx, .xls, .docx"}
            onChange={handleFileUpload}
          />
          <div style={{width: '100%'}}>
              <label htmlFor="uploader" className="draw" style={{paddingTop: '40px'}}>
                <img style={{marginRight:'5px', marginTop:'-3px', height: '56px'}} src="/Icons/ic-upload.svg" />
                <h1 style={{fontSize:'19px'}}>Select file to Upload</h1>
                  <p>or drag and drop it here</p>
                  <p style={{paddingTop: '20px'}}>Accepted File Types: {type === 'images' ? '.png or .jpg' : '.docx, .xlsx, or .pdf'}</p>
              </label>
          </div>
        </Row>
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
          <p>Or upload from URL</p>
          <div style={{width: '100%', backgroundColor: '#f5f7ff', padding: '8px'}}>
            <span style={{color:'#11093C', opacity:'0.5'}}>Add the file URL</span>

            <Button
              style={{backgroundColor:'#11093C', color: 'white', borderRadius: '5px', marginLeft:'74%'}}
              onClick={() => addFile(selectedFile, descriptionFile, type)}
            >
              Upload
            </Button>

          </div>
        </Row>
      </div>
    </Modal>        
  </>
  );
}