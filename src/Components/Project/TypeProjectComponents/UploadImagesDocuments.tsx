import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table, Tag } from 'antd';
import { useAttachmentState } from "../../../hook/attachmentHook";
import { saveAs } from 'file-saver';
import b64ToBlob from "b64-to-blob";
import { CloudDownloadOutlined, PictureOutlined } from "@ant-design/icons";
import { UploaderModal } from "./UploaderModal";
import { SERVER } from "Config/Server.config";
import { getDataNoJSON } from '../../../Config/datasets';
import * as datasets from "../../../Config/datasets";
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import ImageModal from 'Components/Shared/Modals/ImageModal';
import { useLocation } from "react-router";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
export const UploadImagesDocuments = ({
  isCapital, 
  setFiles, 
  index, 
  type, 
  visibleCapital,
  uploadRef
}: {
  isCapital?: any,
  setFiles: any, 
  index?: any, 
  type: string, 
  visibleCapital: boolean,
  uploadRef: any
}) => {
  const {
    setDeleteAttachmentsIds,
  } = useProjectDispatch();
  const {
    deleteAttachmentsIds,
    disableFieldsForLG,
  } = useProjectState();
  const {isEdit} = useProjectState();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery(); 
  const [modal, setModal] = useState(false);
  const [modal02, setModal02] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const typeS = query.get('type') || type;
  const [active, setActive] = useState(0);
  const [dataImages, setDataImages] = useState<any[]>([
  ]);
  const [dataFiles, setDataFiles] = useState<any[]>([
  ]);
  
  const [toDelete, setToDelete] = useState<any[]>([]);
  const [toDeleteFiles, setToDeleteFiles] = useState<any[]>([]);
  const { attachments, project_id } = useAttachmentState();
  const getTypeImage = (mime_type: any) => {
    if ( mime_type.includes('png') ) {
      return 'png';
    } else if( mime_type.includes('jpeg') ) {
      return 'jpeg';
    } else if( mime_type.includes('jpg')) {
      return 'jpg';
    } else if (mime_type.includes('pdf')){
      return 'pdf'
    } else if (mime_type.includes('doc')){
      return 'doc';
    } else {
      return 'file';
    }
  }
  useEffect(() => {    
    if (attachments.data) {
      const images = attachments?.data?.filter(
        (_: any) => _.mime_type?.includes('png') || _.mime_type?.includes('jpeg') || _.mime_type?.includes('jpg')
      ).map((img: any) => {
        return {
          ...img,
          type: getTypeImage(img.mime_type),
          size: formatBytes(img.size, 1),
          key: img.project_attachment_id,
          file: img,
          value: img.value,
        };
      });
      const docs = attachments?.data?.filter(
        (_: any) => !(_.mime_type?.includes('png') || _.mime_type?.includes('jpeg') || _.mime_type?.includes('jpg'))
      ).map((file: any) => {
        return {
          ...file,
          type: getTypeImage(file.mime_type),
          size: formatBytes(file.size, 1),
          key: file.project_attachment_id,
          date: formatDate(file.created_date),
          file: file,
          value: file.value,
        }
      });
      setDataImages(images);
      setDataFiles(docs);
    }    
  }, [attachments.data]);
  const COLUMNS_UPLOAD02:any = [
    {
      title: "Filename",
      dataIndex: "file_name",
      className: "user-name-upload",
      width: "35%",
      render: (text: any) => (
        <>
           {typeof text === 'string' && text.substring(0, text.indexOf('.'))}
        </>
      )
    },
    {
      title: "Size",
      dataIndex: "size",
      className: "user-text",
      width: "17%"
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "25%",
      className: "user-text",
    },
    {
      title: "Type",
      dataIndex: "type",
      className: "user-type",
      render: (text:string) => (
        <Tag className="type uppercase">
          {text}
        </Tag>
      ),
      width: "10%"
    },
    {
      title: "",
      dataIndex: "download",
      render: (id:string, record: any) => (
        <Button className="user-download " onClick={() => {
          if (record.attachment_url) {
            saveAs(record.attachment_url, record.file_name);
          } else {
            saveAs(record.file, record.file_name);
          }
        }}>
          <img className="icon-bt" src='/Icons/icon-01.svg' style={{height: '14px'}}/>
        </Button>
      ),
      width: "5%"
    },
  ];
  const handle = (row: any) => {
    const copy = [...dataImages].map((d) => {
      if (row.key === d.key) {
        d.cover = true;
        d.is_cover = true;
      } else {
        d.cover = false;
        d.is_cover = false;
      }
      return d;
    });
    setDataImages([...copy]);
  }
  const COLUMNS_UPLOAD:any = [
    {
      title: "Filename",
      dataIndex: "file_name",
      className: "user-name-upload",
      width: "47%",
      render: (text: any) => (
        <>
          {typeof text === 'string' && text.substring(0, text.indexOf('.'))}
        </>
      )
    },
    {
      title: "Size",
      dataIndex: "size",
      className: "user-text",
      width: "20%"
    },
    {
      title: "Cover",
      dataIndex: "is_cover",
      render: (text:boolean, record: any) => {
        return (
        <Tag className={record.cover || record.is_cover? "cover-active": "cover"} onClick={() => handle(record)}>
          Cover
        </Tag>
      )},
      onCell: (record: any) => ({
        record,
        handle
      }),
      width: "10%",
      className: "user-cover",
    },
    {
      title: "Type",
      dataIndex: "type",
      className: "user-type",
      render: (text:string) => (
        <Tag className="type uppercase">
          {text}
        </Tag>
      ),
      width: "10%"
    },
    {
      title: "Download",
      dataIndex: "download",
      render: (id:string, record: any) => (
        <Button className="user-download " onClick={() => {
          if (record.attachment_url) {  
            saveAs(record.attachment_url, record.file_name);
          } else {
            saveAs(record.file, record.file_name);
          }
        }}>
          <img className="icon-bt" src='/Icons/icon-01.svg'  style={{height: '14px'}}/>
        </Button>
      ),
      width: "5%"
    },
  ];

  const downloadZip = (images: boolean) => {
    datasets.getData(`${SERVER.URL_BASE}/attachments/download/${project_id}${images ? '?images=1' : ''}`, datasets.getToken())
      .then((r: any) => {
        const dataBlob = b64ToBlob(r.zipData, 'application/zip')
        saveAs(dataBlob, `project_${project_id}.zip`);
      });
  }
 
  useEffect(() => {
    setFiles([...dataImages, ...dataFiles]);
  }, [dataImages, dataFiles]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {     
      setToDelete(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const rowSelectionFiles = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setToDeleteFiles(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const formatBytes = (bytes: number, decimals = 2) => {
    const minSizeInMB = 0.1;
    const dm = decimals < 0 ? 0 : decimals;
    const sizeInMB = bytes / 1048576;
    if (sizeInMB < minSizeInMB) {
      return minSizeInMB.toFixed(dm) + ' MB';
    }
    return parseFloat(sizeInMB.toFixed(dm)) + ' MB';
  }

  const formatDate = (timestamp: number) => {
    let date = new Date(timestamp);
    var day = date.getDate();
    let months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    var month = date.getMonth();
    var year = date.getFullYear();
    // var hours = date.getHours();
    // var minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return `${day} ${months[month]}, ${year}`;
  }
  function renameFile(originalFile: any, newName: string) {
    const lastI = originalFile.name.indexOf('.');
    return new File([originalFile], newName+originalFile.name.substring(lastI, originalFile.name.length), {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
const mimeToExtension = (mimeType:any) => {
  const mimeMap:any = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-excel': 'xls',
    'application/msword': 'doc'
  };
  return mimeMap[mimeType] || null;
}
  const addFile = (file: any, description: any, type: string) => {
    const newFile = renameFile(file, description ? description : file.name);
    if (type === 'images') {
      setDataImages((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          file_name: newFile.name,
          type: file.type.replace('image/', '').toUpperCase(),
          size: formatBytes(file.size, 1),
          key: file.name + file.lastModified,
          file: newFile,
          cover: oldData.length === 0 ? true: false
        }] 
      })
      setModal(false);
    } else {
      const lastI = file.type.indexOf('/');
      setDataFiles((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          file_name: newFile.name,
          type: (file.type.includes('msword')|| file.type.includes('vnd') ? mimeToExtension(file.type).toUpperCase() :file.type.substring(lastI+1, file.type.length).toUpperCase()),
          size: formatBytes(file.size, 1),
          key: file.name + file.lastModified,
          date: formatDate(file.lastModified),
          file: newFile
        }] 
      });
      setModal02(false);
    }
  }
  const deleteImages = () => {
    const deleteIds = [...deleteAttachmentsIds,...toDelete];
    setDeleteAttachmentsIds(deleteIds);
    setDataImages((oldData: any) => oldData.filter((d: any) => !toDelete.includes(d.key)));   
  };
  const deleteFiles = () => {
    const deleteIds = [...deleteAttachmentsIds,...toDeleteFiles];
    console.log(toDeleteFiles)
    setDeleteAttachmentsIds(deleteIds);
    setDataFiles((oldData: any) => oldData.filter((d: any) => !toDeleteFiles.includes(d.key)));    
  }
  return (
    <>
    <div className="upload-sections" ref={uploadRef}>
      <div className="upload-documents">
        <div className="sub-title-project sub-title-project-upload">
          <h5 className="requestor-information">{index}
            . Upload images 
          </h5>
          <div className="group-btn">
            {toDelete.length ?  <span onClick={deleteImages} className="delete-upload">Delete</span> : null }
            <Button disabled={disableFieldsForLG} className="bottomn-heder" onClick={() => (setModal(true))}>
              <span className="ic-document"/>Add Image
            </Button>
            <Button className="bottomn-heder" onClick={() => (setOpenImage(true))}>
              <PictureOutlined />See Images
            </Button>
            {isEdit?<Button className="bottomn-heder" onClick={() => downloadZip(true)} disabled={!dataImages.length}>
              <CloudDownloadOutlined />Download All 
            </Button>:<></>}
          </div>
        </div>
          <Table
            style={{width: '100%'}}
            showSorterTooltip={false}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            className="table-project"
            columns={COLUMNS_UPLOAD}
            dataSource={dataImages}
          />
        {modal &&
          <UploaderModal  modal={modal} setModal={setModal} addFile={addFile} type="images"/>
        }
        {
          <ImageModal
          visible={openImage}
          setVisible={setOpenImage}
          type={typeS}
          active={active}
          setActive={setActive}
          visibleCapital={visibleCapital}
        />
        }
      </div>
      <div className="upload-documents">
        <div className="sub-title-project sub-title-project-upload">
          <h5 className="location">{index+1}
            . Upload documents
          </h5>
          <div className="group-btn">
          {toDeleteFiles.length ?  <span onClick={deleteFiles} className="delete-upload">Delete</span> : null }
            <Button disabled={disableFieldsForLG} className="bottomn-heder" onClick={() => (setModal02(true))}>
              <span className="ic-document"/>Add Document
            </Button>
            {isEdit?<Button className="bottomn-heder" onClick={() => downloadZip(false)} disabled={!dataFiles.length}>
              <CloudDownloadOutlined />Download All 
            </Button>:<></>}
          </div>
        </div>
          <Table
            style={{width: '100%'}}
            rowSelection={{
              type: 'checkbox',
              ...rowSelectionFiles,
            }}
            className="table-project"
            columns={COLUMNS_UPLOAD02}
            dataSource={dataFiles}

          />
        {modal02 &&
          <UploaderModal  modal={modal02} setModal={setModal02} addFile={addFile} type="documents"/>
        }
      </div>
    </div>
    </>
  );
}

