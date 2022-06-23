import { Button, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';

const transformSelectedData = (sData: any) => {
  return sData.map((r: any) => `${r}`)
}

const solutionstatus = 'solutionstatus';
const status = 'status';
const component_type = 'component_type';

export const CheckBoxFilters = ({
  data, type, selected, onSelect, defaultValue,
  labels,
  showControls=true,
}: any) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  useEffect(() => {
    let temporal = selected.split(',')
    .filter((r: any) => r !== '')
    .map((r: any) => {
      if (type === solutionstatus) {
        return +r;
      } else {
        return r;
      }
    });
    setSelectedData(temporal);
  }, [selected]);

  const apply = () => {
    onSelect(transformSelectedData(selectedData))
  }

  const reset = () => {
    onSelect(defaultValue);
    setSelectedData([]);
  }

  const showLabel = (label: string) => {
    return labels && labels[label] ? labels[label] : label;
  }

  return (
    <>
      {
        showControls ? (
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
          <div style={{marginBottom: 10}}></div>
        )
      }
      <Checkbox.Group onChange={(e) => {
        setSelectedData(e.map(lol => `${lol}`));
      }}>
        {data && data.map((element: any) => (
          <>
            <Checkbox value={element.value} key={element.value}>
            {showLabel(element.value)}
            </Checkbox>
            <>

            </>
            
          </>
        ))}
      </Checkbox.Group>
    </>
  )
}