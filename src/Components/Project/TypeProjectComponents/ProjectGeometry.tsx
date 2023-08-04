import { Radio, Select, Table } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
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
    listStreams,
    streamsIntersectedIds
  } = useProjectState();
  const currentListStreams = useRef<any>(listStreams);
  const currentStreamsIds = useRef<any>(streamsIntersectedIds);
  const {
    setHighlightedStreams,
    setHighlightedStream,
    setStreamsIds,
    setStreamsList
  } = useProjectDispatch();
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    console.log('listStreams', listStreams);
  },[listStreams]);

  useEffect(() => {
    console.log('showDraw', showDraw);
  },[showDraw]);

  const formatNumberToFeet = (number:number) => {
    const roundedNumber = Math.round(number);
    const formattedNumber = formatter.format(roundedNumber);
    return formattedNumber + ' feet';
  }

  const formatListStreams = (thislistStreams: any) => {
    console.log('qqqqq',listStreams)
    const myset = new Set(keys);
      Object.keys(thislistStreams).forEach((key: any, id: any) => {
        if (!streamListdata[key]) {
          myset.add(`${key}`);
        } else if (streamListdata[key].length !== thislistStreams[key].length) {
          myset.add(`${key}`);
        }
      });
      setKeys(Array.from(myset));
      const dataFormated: any = [];
      console.log('Parsing, thislistStreams', thislistStreams);
      Object.keys(thislistStreams).forEach((key: any, id: any) => {
        const titleTemplate = {
          key: `title-${id}`,
          reach: key,
          delete: true,
        };
        dataFormated.push(titleTemplate);
        const substreams = thislistStreams[key];
        console.log('substreams', substreams, 'of main ', key);
        substreams.forEach((substream: any, index: any) => {
          let formatedNumber = formatter.format(substream.length);
          if (formatedNumber.length === 5) {
            formatedNumber = formatedNumber.replace(',', '');
          } 
          const rowTemplate = {
            key: `${id}_${index}`,
            reach: substream.jurisdiction,
            code: substream.mhfd_code,
            tributary:'XXXX acres',
            length:`${formatedNumber} ft`,
            ...substream
          };
          dataFormated.push(rowTemplate);
        });
      });
      console.log('Data ormated', dataFormated);
      setStreamListData(dataFormated);
  }
  useEffect(() => {
    currentStreamsIds.current = streamsIntersectedIds;
  }, [streamsIntersectedIds]);
  useEffect(() => {
    if (listStreams) {
      currentListStreams.current = listStreams;
      formatListStreams(listStreams);
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
      render: (text: any, record:any) => {
        if(text === 'Total'){
          return (
            <span className='total-cost'>
              {text}
            </span>
          );
        }
        if(record.key.includes('title')){
          return (
            <>
              {text}&nbsp;&nbsp;&nbsp;<DeleteOutlined className='ico-delete' onClick={() => removeStreamByName(record)} />
            </>
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
      render: (text: any) => {
        if (text === undefined) {
          return ('');
        }else{
          return formatNumberToFeet(text);
        }
      }
    },
    // {
    //   title: '',
    //   dataIndex: 'delete',
    //   key: 'delete',
    //   width: '1%',
    //   render: (text:any, record:any, index:any) => {
    //     if(text && text === true){
    //       return (
    //         <div>
    //           <DeleteOutlined className='ico-delete' onClick={() => removeStreamByName(record)} />
    //         </div>
    //       ); 
    //     }else{
    //       return ('');
    //     }
    //   }
    // },
  ];

  const removeStreamByName = (stream: any) => {
    let mhfd_NameToRemove = stream?.reach;
    let copyList = { ...currentListStreams.current };
    for (let jurisdiction in copyList) {
      let newArray = [...copyList[jurisdiction]].filter((st: any) => st.str_name !== mhfd_NameToRemove);
      copyList[jurisdiction] = newArray;
    }
    let newCopyList: any = {};
    for (let jurisdiction in copyList) {
      if (copyList[jurisdiction].length > 0) {
        newCopyList[jurisdiction] = copyList[jurisdiction];
      }
    }

    setStreamsList(newCopyList);
    if (currentStreamsIds.current.length > 0) {
      let newIds = [...currentStreamsIds.current].filter((id: any) => {
        const arrayValues = mhfd_NameToRemove.split('.');
        return id.str_name !== arrayValues.join('.');
      });
      setStreamsIds(newIds);
    }
  }

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