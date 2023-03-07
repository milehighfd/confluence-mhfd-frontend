import { Button, Select, Col } from 'antd';
import React, { useEffect, useState } from 'react';

const transformSelectedData = (sData: any) => {
  return sData.map((r: any) => `${r}`);
};

const { Option } = Select;

export const DropdownFilters = ({ data, onSelect, defaultValue, labels, showControls = true }: any) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);

  const moneyFormat = (money: any) => {
    
    if (isNaN(+money)) {
      return money;
    }
    let million = false;
    let amount = money;
    if (+money >= 1_000_000) {
      amount = +money / 1_000_000;
      million = true;
    }
    return `$${amount?.toFixed(0)}${million ? 'M' : ''}`;
  };

  const apply = () => {
    onSelect(transformSelectedData(selectedData));
  };

  const reset = () => {
    onSelect(defaultValue);
    setSelectedData([]);
    setMinIndex(-1);
    setMaxIndex(-1);
  };

  useEffect(() => {
    const sData: any[] = [];
    if (minIndex !== -1 && maxIndex !== -1) {
      for (let i = minIndex; i <= maxIndex; i++) {
        let value = `${data[i].min},${data[i].max}`;
        sData.push(value);
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
      <div className="dropdown-container-filter">
        <Col xs={{ span: 45 }} lg={{ span: 23 }} style={{ paddingLeft: '0px' }}>
          <Select
            placeholder="No min"
            value={minIndex === -1 ? 'No min' : data[minIndex]?.min}
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
              return element && <Option key={index} value={index}>{`${moneyFormat(element?.min)} `}</Option>;
            })}
          </Select>
        </Col>
        <Col xs={{ span: 6 }} lg={{ span: 3 }} style={{ paddingRight: '0px', paddingLeft: '0px' }}>
          <hr className="linedropdown"></hr>
        </Col>
        <Col xs={{ span: 45 }} lg={{ span: 23 }} style={{ paddingRight: '0px' }}>
          <Select
            placeholder="No max"
            value={maxIndex === -1 ? 'No max' : data[maxIndex]?.min}
            style={{ width: '100%', fontSize: '12px' }}
            onChange={(e: number) => {
              if (e > minIndex) {
                setMaxIndex(e);
              } else {
                setMaxIndex(minIndex + 1);
              }
            }}
          >
            {(data || []).map((element: any, index: number) => {
              return element && <Option key={index} value={index}>{`${moneyFormat(element?.min)} `}</Option>;
            })}
          </Select>
        </Col>
      </div>
    </>
  );
};
