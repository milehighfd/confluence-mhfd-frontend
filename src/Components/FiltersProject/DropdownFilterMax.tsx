import { Button, Select, Col } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

export const DropdownFiltersYearsMax = ({ type, selected, onSelect, defaultValue, labels, showControls = true }: any) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  const data: any = [{"value":2000,"counter":0},{"value":2001,"counter":0},{"value":2002,"counter":0},{"value":2003,"counter":0},{"value":2004,"counter":null},{"value":2005,"counter":0},{"value":2006,"counter":0},{"value":2007,"counter":0},{"value":2008,"counter":null},{"value":2009,"counter":null},{"value":2010,"counter":0},{"value":2011,"counter":null},{"value":2012,"counter":null},{"value":2013,"counter":null},{"value":2014,"counter":null},{"value":2015,"counter":null},{"value":2016,"counter":null},{"value":2017,"counter":null},{"value":2018,"counter":null},{"value":2019,"counter":null},{"value":2020,"counter":null},{"value":2021,"counter":null},{"value":2022,"counter":null},{"value":2023,"counter":0},{"value":2024,"counter":0},{"value":2025,"counter":0},{"value":2026,"counter":null},{"value":2027,"counter":null},{"value":2028,"counter":null},{"value":2029,"counter":null},{"value":2030,"counter":null}];
  const apply = () => {
    console.log('Selected data year', selectedData);
    // if (type === 'yearofstudy') {
      onSelect([selectedData[0], selectedData[selectedData.length -1]]);
    // } else {
    //   onSelect(selectedData.join(','));
    // }
  }

  const reset = () => {
    onSelect(defaultValue);
    setSelectedData([]);
    setMinIndex(-1);
    setMaxIndex(-1);
  };

  useEffect(() => {
    const sData: any[] = [];
    if (minIndex !== -1 && maxIndex !== -1) {
      for(let i = minIndex; i <= maxIndex; i++ ) {
        if (data[i]) {
          sData.push(data[i].value);
        }
      }    
      setSelectedData(sData);
    }
  }, [minIndex, maxIndex]);
  return (
    <>
      {showControls ? (
        <>
          <Button className="btn-svg" onClick={apply}>
            <u>Apply</u>
          </Button>
          &nbsp;|&nbsp;
          <Button className="btn-svg" onClick={reset}>
            <u>Reset</u>
          </Button>
        </>
      ) : (
        <div style={{ marginBottom: 10 }}></div>
      )}
      <div className='dropdown-container-filter'>
        <Col xs={{ span: 45 }} lg={{ span: 23 }}  style={{ paddingLeft: '0px' }}>
          <Select
            placeholder="Min year"
            value={minIndex === -1 ? 'Min year' : data[minIndex]?.value}
            style={{ width: '100%', fontSize: '12px' }}
            onChange={(e: number) => {
              if (e < maxIndex || maxIndex === -1) {
                setMinIndex(e);
              } else {
                setMinIndex(maxIndex - 1);
              }
            }}
          >
            {(data || []).map((element: any, index: number) => {
              return (
                element && <Option key={index} value={index}>{`${element?.value} `}</Option>
              );
            })}
          </Select>
        </Col>
        <Col xs={{ span: 6 }} lg={{ span: 3 }} style={{ paddingRight: '0px', paddingLeft: '0px' }} >
          <hr className='linedropdown'></hr>
        </Col>
        <Col xs={{ span: 45 }} lg={{ span: 23 }} style={{ paddingRight: '0px' }} >
          <Select
            placeholder="Max year"
            value={maxIndex === -1 ? 'Max year' : data[maxIndex]?.value}
            style={{ width: '100%', fontSize: '12px' }}
            onChange={(e: number) => {
              if ( e > minIndex ) {
                setMaxIndex(e);
              } else {
                setMaxIndex(minIndex + 1);
              }
            }}
          >
            {(data || []).map((element: any, index: number) => {
              return (
                element && <Option key={index} value={index}>{`${element?.value} `}</Option>
              );
            })}
          </Select>
        </Col>
      </div>
    </>
  );
};
