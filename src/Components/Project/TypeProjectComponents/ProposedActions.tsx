import React, { useState, useEffect } from "react";
import { Table, Button, Popover } from 'antd';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';

interface ProposedActionsProps {
  keys: any;
  groups: any;
  removeIndComponent: any;
  removeComponent: any;
  thisIndependentComponents: any;
  setThisIndependentComponents: any;
  visibleUnnamedComponent: any;
  isDrawState: any;
  onClickDraw: any;
  applyIndependentComponent: any;
  contentIndComp: any;
  changeValueIndComp: any;
  index: number;
}

export const ProposedActions = (props: ProposedActionsProps) => {
  const { 
    keys, 
    groups, 
    removeIndComponent, 
    removeComponent,
    thisIndependentComponents,
    visibleUnnamedComponent,
    isDrawState,
    onClickDraw,
    applyIndependentComponent,
    contentIndComp,
    changeValueIndComp,
    index
  } = props;

  const [groupParsed, setGroupParsed] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(groups)) {
      const output = groups.flatMap((x: any) =>
        x?.components?.map((y: any) => ({
          key: y.object_id,
          action: y.table,
          cost: y.original_cost,
          status: 'Active',
          problem: x.problemname,
          cartodb_id: y.cartodb_id,
          table: y.table,
        }))
      );
      setGroupParsed(output);
    }
  }, [groups]);

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '35%',
      render: (text: any) => {
        if(text === 'Total Proposed Cost'){
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
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '34%',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any, record:any) => {
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' onClick={() => removeComponent(record)} />
            </div>
          );
        }
      }
    },
  ];
  const columnsIndependent  = [
    {
      title: 'Independent Actions',
      dataIndex: 'name',
      key: 'action',
      width: '35%',
      sorter: (a:any, b:any) => a.age - b.age,
      render: (text:any,record:any) => (
        <input
          value={record.name}
          onChange={(e) => changeValueIndComp(e, 'name', record)}
          className='input-independent'
          placeholder='Proposed Actions'
        />
      )
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
      render: (text:any,record:any) => (
        <input
          value={record.cost}
          onChange={(e) => changeValueIndComp(e, 'name', record)}
          className='input-independent'
          placeholder='Proposed Actions'
        />
      ),
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '34%',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any, record:any) => {
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' onClick={() => removeIndComponent(record)} />
            </div>
          );
        }
      }
    },
  ];

  return (
    <>
      <div className="sub-title-project">
        <h5>{index}. SELECT PROPOSED ACTIONS&nbsp;*</h5>
      </div>
      <div className={"draw " + (isDrawState ? 'active' : '')} onClick={onClickDraw}>
        <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
        <p>Click on the icon above and draw a polygon to select action items</p>
      </div>
      {((keys && keys !== 0 && keys.length && groups && Object.keys(groups).length > 0)) &&
        <>
          <Table dataSource={groupParsed} columns={columns} className='table-project' />
        </>
      }
      {visibleUnnamedComponent && <Table dataSource={thisIndependentComponents} columns={columnsIndependent} className='table-project' />}
      <Button className="btn-transparent-green" onClick={() => { applyIndependentComponent() }}><PlusCircleFilled /> Independent Actions</Button> <Popover content={contentIndComp}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-actions' /></Popover>
    </>
  );
}

export default ProposedActions;