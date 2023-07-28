import { Radio, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {  WINDOW_WIDTH } from 'constants/constants';
import { useProjectState } from 'hook/projectHook';
import { DeleteOutlined } from '@ant-design/icons';
import { Countywide } from './Countywide';

interface Props {
  isDrawStateCapital: any;
  onClickDrawCapital: any;
  showDraw: boolean;
  type: string;
}
const { Option } = Select;

export const ProjectGeometry = ({ 
  isDrawStateCapital, 
  onClickDrawCapital,
  showDraw,
  type,
}: Props) => {
  const [streamListdata, setStreamListData] = useState<any>([]);
  const [keys, setKeys] = useState<any>(['-false']);
  const {
    listStreams
  } = useProjectState();
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  useEffect(() => {
    console.log('Should reach ', listStreams);
    if (listStreams) {
      const myset = new Set(keys);
      Object.keys(listStreams).forEach((key: any, id: any) => {
        if (!streamListdata[key]) {
          myset.add(`${key}`);
        } else if (streamListdata[key].length !== listStreams[key].length) {
          myset.add(`${key}`);
        }
      });
      setKeys(Array.from(myset));
      const dataFormated: any = [];
      Object.keys(listStreams).forEach((key: any, id: any) => {
        const titleTemplate = {
          key: `title-${id}`,
          reach: key,
          delete: true,
        };
        dataFormated.push(titleTemplate);
        const substreams = listStreams[key];
        substreams.forEach((substream: any, index: any) => {
          const rowTemplate = {
            key: `${id}_${index}`,
            reach: substream.str_name,
            code: substream.mhfd_code,
            tributary:'XXXX acres',
            length:`${formatter.format(substream.length)} ft`
          };
          dataFormated.push(rowTemplate);
        });
      });
      setStreamListData(dataFormated);
    } else{
      setStreamListData([]);
    }
  }, [listStreams]);
  
  const columnsGeometryDefault  = [
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
      width: '20%'
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
  const [columnsGeometry, setColumnsGeometry] = useState(columnsGeometryDefault);
  useEffect(() => {
    if (type !== 'STUDY') {
      const columnsGeometryNoStudy = columnsGeometryDefault.filter((column: any) => {
        return column.key !== 'code' && column.key !== 'tributary';
      });
      setColumnsGeometry(columnsGeometryNoStudy)
    } else {
      setColumnsGeometry(columnsGeometryDefault);
    }
  }, [type]);
  return (
    <>
      {showDraw && <>
        {(
          <div className={`draw ${isDrawStateCapital ? 'active' : ''}`} onClick={onClickDrawCapital}>
            <img src="/Icons/icon-08.svg" className="icon-draw" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
            <p className='text-body-project'>Click on the icon above and draw a polygon to define the project feature</p>
          </div>
        )}
        {streamListdata.length > 0 && (
          <Table
            dataSource={streamListdata}
            columns={columnsGeometry}
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
        )}
      </>}
    </>
  )
};