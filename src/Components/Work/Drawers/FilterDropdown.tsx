import { DownOutlined, InfoCircleOutlined, UpOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Select } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React, {useState, useEffect} from 'react';
import { capitalLetter, capitalizeWords } from 'utils/utils';

const { Option } = Select;

const FilterDropdown = ({
  label
}: {
  label: string;
}) => {
  const {
    setCostRange
  } = useRequestDispatch();
  const { 
    filterCost
  } = useRequestState();
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  const moneyFormat = (moneyComplete: any) => {
    const money = moneyComplete.min;
    if (isNaN(+money)) {
      return money;
    }
    let million = false;
    let amount = money;
    if (+money >= 1_000_000) {
      amount = (+money / 1_000_000);
      million = true;
    }
    return `$${numberWithCommas(amount.toFixed(0))}${million ? 'M' : ''}`;
  };
  const numberWithCommas =(x:any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  useEffect(() => {
    const sData: any[] = [];
    if (minIndex !== -1 || maxIndex !== -1) {
      let minValue = minIndex !== -1 ? minIndex : 0;
      let maxValue = maxIndex !== -1 ? maxIndex : data.length -1 ;
      sData.push(data[minValue].min);
      sData.push(data[maxValue].min ); 
      setCostRange(sData);
    }
  }, [minIndex, maxIndex]);
  const data: any = [
    {"min":0,"max":999999.999,"last":false},
    {"min":250000,"max":1999999.999,"last":false},
    {"min":500000,"max":2999999.999,"last":false},
    {"min":750000,"max":3999999.999,"last":false},
    {"min":1000000,"max":4999999.999,"last":false},
    {"min":2000000,"max":5999999.999,"last":false},
    {"min":3000000,"max":6999999.999,"last":false},
    {"min":4000000,"max":4999999.999,"last":false},
    {"min":5000000,"max":5999999.999,"last":false},
    {"min":6000000,"max":6999999.999,"last":false},
    {"min":7000000,"max":7999999.999,"last":false},
    {"min":8000000,"max":8999999.999,"last":false},
    {"min":9000000,"max":9999999.999,"last":false},
    {"min":10000000,"max":10999999.999,"last":false},
    {"min":11000000,"max":11999999.999,"last":false},
    {"min":12000000,"max":12999999.999,"last":false},
    {"min":13000000,"max":13999999.999,"last":false},
    {"min":14000000,"max":14999999.999,"last":false},
    {"min":15000000,"max":15999999.999,"last":false},
    {"min":16000000,"max":16999999.999,"last":false},
    {"min":17000000,"max":17999999.999,"last":false},
    {"min":18000000,"max":18999999.999,"last":false},
    {"min":19000000,"max":19999999.999,"last":false},
    {"min":20000000,"max":20999999.999,"last":false},
    {"min":21000000,"max":21999999.999,"last":false},
    {"min":22000000,"max":22999999.999,"last":false},
    {"min":23000000,"max":23999999.999,"last":false},
    {"min":24000000,"max":24999999.999,"last":false},
    {"min":25000000,"max":25999999.999,"last":false},
    {"min":26000000,"max":26999999.999,"last":false},
    {"min":27000000,"max":27999999.999,"last":false},
    {"min":28000000,"max":28999999.999,"last":false},
    {"min":29000000,"max":29999999.999,"last":false},
    {"min":30000000,"max":30999999.999,"last":false},
    {"min":31000000,"max":31999999.999,"last":false},
    {"min":32000000,"max":32999999.999,"last":false},
    {"min":33000000,"max":33999999.999,"last":false},
    {"min":34000000,"max":34999999.999,"last":false},
    {"min":35000000,"max":35999999.999,"last":false},
    {"min":36000000,"max":36999999.999,"last":false},
    {"min":37000000,"max":37999999.999,"last":false},
    {"min":38000000,"max":38999999.999,"last":false},
    {"min":39000000,"max":39999999.999,"last":false},
    {"min":40000000,"max":40999999.999,"last":false},
    {"min":41000000,"max":41999999.999,"last":false},
    {"min":42000000,"max":42999999.999,"last":false},
    {"min":43000000,"max":43999999.999,"last":false},
    {"min":44000000,"max":44999999.999,"last":false},
    {"min":45000000,"max":45999999.999,"last":false},
    {"min":46000000,"max":46999999.999,"last":false},
    {"min":47000000,"max":47999999.999,"last":false},
    {"min":48000000,"max":48999999.999,"last":false},
    {"min":49000000,"max":49999999.999,"last":false},
    {"min":50000000,"max":50999999.999,"last":false},
    {"min":51000000,"max":51999999.999,"last":false},
    {"min":52000000,"max":52999999.999,"last":false},
    {"min":53000000,"max":53999999.999,"last":false},
    {"min":54000000,"max":54999999.999,"last":false},
    {"min":55000000,"max":55999999.999,"last":false},
    {"min":56000000,"max":56999999.999,"last":false},
    {"min":57000000,"max":57999999.999,"last":false},
    {"min":58000000,"max":58999999.999,"last":false},
    {"min":59000000,"max":59999999.999,"last":false},
    {"min":60000000,"max":61000000,"last":true}
  ];
  useEffect(() => {
    if(filterCost && filterCost.length === 0) {
      setMinIndex(-1);
      setMaxIndex(-1);  
    }
  } ,[filterCost]);
  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ paddingBottom: '10px' }}>
        <span className='sub-title-filter'>{capitalizeWords(label)} </span>
        {/* <InfoCircleOutlined style={{opacity:0.3}} /> */}
      </div>
      <div className='dropdown-container-filter'>
          <Select
            placeholder="No min"
            value={minIndex === -1 ? 'No min' : moneyFormat(data[minIndex])}
            style={{ width: '100%', fontSize: '12px' }}
            listHeight={256}
            getPopupContainer={(trigger:any) => trigger.parentNode}
            open={isOpen1}
            onDropdownVisibleChange={() => { setIsOpen1(!isOpen1) }}
            className={`${isOpen1 && 'test-select'}`}
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
                element && <Option key={index} value={index}>{`${moneyFormat(element)} `}</Option>
              );
            })}
          </Select>
          <Select
            placeholder="No max"
            value={maxIndex === -1 ? 'No max' : moneyFormat(data[maxIndex])}
            style={{ width: '100%', fontSize: '12px' }}
            listHeight={256}
            getPopupContainer={(trigger:any) => trigger.parentNode}
            open={isOpen2}
            onDropdownVisibleChange={() => { setIsOpen2(!isOpen2) }}
            className={`${isOpen2 && 'test-select'}`}
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
                element && <Option key={index} value={index}>{`${moneyFormat(element)} `}</Option>
              );
            })}
          </Select>
      </div>
    </div>
  )
};

export default FilterDropdown;

