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
    console.log('selected data ', selectedData);
  }, [selectedData]);

  useEffect(() => {
    if (selected && selected.length) {
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
    }
  }, [selected]);

  const apply = () => {
    onSelect(selectedData)
  }

  const reset = () => {
    onSelect([defaultValue]);
    setSelectedData([defaultValue]);
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
      <Checkbox.Group 
        defaultValue={['Active']}
        value={selectedData}
        options={data.map((element: any) => {
          return {label: showLabel(element.value), value: element.value};
        })}
        onChange={(e) => {
        console.log(e);
        setSelectedData(e.map(lol => `${lol}`));
      }} />
    </>
  )
}