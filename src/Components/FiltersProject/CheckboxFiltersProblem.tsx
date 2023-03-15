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
    var selected1 = selected.split(',');
    if (selected1 && selected1.length) {
      let temporal = selected1
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
        defaultValue={['Active']}
        value={selectedData}
        options={data ? data.map((element: any) => {
          return {label: showLabel(element.value), value: (element.value || element.value === 0) ? element.value : ''};
        }) : []}
        onChange={(e) => {
          if (type === solutionstatus) {
            setSelectedData(e.map(lol => +lol));
          } else {
            setSelectedData(e.map(lol => `${lol}`));
          }
        
      }} />
    </>
  )
}