import { DollarOutlined, InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { DatePicker, MenuProps, Select, Button, Col, Dropdown, Input, Row } from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const AddAmountModal = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-Team"
      style={{ top: 60, width: '455px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '15px'}}>New Amount
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <div className='detailed-body'>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px', paddingTop:'25px  '}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Agreement <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Input placeholder='Type here'></Input>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Amendment  <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Input placeholder='Type here'></Input>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Partner <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Select
                defaultValue="Jon Villines"
                style={{ width: '100%' }}
                className="select-menu-team"
                options={[
                  {
                    value: 'Jon Villines',
                    label: 'Jon Villines',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Phase <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Select
                defaultValue="Construction Contracting"
                style={{ width: '100%' }}
                className="select-menu-team"
                options={[
                  {
                    value: 'Construction Contracting',
                    label: 'Construction Contracting',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Projected  <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Input placeholder='Insert Value'></Input>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Type of Amount <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Select
                defaultValue="Encumbered"
                style={{ width: '100%' }}
                className="select-menu-team"
                options={[
                  {
                    value: 'Encumbered',
                    label: 'Encumbered',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Encumbered <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Input className='yellow-input' placeholder='100,000.00' prefix={<>&#36;</>} suffix={<LockOutlined />}></Input>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Tyler Balance <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <Input placeholder='Insert Value'></Input>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Contract Date <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <DatePicker style={{ width: '100%' }} defaultValue={moment('2022-04-21', 'YYYY-MM-DD')} onChange={()=>{}}/>
              {/* <Input placeholder='April 21, 2022'></Input> */}
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px', paddingBottom:'20px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <p>Scope of Work <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
              <TextArea
                showCount
                maxLength={100}

                style={{ height: '100%' }}
                placeholder="Add Comments"
              />
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', minHeight:'10px', padding:'8px 20px', paddingBottom:'35px'}}>
            <Col xs={{ span: 48 }} lg={{ span: 12 }}>
            </Col>
            <Col xs={{ span: 48 }} lg={{ span: 12 }} >
              <Button style={{width:'45%', borderRadius: '5px', border: '1px solid #11093c'}}>Cancel</Button><Button className='btn-purple' style={{width:'45%', marginLeft:'10%'}} >SAVE</Button>
            </Col>
          </Row>
        </div>
        
      </div>
    </Modal>
  )
};

export default AddAmountModal;