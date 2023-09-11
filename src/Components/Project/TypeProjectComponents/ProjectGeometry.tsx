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
    streamsIntersectedIds,
    disableFieldsForLG,
  } = useProjectState();
  const currentListStreams = useRef<any>(listStreams);
  const currentStreamsIds = useRef<any>(streamsIntersectedIds);
  const {
    setHighlightedStreams,
    setHighlightedStream,
    setStreamsIds,
    setStreamsList,
    setStreamIntersected
  } = useProjectDispatch();
  const formatterIntegers = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formatterDecimals = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


  const formatNumberToFeet = (number:number) => {
    const roundedNumber = Math.round(number);
    const formattedNumber = formatterIntegers.format(roundedNumber);
    const miles = number * 0.000189394;
    const formattedMiles = formatterDecimals.format(miles);
    return (
      <>
      {formattedNumber + ' feet '} 
      <br/>
      {'(' + formattedMiles + ' miles)'}
      </>
    );
  }

  const formatListStreams = (thislistStreams: any) => {
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
      let totalTributary:any = 0;
      let totalLength:any = 0;
      Object.keys(thislistStreams).forEach((key: any, id: any) => {
        const titleTemplate = {
          key: `title-${id}`,
          reach: key,
          delete: true,
          mhfd_code: thislistStreams[key][0].mhfd_code,
        };
        dataFormated.push(titleTemplate);
        const substreams = thislistStreams[key];
        substreams.forEach((substream: any, index: any) => {
          totalTributary += (substream.tributary ?? 0);
          totalLength += (substream.length ?? 0);
          const rowTemplate = {
            ...substream,
            key: `${id}_${index}`,
            reach: substream.jurisdiction,
            code: substream.mhfd_code,
            tributary: substream.tributary ?? 0,
            length: substream.length ?? 0,
            
          };

          dataFormated.push(rowTemplate);
        });
      });
      dataFormated.push(
        {
          key: 'total',
          reach: 'Total',
          tributary: totalTributary,
          length: totalLength,
          delete: false,
        }
      );
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
              {text}&nbsp;&nbsp;&nbsp; {(type === 'study') &&
                <DeleteOutlined
                  className='ico-delete'
                  disabled={disableFieldsForLG}
                  onClick={() => {
                    if (!disableFieldsForLG) {
                      removeStreamByName(record)
                    }
                  }
                  } />}
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
      render: (text: any) => {
        if (text === undefined) {
          return ('');
        }else{
          return formatterIntegers.format(+text) + ' acre-feet';
        }
      }
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
    let mhfd_codeToRemove = stream?.mhfd_code;
    let copyList = { ...currentListStreams.current };
    for (let jurisdiction in copyList) {      let newArray = [...copyList[jurisdiction]].filter((st: any) => {
        if (mhfd_NameToRemove === 'Unnamed Streams') {
          return st.str_name ? st.str_name !== 'Unnamed Streams' : st.stream.stream.stream_name;
        } else {
          return st.str_name ? st.str_name !== mhfd_NameToRemove : st.stream.stream.stream_name !== mhfd_NameToRemove;
        }
      });
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
        if (mhfd_NameToRemove === 'Unnamed Streams') {
          return id.str_name;
        } else {
          return id.mhfd_code_full ? id.mhfd_code_full !== mhfd_codeToRemove : id.mhfd_code !== mhfd_codeToRemove; 
        }
      });
      setStreamsIds(newIds);
    }
    
    
  }

  const clearTableAndGeom = () => {
    setStreamIntersected({ geom: null });
    setStreamsList([]);
    setStreamsIds([]);
  }

  const [columnsGeometry, setColumnsGeometry] = useState(columnsGeometryDefault);
  useEffect(() => {
    if (type !== 'study') {
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
          <div className={`draw ${isDrawStateCapital ? 'active' : ''}`} onClick={disableFieldsForLG ? null : onClickDrawCapital}>
            <img src="/Icons/icon-08.svg" className="icon-draw" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
            <p className='text-body-project'>Click on the icon above and draw a polygon to define the project feature</p>
          </div>
        )}
        {Object.keys(listStreams).length > 0 && (
          <p className='requiered-text'>
            <span className='requiered' onClick={()=> clearTableAndGeom()}>Clear Table</span>
          </p>
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
                      const valueHighlight = !(streamData[0].cartodb_id) ? deletefirstnumbersmhfdcode(streamData[0]) : streamData[0].mhfd_code;
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