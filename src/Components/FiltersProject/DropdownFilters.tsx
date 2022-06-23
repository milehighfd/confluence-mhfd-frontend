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

export const DropdownFilters = ({ data, type, selected, onSelect, defaultValue, labels, showControls = true }: any) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  useEffect(() => {
    console.log('this is the data', data);
  }, [data]);
  useEffect(() => {
    if (selected && selected.length) {
      let temporal = selected
        .split(',')
        .filter((r: any) => r !== '')
        .map((r: any) => {
          if (type === solutionstatus) {
            return +r;
          } else {
            return r;
          }
        });
      setSelectedData(temporal);
    }
  }, [selected]);

  const apply = () => {
    onSelect(transformSelectedData(selectedData));
  };

  const reset = () => {
    onSelect(defaultValue);
    setSelectedData([]);
  };

  const showLabel = (label: string) => {
    return labels && labels[label] ? labels[label] : label;
  };

  useEffect(() => {
    const sData: any[] = [];
    for(let i = minIndex; i <= maxIndex; i++ ) {
      let value = `${data[i].min},${data[i].max}`;
      sData.push(value);
    }    
    setSelectedData(sData);
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
          placeholder="- no min -"
          value={minIndex === -1 ? '- no min -' : data[minIndex].min}
          style={{ width: '100%' }}
          onChange={(e: number) => {
            setMinIndex(e);
          }}
        >
          {(data || []).map((element: any, index: number) => {
            return (
              element && <Option key={index} value={index}>{`${element.min} `}</Option>
            );
          })}
        </Select>
        <Select
          placeholder="- no max -"
          value={maxIndex === -1 ? '- no max -' : data[maxIndex].min}
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
              element && <Option key={index} value={index}>{`${element.min} `}</Option>
            );
          })}
        </Select>
      </div>
    </>
  );
};
