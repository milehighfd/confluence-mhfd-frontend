import { Radio, Select, Table } from 'antd';
import React from 'react';
import {  WINDOW_WIDTH } from 'constants/constants';
import { DeleteOutlined } from '@ant-design/icons';
import { Countywide } from './Countywide';

interface Props {
  county: any;
  setCounty: any;
  isDrawStateCapital: any;
  onClickDrawCapital: any;
  index: number;
  showDraw: boolean;
  setShowDraw: Function;
}
const { Option } = Select;

export const ProjectGeometry = ({ 
  county, 
  setCounty, 
  isDrawStateCapital, 
  onClickDrawCapital,
  index,
  showDraw,
  setShowDraw
}: Props) => {
  
  //table geomeotry
  const dataSourceGeomeotry = [
    {
      key: 'title-1',
      reach: 'Clear Creek',
      delete: true,
    },
    {
      key: '2',
      reach: 'Alpha St culvert',
      code:'6.3600.2',
      tributary:'2302 acres',
      length:'1861 ft',
    },
    {
      key: '3',
      reach: 'Beta Ave culvert',
      code:'6.3600.2',
      tributary:'2302 acres',
      length:'1861 ft',
    },
    {
      key: '4',
      reach: 'Beta Ave culvert',
      code:'6.3600.2',
      tributary:'2302 acres',
      length:'1861 ft',
    },
    {
      key: 'title-2',
      reach: 'Big Bear Branch',
      delete: true,
    },
    {
      key: '5',
      reach: 'Beta Ave culvert',
      code:'6.3600.2',
      tributary:'2302 acres',
      length:'1861 ft',
    },
    {
      key: 'total',
      reach: 'Total',
      tributary:'2302 acres',
      length:'1861 ft',
      delete: true,
    },
  ];
  
  const columnsGeomeotry  = [
    {
      title: 'Reach',
      dataIndex: 'reach',
      key: 'reach',
      width: '39%',
      render: (text: any) => {
        if(text === 'Total'){
          return (
            <span className='total-cost'>
              {text}
            </span>
          );
        }
        return (text);
      }
    },
    {
      title: 'MHFD Code',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
    },
    {
      title: 'Tributary',
      dataIndex: 'tributary',
      key: 'tributary',
      width: '20%',
    },
    {
      title: 'Reach Length',
      dataIndex: 'length',
      key: 'length',
      width: '20%',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any) => {
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' onClick={() => console.log('delete')} />
            </div>
          );
        }
      }
    },
  ];
  return (
    <>
      <div className="sub-title-project">
        <h5>{index}. PROJECT GEOMETRY *</h5>
      </div>      
      <Countywide
        county={county}
        setCounty={setCounty}
        setShowDraw={setShowDraw}
        showDraw={showDraw}
      />
      {showDraw && <div className={"draw " + (isDrawStateCapital ? 'active' : '')} onClick={onClickDrawCapital}>
        <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
        <p className='text-body-project'>Click on the icon above and draw a polygon to define the project feature</p>
      </div>}
      <Table
        dataSource={dataSourceGeomeotry}
        columns={columnsGeomeotry}
        className='table-project table-geometry'
        rowClassName={(record, index) => {
          if (record.key.includes('total')) {
            return ('row-geometry-total')
          }
          if (record.key.includes('title') || record.key.includes('total')) {
            return ('row-geometry-title')
          } else {
            return ('row-geometry-body')
          }
        }}
      />
    </>
  );
};