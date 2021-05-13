import React from "react";
import { Upload, message } from 'antd';
// import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
// https://www.mocky.io/v2/5cc8019d300000980a055e76

export default ({setListFiles, listFiles } : any) => {
   //const { handleGetFiles } = props;
  //console.log('listado ' + listFiles);
  //  console.log(setListFiles);
  const props2 = {
    name: 'file'
  };
  //  const props2 = {
  //     name: 'file',
  //     multiple: true,
  //     //action: 'http://localhost:3003/graphql',

  //     onChange(info: any) {
  //       //console.log(info);
  //       const { status } = info.file;
  //       if (status !== 'uploading') {
  //         //console.log(info.file, info.fileList);
  //       }
        
  //       //handleGetFiles = info.fileList;
  //       // if (status === 'done') {
  //       //   message.success(`${info.file.name} file uploaded successfully.`);
  //       // } 
  //       // else if (status === 'error') {
  //       //   message.error(`${info.file.name} file upload failed.`);
  //       // }
  //     }
  //   };
    
    return (
      // 
      <Dragger {...props2} onChange={(event) =>{
        console.log('eventi');
        console.log(event);
        const aux = [...listFiles];
        aux.push(event.file);
        setListFiles(aux);

        //console.log('PORPS SS ' + props2);
        
      } }>
        <p className="ant-upload-drag-icon">
          {/* <InboxOutlined /> */}
        </p>
        <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
        <p className="ant-upload-hint"></p>
      </Dragger>
    );
}