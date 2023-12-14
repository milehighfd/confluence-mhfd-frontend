import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Dropdown, Select } from 'antd';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import React, { useState, useCallback, useEffect } from 'react';
import { FilterByGroupName } from 'routes/portfolio-view/components/FilterByGroupField';

let isInit = true;
export const UpcomingProjectHeader = () => {
  const {
    filterProjectOptions,
    filterProjectOptionsNoFilter,
  } = useMapState();
  const {
    setFilterProjectOptions
  } = useMapDispatch();
  const [filterby, setFilterby] = useState('');
  const [filterValue, setFilterValue] = useState(-1);
  const [filtername, setFiltername] = useState('Mile High Flood District');
  const [openDrop, setOpenDrop] = useState(false);
  const apply = useCallback((values: any, field: string, resetFilterBy: string) => {
    let options = isInit ? {...filterProjectOptionsNoFilter} : {...filterProjectOptions};  
    // if (!(resetFilterBy === 'projecttype' && tabKey !== 'All') && resetFilterBy !== '') {
    //   options[resetFilterBy] = '';
    // }    
    if ('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field
    || 'consultant' === field || 'contractor' === field || 'jurisdiction' === field 
    || 'staff' === field) {
        let newValue = '';
        if ('workplanyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
        }
        if ('staff' === field) {
          newValue = values;
          options['mhfdmanager'] = newValue;
        }else{
          newValue = values;
          options[field] = newValue;
        }
    } else {
        if ('completedyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
            options[field] = values;
        } else if ('streamname' === field) {
          if (values === '') {
            options[field] = values;
          } else {
            options[field] = [values];
          }
        } else if ('totalcost' === field) {
          options[field] = [values[0], values[values.length - 1]];
        } else if (field) {
            options[field] = values;
        }
    }
    setFilterProjectOptions(options);
    // setUpdateFilter(options);
  }, [filterProjectOptions]);
  useEffect(() => {
    // isInit=true;
    // resetFilterProjectOptionsEmpty();
    if (filterValue != -1) {
      apply([filterValue], filterby, '');     
    } else {
      apply([], filterby, '');
    }
  } ,[filterby, filterValue]);
  const menu = (
    <FilterByGroupName 
      setFilterby={setFilterby}
      setFiltervalue={setFilterValue}
      setFiltername={setFiltername}
      isPortfolio={false}
    />
  );

  return (
    <div className="portafolio-head">
      {/* <Select className='upcoming-select' options={items} bordered={false} defaultValue='South Watershed'></Select> */}
      <h2 style={{maxWidth:'351px'}}>
        <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight" onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
          <div className="select-area">
            <a onClick={e => e.preventDefault()} style={{marginLeft:'2%', display:'flex', alignItems:'baseline'}}>
              {<h2 style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{filterby === 'county' ? filtername + " County" : (filterby === 'servicearea' ? filtername + " Service Area" : filtername)}</h2>} &nbsp;
              {openDrop ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
            </a>
          </div>
        </Dropdown>
      </h2>
    </div>
  );
};
