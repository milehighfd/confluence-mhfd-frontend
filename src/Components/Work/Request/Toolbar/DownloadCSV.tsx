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
    <Popover className='buttons-header' content={<div className='popover-text'><b>Export:</b> Download board to CSV.</div>} placement="bottomLeft" overlayClassName='popover-work-header project-popover' >
    <Button 
    className='buttons'
    type='link'>
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
          src='Icons/ic-004.svg'
          alt=""
        />
      </CSVLink>
    </Button>
    </Popover>
  );
};

export default DownloadCSV;
