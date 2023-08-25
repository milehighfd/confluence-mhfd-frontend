import { Col, Input, Modal, Row } from 'antd';
import React from 'react';

const EditAmountModuleModal = ({ visible, setVisible }: { visible: boolean; setVisible: Function }) => {
  return (
    <Modal
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      className="edit-amount-modal"
      okText="Save"
      cancelText="Clear"
    >
      <Row className="edit-amount-modal-header">
        <Col className="edit-amount-modal-header-text">
          <h2>Irondale Gulch @ Highway 2 2019 in between Overpass 41 and 325</h2>
          <p>Capital Project • Arapahoe County • South Service Area</p>
        </Col>
        <Col>
          <p>Status</p>
          <span style={{ backgroundColor: '#E3F3F0', color: '#28C499' }}>Active</span>
        </Col>
        <Col>
          <p>Phase</p>
          <span style={{ backgroundColor: '#E3EDF5', color: '#288CC4' }}>Consultant Procurement</span>
        </Col>
        <Col>
          <p>Estimated Cost</p>
          <h1>$5,262,129</h1>
        </Col>
      </Row>
      <Col className="edit-amount-modal-body">
        <Row className="edit-amount-modal-body-title">
          How much funding is the Local Government providing and requesting from MHFD?
        </Row>
        <div className="edit-amount-modal-body-table">
          <Row className="edit-amount-modal-body-table-title">
            <Col>Years</Col>
            <Col>MHFD Funding</Col>
            <Col>
              Arvada <p>Sponsor</p>
            </Col>
            <Col>
              Westiminister <p>Co-Sponsor</p>
            </Col>
            <Col>
              Broomfield <p>Co-Sponsor</p>
            </Col>
          </Row>
          <Row>
            <Col>Prior Funding</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row className="edit-amount-modal-body-table-sum">
            <Col>Total Sum Requested</Col>
            <Col>$500.000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
          </Row>
          <Row className="edit-amount-modal-body-table-total">
            <Col>Total Combined Funding</Col>
            <Col>$4,320,500</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      </Col>
    </Modal>
  );
};

export default EditAmountModuleModal;
