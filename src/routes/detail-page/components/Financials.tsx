import React, { useEffect, useState } from "react";
import { Button, Carousel, Checkbox, Col, Dropdown, Menu, Modal, Progress, Row, Space, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import type { MenuProps } from 'antd';
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import AddAmountModal from "Components/Shared/Modals/AddAmountModal";

const Financials = () => {
  const [openModalAmount, setOpenModalAmount] = useState(false);
  const [viewDropdown, setViewDropdow] = useState(
    {
      income : true,
      exprense : true
    }
  );
  const [openDrop, setOpenDrop] = useState(false);
  const [openDropPhatner, setOpenPhatner] = useState(false);
  const [openDropPhase, setOpenDropPhase] = useState(false);
  const columns = [
    {
      title: 'Agreement',
      dataIndex: 'agreement',
      key: 'agreement',
      render: (agreement:string[]) => (
        <p className={"table-" + agreement[1]}>{agreement[0]}</p>
      ),
    },
    {
      title: 'Amendment',
      dataIndex: 'amendment',
      key: 'amendment',
    },
    {
      title: 'Partner',
      dataIndex: 'partner',
      key: 'partner',
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      render: (phase:any) => (
        <span className={'span-' + phase}>
          {phase}
        </span>
      ),
    },
    {
      title: 'Projected',
      dataIndex: 'projected',
      key: 'projected',
      render: (projected:string[]) => (
        <p className={"table-" + projected[1]}>{projected[0]}</p>
      ),
    },
    {
      title: 'Encumbered',
      dataIndex: 'encumbered',
      key: 'encumbered',
      render: (encumbered:string[]) => (
        <p className={"table-" + encumbered[1]}>{encumbered[0]}</p>
      ),
    },
    {
      title: 'Tyler Encumbered',
      dataIndex: 'tyler',
      key: 'tyler',
      render: (tyler:string[]) => (
        <p className={"table-" + tyler[1]}>{tyler[0]}</p>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available:string[]) => (
        <p className={"table-" + available[1]}>{available[0]}</p>
      ),
    },
  ];
  const menu = (
    <Menu
      className="menu-density"
      // onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label:
          <Checkbox
            onChange={()=> {
              if(viewDropdown.income && !viewDropdown.exprense)
              {
                setViewDropdow({exprense: true, income: false})
              }else{
                setViewDropdow({...viewDropdown, income: !viewDropdown.income})}
              }
            }
            checked={viewDropdown.income}>Income</Checkbox>,
          key: 'Compact',
        },
        {
          label:
          <Checkbox
            onChange={()=>{
              if(!viewDropdown.income && viewDropdown.exprense)
              {
                setViewDropdow({exprense: false, income: true})
              }else{
                setViewDropdow({...viewDropdown, exprense: !viewDropdown.exprense})}
              }
            }
            checked={viewDropdown.exprense}>Expense</Checkbox>,
          key: 'Normal',
        },
      ]}
    />
  );
  const menu2 = (
    <Menu
      className="menu-density"
      // onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label:<span > Partner</span>,
          key: 'Partner',
        },
      ]}
    />
  );
  const menu3 = (
    <Menu
      className="menu-density"
      // onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label:<span > Phase</span>,
          key: 'Phase',
        },
      ]}
    />
  );


  return (
    <>
      <AddAmountModal visible={openModalAmount} setVisible={setOpenModalAmount}/>

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="project-financials">PROJECT FINANCIALS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'73%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={ menu } placement="bottomLeft" trigger={['click']} onVisibleChange={()=>{setOpenDrop(!openDrop)}} getPopupContainer={(trigger:any) => trigger.parentNode}>
            <Space className='dropdown-view' style={viewDropdown.exprense && viewDropdown.income ?{borderLeft: '4px solid #9faeb1'}:{}}>
              <div>View: {viewDropdown.exprense && viewDropdown.income ? 'All' : (viewDropdown.exprense ? 'Expense': 'Income')}</div>
              {!openDrop ? <UpOutlined style={{color:'#251863'}} /> : < DownOutlined style={{color:'#251863'}} />}
            </Space>
          </Dropdown>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={ menu2 } placement="bottomLeft" trigger={['click']} onVisibleChange={()=>{setOpenPhatner(!openDropPhatner)}} getPopupContainer={(trigger:any) => trigger.parentNode}>
            <Space className='dropdown-view'>
              <div>Partner</div>
              {!openDropPhatner ? <UpOutlined style={{color:'#251863'}} /> : < DownOutlined style={{color:'#251863'}} />}
            </Space>
          </Dropdown>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={ menu3 } placement="bottomLeft" trigger={['click']} onVisibleChange={()=>{setOpenDropPhase(!openDropPhase)}} getPopupContainer={(trigger:any) => trigger.parentNode}>
            <Space className='dropdown-view' >
              <div>Phase</div>
              {!openDropPhase ? <UpOutlined style={{color:'#251863'}} /> : < DownOutlined style={{color:'#251863'}} />}
            </Space>
          </Dropdown>
          <Button className="btn-clear"><DeleteOutlined /></Button>
        </Col>
        
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <div style={{width:'100%', overflowX:'hidden'}}>
            <Table dataSource={DATA_FINANCIALS} columns={columns} pagination={{ pageSize: 50 }}  scroll={{ y: 350 }} />
            <div style={{display:'flex', paddingTop:'5px', borderTop: '1px solid #d7d3e2',marginTop: '5px'}}>
              <p style={{color:'#11093c', fontWeight:'500', width:'50%'}}>Subtotal Income</p>
              <p style={{color:'#11093c', fontWeight:'500', width:'12.5%'}}>$600,320</p>
              <p style={{color:'#11093c', fontWeight:'500', width:'12.5%'}}>$600,320</p>
              {/* <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder'}}>$400,320</p> */}
            </div>
            <div style={{display:'flex', paddingTop:'5px'}}>
              <p style={{color:'#11093c', fontWeight:'500', width:'50%'}}>Subtotal Expense</p>
              <p style={{color:'#11093c', fontWeight:'500', width:'12.5%'}}>$200,000</p>
              <p style={{color:'#11093c', fontWeight:'500', width:'12.5%'}}>$200,000</p>
              {/* <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder'}}>$400,320</p> */}
            </div>
            <div style={{display:'flex', paddingTop:'5px', borderBottom: '1px solid #d7d3e2',marginBottom: '5px'}} >
              <p style={{color:'#11093c', fontWeight:'bolder', width:'50%'}}>Total</p>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              {/* <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder'}}>$400,320</p> */}
            </div>
          </div>
          
        </Col>
      </Row>
    </>
  )
}

export default Financials;