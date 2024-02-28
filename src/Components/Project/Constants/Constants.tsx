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

export const CONTENT_POPUP_CAPITAL =<div className="popver-info popver-project"><b>Capital: </b>Master planned improvements that increase conveyance or reduce flow.</div>;
export const CONTENT_POPUP_STUDY =<div className="popver-info popver-project"><b>Study: </b>Master plans that identify problems and recommend improvements.</div>;
export const CONTENT_POPUP_MAINTENANCE =<div className="popver-info popver-project"><b>Capital :</b>Restore existing infrastructure eligible for MHFD participation.</div>;
export const CONTENT_POPUP_R_D =<div className="popver-info popver-project"><b>R&D: </b>Research and Development projects include new stream/rain gages, research, data development, new education and outreach programming, and criteria or guidance development.</div>;
export const CONTENT_POPUP_ACQUISITION =<div className="popver-info popver-project"><b>Acquisition: </b>Property with high flood risk or needed for improvements.</div>;
export const CONTENT_POPUP_ROUNTINE_TRASH =<div className="popver-info popver-project"><b>Routine Trash and Debris (Maintenance): </b>Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>;
export const CONTENT_POPUP_VEGETATION_MANAGEMENT =<div className="popver-info popver-project"><b>Vegetation Management (Maintenance): </b>Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>;
export const CONTENT_POPUP_SEDIMENT_REMOVAL =<div className="popver-info popver-project"><b>Sediment Removal (Maintenance): </b>Removal of accumulated sediment to maintain capacity in the system.</div>;
export const CONTENT_POPUP_MINOR_REPAIR =<div className="popver-info popver-project"><b>Minor Repair (Maintenance): </b>Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>;
export const CONTENT_POPUP_RESTORATION  =<div className="popver-info popver-project"><b>Restoration (Maintenance): </b>Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>;


export const CAPITAL_POPUP = 'Capital';
export const MAINTENANCE_POPUP = 'Maintenance';
export const R_D_POPUP = 'R&D';
export const STUDY_POPUP = 'Study';
export const ACQUISITION_POPUP = 'Acquisition';
export const ROUNTINE_TRASH_POPUP = 'Routine Trash and Debris';
export const VEGETATION_MANAGEMENT_POPUP = 'Vegetation Management';
export const SEDIMENT_REMOVAL_POPUP = 'Sediment Removal';
export const MINOR_REPAIR_POPUP = 'Minor Repair';
export const RESTORATION_POPUP = 'Restoration';

