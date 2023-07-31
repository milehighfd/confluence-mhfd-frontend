import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { boardType } from 'Components/Work/Request/RequestTypes';
import { getCsvFileName, getCsv } from 'Components/Work/Request/RequestViewUtil';

const DownloadCSV = ({
  type,
  localities,
  columns,
  locality,
  year,
  tabKey,
  sumTotal,
  sumByCounty,
  reqManager,
  diff
}: {
  type: boardType,
  localities: any[],
  columns: any[],
  locality: string,
  year: any,
  tabKey: string,
  sumTotal: any,
  sumByCounty: any,
  reqManager: any,
  diff: any
}) => {
  const [csvData, setCsvData] = useState<string[][]>([[]]);
  const [csvFileName, setCsvFileName] = useState<string>('');
  return (
    <Popover content={<span>Export:<br/>Download a CSV of the board below.</span>} placement='bottom' overlayClassName='popover-work-header' >
    <Button 
    className='buttons-header'
    type='link' style={{border:'none'}}>
      <CSVLink
        filename={csvFileName}
        data={csvData}
        onClick={() => {
          setCsvFileName(getCsvFileName(year, locality, type));
          setCsvData(getCsv(type, localities, columns, locality, year, tabKey, sumTotal, sumByCounty, reqManager, diff));
        }}        
        style={{ padding: '0px' }}
      >
        <img
          className="icon-bt"
          style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" , WebkitMaskSize:'74%'}}
          alt=""
          src=""
        />
      </CSVLink>
    </Button>
    </Popover>
  );
};

export default DownloadCSV;
