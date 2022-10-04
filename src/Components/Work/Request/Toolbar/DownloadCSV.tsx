import { Button } from 'antd';
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
    <Button className="btn-opacity">
      <CSVLink
        filename={csvFileName}
        data={csvData}
        onClick={() => {
          setCsvFileName(getCsvFileName(year, locality, type));
          setCsvData(getCsv(type, localities, columns, locality, year, tabKey, sumTotal, sumByCounty, reqManager, diff));
        }}
        className="btn-opacity"
        style={{ padding: '0px' }}
      >
        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" }} src="" />
      </CSVLink>
    </Button>
  );
};

export default DownloadCSV;
