import { Button, Dropdown, Menu, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const transformSelectedData = (sData: any) => {
  return sData.map((r: any) => `${r}`);
};

const solutionstatus = 'solutionstatus';
const status = 'status';
const component_type = 'component_type';
const { Option } = Select;

export const DropdownFiltersYears = ({ data, type, selected, onSelect, defaultValue, labels, showControls = true }: any) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  // useEffect(() => {
  //   console.log(selectedData);
  // }, [selectedData]);

  useEffect(() => {
    console.log('this is the data', data);
  }, [data]);
  // useEffect(() => {
  //   if (selected && selected.length) {
  //     let temporal = selected
  //       .split(',')
  //       .filter((r: any) => r !== '')
  //       .map((r: any) => {
  //         if (type === solutionstatus) {
  //           return +r;
  //         } else {
  //           return r;
  //         }
  //       });
  //     setSelectedData(temporal);
  //   }
  // }, [selected]);

  const apply = () => {
    if (type === 'yearofstudy') {
      onSelect(selectedData);
    } else {
      onSelect(selectedData.join(','));
    }
  }

  const reset = () => {
    onSelect(defaultValue);
    setSelectedData([]);
    setMinIndex(-1);
    setMaxIndex(-1);
  };

  const showLabel = (label: string) => {
    return labels && labels[label] ? labels[label] : label;
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
        <Select
          placeholder="Min year"
          value={minIndex === -1 ? 'Min year' : data[minIndex]?.value}
          style={{ width: '100%' }}
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
        <Select
          placeholder="Max year"
          value={maxIndex === -1 ? 'Max year' : data[maxIndex]?.value}
          style={{ width: '100%' }}
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
      </div>
    </>
  );
};
