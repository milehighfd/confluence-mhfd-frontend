import { MenuProps, Select } from 'antd';
import { Button, Col, Dropdown, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const AddTeamModal = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
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
            <h1 style={{marginTop: '15px'}}>Team
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} className='body-modal-team'>
            <Input placeholder='Email address or name' style={{marginBottom:'15px'}}></Input>
            <div className='body-modal-data'>
              <Row style={{marginBottom:'8px'}}>
                <Col span={3}>
                  <img src="/picture/user.png" alt="" height="35px" style={{borderRadius: '50%'}}/>
                </Col>
                <Col span={15}>
                  <h6>Jon Villines</h6>
                  <p>jon.vilines@mhfd.com &nbsp;&#8226;&nbsp; Workspace admin</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right', paddingRight:'4px' }}>
                  <Select
                    defaultValue="MHFD"
                    style={{ width: '100%' }}
                    className="select-menu-team"
                    options={[
                      {
                        value: 'MHFD',
                        label: 'MHFD',
                      },
                      {
                        value: 'Local ',
                        label: 'Local ',
                      },
                      {
                        value: 'Government',
                        label: 'Government',
                      },
                      {
                        value: 'Consultant',
                        label: 'Consultant',
                      },
                      {
                        value: 'Delete',
                        label: 'Delete',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom:'8px'}}>
                <Col span={3}>
                  <img src="/picture/user01.png" alt="" height="35px" style={{borderRadius: '50%'}}/>
                </Col>
                <Col span={15}>
                  <h6>Jane Nelson</h6>
                  <p>jane.nelson@mhfd.com &nbsp;&#8226;&nbsp; Workspace guest</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right', paddingRight:'4px' }}>
                  <Select
                    defaultValue="MHFD"
                    style={{ width: '100%' }}
                    className="select-menu-team"
                    options={[
                      {
                        value: 'MHFD',
                        label: 'MHFD',
                      },
                      {
                        value: 'Local ',
                        label: 'Local ',
                      },
                      {
                        value: 'Government',
                        label: 'Government',
                      },
                      {
                        value: 'Consultant',
                        label: 'Consultant',
                      },
                      {
                        value: 'Delete',
                        label: 'Delete',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom:'8px'}}>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
                </Col>
                <Col span={15}>
                  <h6>MHFD SM</h6>
                  <p>mhfd.sm@mhfd.com &nbsp;&#8226;&nbsp; Workspace guest</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right', paddingRight:'4px' }}>
                  <Select
                    defaultValue="MHFD"
                    style={{ width: '100%' }}
                    className="select-menu-team"
                    options={[
                      {
                        value: 'MHFD',
                        label: 'MHFD',
                      },
                      {
                        value: 'Local ',
                        label: 'Local ',
                      },
                      {
                        value: 'Government',
                        label: 'Government',
                      },
                      {
                        value: 'Consultant',
                        label: 'Consultant',
                      },
                      {
                        value: 'Delete',
                        label: 'Delete',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom:'8px'}}>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
                </Col>
                <Col span={15}>
                  <h6>MHFD SM</h6>
                  <p>mhfd.sm@mhfd.com &nbsp;&#8226;&nbsp; Workspace guest</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right', paddingRight:'4px' }}>
                  <Select
                    defaultValue="MHFD"
                    style={{ width: '100%' }}
                    className="select-menu-team"
                    options={[
                      {
                        value: 'MHFD',
                        label: 'MHFD',
                      },
                      {
                        value: 'Local ',
                        label: 'Local ',
                      },
                      {
                        value: 'Government',
                        label: 'Government',
                      },
                      {
                        value: 'Consultant',
                        label: 'Consultant',
                      },
                      {
                        value: 'Delete',
                        label: 'Delete',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom:'8px'}}>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
                </Col>
                <Col span={15}>
                  <h6>MHFD SM</h6>
                  <p>mhfd.sm@mhfd.com &nbsp;&#8226;&nbsp; Workspace guest</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right', paddingRight:'4px' }}>
                  <Select
                    defaultValue="MHFD"
                    style={{ width: '100%' }}
                    className="select-menu-team"
                    options={[
                      {
                        value: 'MHFD',
                        label: 'MHFD',
                      },
                      {
                        value: 'Local ',
                        label: 'Local ',
                      },
                      {
                        value: 'Government',
                        label: 'Government',
                      },
                      {
                        value: 'Consultant',
                        label: 'Consultant',
                      },
                      {
                        value: 'Delete',
                        label: 'Delete',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
            
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default AddTeamModal;
