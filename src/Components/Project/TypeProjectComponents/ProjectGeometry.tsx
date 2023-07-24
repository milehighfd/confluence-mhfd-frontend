import { Radio, Select, Table } from 'antd';
import React from 'react';
import {  WINDOW_WIDTH } from 'constants/constants';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
  county: any;
  setCounty: any;
  isDrawStateCapital: any;
  onClickDrawCapital: any;
}
const { Option } = Select;

export const ProjectGeometry = ({ county, setCounty, isDrawStateCapital, onClickDrawCapital }: Props) => {
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
        <h5>3. PROJECT GEOMETRY *</h5>
      </div>
      <p className='text-default'>Projects are spatially defined by stream reaches.  Select the option below that best allows you to define the project.</p>
      <div className='section-gemetry'>
        <p>i. Is this a countywide project?</p>
        <Radio.Group>
          <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
          <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
        </Radio.Group>
        <div className='section-county'>
          <label className="sub-title">Select one or multiple counties </label>
          <Select
            mode="multiple"
            placeholder={county?.length !== 0 ? county : "Select a County"}
            style={{ width: '100%' }}
            listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
            onChange={(county: any) => setCounty(county)}
            value={county}>
            <Option key='Adams' value='Adams'>Adams</Option>
          </Select>
        </div>
        <p>ii. Is this project located on the South Platte River?</p>
        <Radio.Group>
          <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
          <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
        </Radio.Group>
        <p className='sub-sub-title-projects'>iii. Draw your project geometry</p>
      </div>

      <div className={"draw " + (isDrawStateCapital ? 'active' : '')} onClick={onClickDrawCapital}>
        <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
        <p className='text-body-project'>Click on the icon above and draw a polygon to define the project feature</p>
      </div>
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