import { Button, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';

const solutionstatus = 'solutionstatus';

export const CheckBoxFilters = ({
  data, type, selected, onSelect, defaultValue,
  labels,
  showControls=true,
}: any) => {
  const [selectedData, setSelectedData] = useState<any[]>([]);


  useEffect(() => {
    if (selected && selected.length) {
      let temporal = selected
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
    if (defaultValue) {
      onSelect([defaultValue]);
      setSelectedData([defaultValue]);
    } else {
      onSelect(defaultValue);
      setSelectedData(defaultValue);
    }
    
  }

  const showLabel = (label: string) => {
    return (labels && labels[label]) ? labels[label] : (label ? label : '');
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
        defaultValue={[defaultValue]}
        value={selectedData}
        options={data ? data.map((element: any) => {
          return {label: showLabel(element.value), value: element.id ? element.id : -1};
        }) : []}
        onChange={(e) => {
          setSelectedData(e);
       }} />
    </>
  )
}