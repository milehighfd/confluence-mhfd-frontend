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