import { Button, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';

const solutionstatus = 'solutionstatus';
const componentsType = 'componentsType'

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

  // useEffect(()=>{
  //   console.log('data',data)
  // },[data])

  const apply = () => {
    onSelect(selectedData)
  }

  const reset = () => {
    onSelect([defaultValue]);
    setSelectedData([defaultValue]);
  }

  const showLabel = (label: string) => {
    if(type === componentsType){
      if(label==='Channel Improvements Lin'){
        label = 'Channel Improvements Linear'
      }else if (label==='Stream Improvement'){
        label = 'Stream Improvement Measure'
      }
      return (labels && labels[label]) ? labels[label] : (label ? label : '');
    }else{
      return (labels && labels[label]) ? labels[label] : (label ? label : '');
    }
  }
  return (
    <>
      {
        showControls ? (
        <>
          <Button className="btn-svg" onClick={apply} disabled={type === 'problemPriority'?true : false}>
            Apply
          </Button>
          &nbsp;<span style={{color:'#11093c'}}>|</span>&nbsp;
          <Button className="btn-svg" onClick={reset} disabled={type === 'problemPriority'?true : false}>
            Reset
          </Button>
        </>
        ) : (
          <div style={{marginBottom: 10}}></div>
        )
      }
      <Checkbox.Group 
        disabled={type === 'problemPriority'?true : false}
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