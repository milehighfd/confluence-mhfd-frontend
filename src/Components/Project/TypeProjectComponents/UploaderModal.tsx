import React, {useState} from "react";
import { Button, Row, Col, Modal, Input } from 'antd';

export const UploaderModal = (
  {modal, setModal, addFile, type}:{ modal: any, setModal: any, addFile: any, type: string}
) => {
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const [descriptionFile, setDescriptionFile] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const IMAGES = 'images'
  const handleFileUpload = (event: any) => {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return;
    }
    const name = event.target.files[0].name;
    const file = event.target.files[0];
    const sizeInMB = file.size / 1048576; 
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);
    if ((type === IMAGES && (!ext || ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'bmp'))  || (type !== IMAGES && (!ext || ext === 'pdf' || ext === 'docx' || ext === 'xlsx' || ext === 'mp4'))) {
      if (sizeInMB <= 99.9) {
        if (name.length <= 50) {
          setSelectedFile(file);
          setErrorMessage('');
        } else {
          setErrorMessage('File name is too long');
        }
      } else {
        setErrorMessage('File size not allowed');
      }
    }
    else {
      setErrorMessage('File type not allowed')
      return;
    }
  }
  const preventDefault = (e:any) => {
    e.preventDefault();
    // e.stopPropagation();
  }

  const dragOver = (event:any) => {
    event.preventDefault();
  }

  const dragEnter = (event:any) => {
    event.preventDefault();
  }

  const dragLeave = (event:any) => {
    event.preventDefault();
  }
  const fileDrop = (event:any) => {
    preventDefault(event);
    if (!event || !event.dataTransfer || !event.dataTransfer.files || event.dataTransfer.files.length === 0) {
      return;
    }
    const name = event.dataTransfer.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);
    if (type === IMAGES){
      if (!ext || ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'bmp'){
        setSelectedFile(event.dataTransfer.files[0]);
        setErrorMessage('')
      } else {
        setErrorMessage('File type not allowed')
        return;
      }
    } else {
      if((!ext || ext === 'pdf' || ext === 'docx' || ext === 'xlsx' || ext === 'mp4')){
        setSelectedFile(event.dataTransfer.files[0]);
        setErrorMessage('')
      } else {
        setErrorMessage('File type not allowed')
        return;
      }
    }
  }
  return (
    <>
    <Modal
      className="detailed-upload"
      style={{ width: '100%'}}
      visible={modal}
      onCancel={() => setModal(false)}
      forceRender={false}
      wrapClassName='center-modal'
      destroyOnClose>
      <div className="upload">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 16 }} lg={{ span: 16 }}>
            <h1 style={{marginTop: '15px'}}>{ type === 'images' ? 'Upload Images' : 'Upload Documents'}
            </h1>
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setModal(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', paddingBottom:'0px'}}>
        <label className="sub-title" style={{color:'#11093C'}}>Title </label>
          <Input placeholder="Add title" onChange={(e) => setDescriptionFile(e.target.value)}/>
          <input 
            id="uploader"
            key={`uploader_${type}`}
            type="file"
            name={`uploader_${type}`}
            style={{ display: 'none' }} 
            multiple accept={type === 'images' ? "image/png, image/jpeg" : "application/pdf, application/msword, application/vnd.ms-excel, .xlsx, .xls, .docx"}
            onChange={handleFileUpload}
            capture
          />
          <div style={{width: '100%'}} onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}>
              <label htmlFor="uploader" className="draw" style={{paddingTop: '40px'}}>
                <img style={{marginRight:'5px', marginTop:'-3px', height: '56px'}} src="/Icons/ic-upload.svg" />
                <h1 style={{fontSize:'19px'}}>Select file to Upload</h1>
                  <p>or drag and drop it here</p>
                  <p style={{paddingTop: '20px'}}>Accepted File Types: {type === 'images' ? '.png or .jpg' : '.docx, .xlsx, or .pdf'}</p>
              </label>
          </div>
        </Row>
        {
          selectedFile && <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', minHeight: '25px', padding: '7px 20px'}}>
          <div style={{width: '100%', padding: '8px'}}>
            <span className="tag-upload" style={{
              background: '#282363',
              borderRadius: '16px',              
              color: 'white',
              padding: '3px 15px'
            }}> {selectedFile.name}    </span>
          </div>
        </Row>
        }
        {
          errorMessage && <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', minHeight: '25px', padding: '7px 20px'}}>
          <div style={{width: '100%', padding: '8px'}}>
            <span className="tag-upload" style={{
              background: 'white',
              borderRadius: '16px',              
              color: 'red',
              padding: '3px 15px'
            }}> {errorMessage}    </span>
          </div>
        </Row>
        }
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', minHeight: '25px', padding: '0px'}}>
          <div style={{width: '100%', padding: '8px'}}>
            <Button
              className="upload-button"
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