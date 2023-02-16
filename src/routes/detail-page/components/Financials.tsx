import React, { useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import AddAmountModal from "Components/Shared/Modals/AddAmountModal";

const Financials = () => {
  const [openModalAmount, setOpenModalAmount] = useState(false);
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
  return (
    <>
      <AddAmountModal visible={openModalAmount} setVisible={setOpenModalAmount}/>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="project-financials">PROJECT FINANCIALS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'73%'}}></div>
        </Col>
      </Row>
      {/* <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{textAlign:'end'}}>
          <Button className="btn-purple" style={{height:'40px'}} onClick={()=>{setOpenModalAmount(true)}}><PlusOutlined /> Amount</Button>
        </Col>
      </Row> */}
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <div style={{width:'100%', overflowX:'hidden'}}>
            <Table dataSource={DATA_FINANCIALS} columns={columns} pagination={{ pageSize: 50 }}  scroll={{ y: 350 }} />
            <div style={{display:'flex', paddingTop:'5px'}}>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'50%'}}>Total</p>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder', width:'12.5%'}}>$400,320</p>
              <p style={{color:'#11093c', fontWeight:'bolder'}}>$400,320</p>
            </div>
          </div>
          
        </Col>
      </Row>
    </>
  )
}

export default Financials;