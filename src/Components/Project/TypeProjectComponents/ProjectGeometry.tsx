import { Radio, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {  WINDOW_WIDTH } from 'constants/constants';
import { useProjectState, useProjectDispatch } from 'hook/projectHook';
import { DeleteOutlined } from '@ant-design/icons';
import { Countywide } from './Countywide';
import { deletefirstnumbersmhfdcode } from 'utils/utils';

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
  const {
    setHighlightedStreams,
    setHighlightedStream
  } = useProjectDispatch();
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
      console.log('Parsing, listSTreams', listStreams);
      Object.keys(listStreams).forEach((key: any, id: any) => {
        const titleTemplate = {
          key: `title-${id}`,
          reach: key,
          delete: true,
        };
        dataFormated.push(titleTemplate);
        const substreams = listStreams[key];
        console.log('substreams', substreams, 'of main ', key);
        substreams.forEach((substream: any, index: any) => {
          let formatedNumber = formatter.format(substream.length);
          if (formatedNumber.length === 5) {
            formatedNumber = formatedNumber.replace(',', '');
          } 
          const rowTemplate = {
            key: `${id}_${index}`,
            reach: substream.str_name,
            code: substream.mhfd_code,
            tributary:'XXXX acres',
            length:`${formatedNumber} ft`
          };
          dataFormated.push(rowTemplate);
        });
      });
      console.log('Data ormated', dataFormated);
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
            pagination={false}
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
            onRow={(record, rowIndex) => {
              if (record.key.includes('title')) {
                return {
                  onMouseEnter: (event) => {
                    const key = record.reach;
                    console.log('streamListdata[key]', listStreams[key], key);
                    if (key === 'Unnamed Streams') {
                      setHighlightedStreams(listStreams[key])
                    } else {
                      const streamData = listStreams[key];
                      const valueHighlight = !(streamData[0].mhfd_code) ? deletefirstnumbersmhfdcode(streamData[0]) : streamData[0].mhfd_code;
                      console.log('valueHighlight', valueHighlight, streamData[0].mhfd_code, 'streamData[0]', streamData[0]);
                      setHighlightedStream(valueHighlight);
                    }
                  },
                  onMouseLeave: (event) => {
                    setHighlightedStream(undefined);
                  },
                };
              }  else {
                return {
                  onMouseEnter: (event) => {},
                }
              }
            }}
          
          />
        )}
      </>}
    </>
  )
};