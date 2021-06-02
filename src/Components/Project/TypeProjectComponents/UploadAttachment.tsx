import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Popover, Checkbox } from 'antd';
import { useAttachmentDispatch, useAttachmentState } from "../../../hook/attachmentHook";
import { Attachment } from "../../Work/Request/RequestTypes";
import { saveAs } from 'file-saver';

const content06 = (<div className="popver-info"></div>);

let counter = 0;

export const UploadAttachment = ({ files, setFiles, setCover , isCapital}: {
  files: any[],
  setFiles: Function,
  setCover: Function,
  isCapital?: any
}) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const [draggin, setDraggin] = useState(false);

  const { attachments } = useAttachmentState();
  const { deleteAttachment, toggleAttachment } = useAttachmentDispatch();

  const onChange: any = (e: any) => {
    let newFiles = e.target.files;
    updateFileState(newFiles)
  };
  const handleDragNewFiles = (newFiles: any[]) => {
    updateFileState(newFiles)
  }

  const updateFileState = (newFiles: any[]) => {
    let newObjects = [];
    for (var i = 0; i < newFiles.length; i++) {
      newObjects.push({
        file: newFiles[i],
        isCover: false
      })
    }
    setFiles([...files, ...newObjects])
  }

  useEffect(() => {
    const handleDragIn = (e: any) => {
      counter++;
      e.preventDefault()
      e.stopPropagation()
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDraggin(true);
      }
    }
    const handleDragOut = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      counter--;
      if (counter > 0) return;
      setDraggin(false);
    }
    const handleDrag = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const handleDrop = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      setDraggin(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleDragNewFiles(e.dataTransfer.files)
        e.dataTransfer.clearData()
        counter = 0
      }
    }
    [labelRef].forEach(ref => {
      let div: any = ref.current;
      div.addEventListener('dragenter', handleDragIn)
      div.addEventListener('dragleave', handleDragOut)
      div.addEventListener('dragover', handleDrag)
      div.addEventListener('drop', handleDrop)
    })

    return () => {
      [labelRef].forEach(ref => {
        let div: any = ref.current;
        div.removeEventListener('dragenter', handleDragIn)
        div.removeEventListener('dragleave', handleDragOut)
        div.removeEventListener('dragover', handleDrag)
        div.removeEventListener('drop', handleDrop)
      })
    }
  }, [])

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const formatDate = (timestamp: number) => {
    let date = new Date(timestamp);
    var day = date.getDate();
    let months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return `${day} ${months[month]}, ${year} at ${hours}:${minutes}`;
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const toggle = (index: number) => {
    let newObjects;
    if (files[index].isCover) {
      console.log('setCover', '');
      setCover('')
      newObjects = files.map((o, i) => {
        return {
          ...o,
          isCover: false
        }
      })
    } else {
      console.log('setCover', files[index].file.name);
      setCover(files[index].file.name)
      newObjects = files.map((o, i) => {
        return {
          ...o,
          isCover: i === index
        }
      })
    }
    setFiles(newObjects);
    attachments.forEach((a: Attachment, i: number) => {
      if (a.isCover) {
        toggleAttachment(i, a._id)
      }
    })
  }

  const toggle2 = (index: number) => {
    toggleAttachment(index, attachments[index]._id);
    attachments.forEach((a: Attachment, i: number) => {
      if (i !== index && a.isCover) {
        toggleAttachment(i, a._id)
      }
    })
    setFiles(files.map((o) => ({ ...o, isCover: false })));
    console.log('setCover', '');
    setCover('')
  }

  const removeFile2 = (index: number) => {
    deleteAttachment(index, attachments[index]._id);
    setFiles(files.filter((_, i) => i !== index))
  }

  const downloadAttachment = (a: Attachment) => {
    saveAs(a.value, a.filename)
  }

  const downloadFile = (f: any) => {
    saveAs(f, f.name);
  }

  return (
    <>
      <h5>{isCapital?'6':'4'}. Upload Attachments <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
      <input id="uploader" type="file" style={{ display: 'none' }} onChange={onChange} multiple accept="image/png, image/jpeg" />
      <div ref={labelRef}>
        {draggin && 
          <label htmlFor="uploader" className="draw" style={{ border: '1px dashed #28C499', color: '#28C499' }}>
            <img className="icon-draw-01" style={{ WebkitMask: 'url("/Icons/icon-17.svg") center center no-repeat', background: '#28C499' }} />
            <p>Attach main image in PNG or JPEG format</p>
          </label>       
        }
        {
          !draggin && 
          <label htmlFor="uploader" className="draw">
            <img className="icon-draw-01" style={{ WebkitMask: 'url("/Icons/icon-17.svg") center center no-repeat' }} />
            <p>Attach main image in PNG or JPEG format</p>
          </label>
        }
      </div>
      {
        ((attachments && attachments.length > 0) || (files && files.length > 0)) &&
        <Row className="title-galery">
        <Col xs={{ span: 24 }} lg={{ span: 21 }} xxl={{ span: 21 }}>Uploaded</Col>
        <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>Cover Image</Col>
        </Row>
      }
      {
        attachments && attachments.map((a: Attachment, i:number) => (
          <Row key={i} className="card-image">
            <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
              {
                a.mimetype === 'image/png' ? (
                  <img src="/Icons/project/png.svg" alt="" height="27px" />
                ) : (
                  <img src="/Icons/project/jpg.svg" alt="" height="27px" />
                )
              }
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
              <p onClick={()=> downloadAttachment(a)}>{a.filename}</p>
              <label>{formatDate(new Date(a.updatedAt).getTime())} • {formatBytes(a.filesize)}</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>
              <Button className="btn-transparent" onClick={() => removeFile2(i)}>
                <img src="/Icons/icon-16.svg" alt="" height="15px" />
              </Button>
              <Checkbox checked={a.isCover} onChange={() => toggle2(i)} />
            </Col>
          </Row>
        ))
      }
      {
        files.map((f, i) => (
          <Row key={i} className="card-image">
            <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
              {
                f.file.type === 'image/png' ? (
                  <img src="/Icons/project/png.svg" alt="" height="27px" />
                ) : (
                  <img src="/Icons/project/jpg.svg" alt="" height="27px" />
                )
              }

            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
              <p onClick={()=> downloadFile(f.file)}>{f.file.name}</p>
              <label>{formatDate(f.file.lastModified)} • {formatBytes(f.file.size)}</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>
              <Button className="btn-transparent" onClick={() => removeFile(i)}>
                <img src="/Icons/icon-16.svg" alt="" height="15px" />
              </Button>
              <Checkbox checked={f.isCover} onChange={() => toggle(i)} />
            </Col>
          </Row>
        ))
      }

    </>
  );
}
