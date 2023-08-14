import { DeleteOutlined } from "@ant-design/icons";
import React from "react";

//table geomeotry
export const DATA_SOURCE_GEOMEOTRY = [
  {
    key: 'title-1',
    reach: 'Clear Creek',
    delete: true,
  },
  {
    key: '2',
    reach: 'Alpha St culvert',
    code:'6.3600.2',
    tributary:'2302 acres',
    length:'1861 ft',
  },
  {
    key: '3',
    reach: 'Beta Ave culvert',
    code:'6.3600.2',
    tributary:'2302 acres',
    length:'1861 ft',
  },
  {
    key: '4',
    reach: 'Beta Ave culvert',
    code:'6.3600.2',
    tributary:'2302 acres',
    length:'1861 ft',
  },
  {
    key: 'title-2',
    reach: 'Big Bear Branch',
    delete: true,
  },
  {
    key: '5',
    reach: 'Beta Ave culvert',
    code:'6.3600.2',
    tributary:'2302 acres',
    length:'1861 ft',
  },
  {
    key: 'total',
    reach: 'Total',
    tributary:'2302 acres',
    length:'1861 ft',
    delete: true,
  },
];

export const COLUMNS_GEOMEOTRY = [
  {
    title: 'Reach',
    dataIndex: 'reach',
    key: 'reach',
    width: '39%',
    render: (text: any) => {
      if(text === 'Total'){
        return (
          <span className='total-cost'>
            {text}
          </span>
        );
      }
      return (text);
    }
  },
  {
    title: 'MHFD Code',
    dataIndex: 'code',
    key: 'code',
    width: '20%',
  },
  {
    title: 'Tributary',
    dataIndex: 'tributary',
    key: 'tributary',
    width: '20%',
  },
  {
    title: 'Reach Length',
    dataIndex: 'length',
    key: 'length',
    width: '20%',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    width: '1%',
    render: (text:any) => {
      console.log(text, 'STATE')
      if(text && text === true){
        return ('');
      }else{
        return (
          <div>
            <DeleteOutlined className='ico-delete' onClick={() => console.log('delete')} />
          </div>
        );
      }
    }
  },
];

export const CONTENT_POPUP_CAPITAL =<div className="popver-info popver-project">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>;
export const CONTENT_POPUP_STUDY =<div className="popver-info popver-project">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>;
export const CONTENT_POPUP_MAINTENANCE =<div className="popver-info popver-project">Projects that repair or restore existing infrastructure and are eligible for MHFD participation.</div>;
export const CONTENT_POPUP_R_D =<div className="popver-info popver-project">Research and Development projects include new stream/rain gages, research, data development, new education and outreach programming, and criteria or guidance development.</div>;
export const CONTENT_POPUP_ACQUISITION =<div className="popver-info popver-project">The purchase of property that is shown to have high flood risk or is needed to implement master plan improvements.</div>;

export const CAPITAL_POPUP = 'Capital';
export const MAINTENANCE_POPUP = 'Maintenance';
export const R_D_POPUP = 'R&D';
export const STUDY_POPUP = 'Study';
export const ACQUISITION_POPUP = 'Acquisition';
