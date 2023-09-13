import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Col, Modal, Row } from 'antd';
import { ADMIN, STAFF } from 'constants/constants';
import { getBoardStatus } from 'dataFetching/workRequest';
import { useRequestState } from 'hook/requestHook';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
import { useProfileState } from 'hook/profileHook';

const stateValue = {
  visible: false
};

export const AlertView = ({
  isWorkPlan,
  visibleAlert,
  setVisibleAlert,
  setSave,
  jurisdictions,
  counties,
  serviceareas,
  type,
  isEdit,
  sendToWr,
  setsendToWR,
  locality,
  sponsor
}: {
  isWorkPlan: boolean,
  visibleAlert : boolean,
  setVisibleAlert: Function,
  setSave: Function,
  jurisdictions: any,
  counties: any,
  serviceareas: any,
  type: string,
  isEdit: boolean,
  sendToWr: boolean,
  setsendToWR: Function,
  locality: any,
  sponsor?: any
}) => {
  const [state, setState] = useState(stateValue);
  const [isUnderReview, setIsUnderReview] = useState(false);
  const userInfo = useProfileState();
  const showCheckBox = userInfo?.userInformation?.designation === ADMIN || userInfo?.userInformation?.designation === STAFF;
  const [workPlanString, setWorkPlanString] = useState('');
  const { year } = useRequestState();
  const { openNotification } = useNotifications();
  useEffect(() => {
    if (isWorkPlan) {
      setWorkPlanString(locality.join(','));
    } else {
      const newString = counties ? counties.join(', ') : serviceareas.join(', ');
      setWorkPlanString(newString);
    }
  }, [isWorkPlan, counties, serviceareas, locality]);

  const handleOk = (e: any) => {
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
    setSave(true);
    // isEdit?openNotification('Success! Your project was just updated!', "success"):openNotification('Success! Your project was just created!', "success");
  };

  const handleCancel = (e: any) => {
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
  };

  const labels = {
    title: isEdit ? 'Confirm your project' : 'Confirm your project',
    confirmationText: isEdit ? 'Save changes to Project?' : 'This project will be routed to the following boards:',
    actionText: isEdit ? 'Save Project':'Submit Project'
  };

  useEffect(() => {
    const checkStatus = async () => {
      const boards = await getBoardStatus({
        type: 'WORK_REQUEST',
        year: `${year}`,
        locality: sponsor
      });
      const statuses = boards.status;
      const isUnderReview = statuses === 'Under Review';
      setIsUnderReview(isUnderReview);
    };
    checkStatus();
  }, [sponsor]);

  return (
    <div>
      <div>
        <Modal
          centered
          visible={visibleAlert}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal-confirm"
          width="400px"
        >
          <div className="detailed">
            <Row
              className="detailed-h"
              gutter={[16, 8]}
            >
              <Col
                xs={{ span: 44 }}
                lg={{ span: 20 }}
              >
                <h1
                  style={{marginTop: '15px'}}
                >
                  {labels.title}
                </h1>
              </Col>
              <Col
                xs={{ span: 4 }}
                lg={{ span: 4 }}
                style={{textAlign: 'end'}}
              >
                <Button
                  className="btn-transparent"
                  onClick={() => setVisibleAlert(false)}>
                    <img src="/Icons/icon-62.svg" alt="" height="15px" />
                </Button>
              </Col>
            </Row>
            <Row
              className="detailed-h"
              gutter={[16, 8]}
              style={{backgroundColor: 'white'}}
            >
              <Col
                xs={{ span: 48 }}
                lg={{ span: 24 }}
                style={{color: '#11093c'}}
              >
                <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>
                  {labels.confirmationText}
                </p>
              </Col>
              {
                !isEdit &&
                <Col
                  xs={{ span: 24 }}
                  lg={{ span: 12 }}
                  style={{
                    color: '#11093c',
                    opacity: isWorkPlan ? (isUnderReview ? 1 : 0.5) : 1,
                  }}
                >
                  <p className="title">
                    Work Request
                  </p>
                  <p className={`information ${(isWorkPlan && !sendToWr && showCheckBox && isUnderReview) ? 'disabled' : ''}`}>
                    {/* {jurisdictions.join(', ')} */}
                    {sponsor}
                  </p>
                </Col>
              }
              {
                !isEdit &&
                <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                  <p className="title">
                    Work Plan ({type} Project)
                  </p>
                  <p className={`information ${!showCheckBox ? 'disabled': ''}`}>
                    {isWorkPlan?workPlanString:'--'}
                  </p>
                </Col>
              }
              {
                (isWorkPlan && showCheckBox && !isEdit && isUnderReview) &&
                <Col
                  xs={{ span: 48 }}
                  lg={{ span: 24 }}
                  style={{color: '#11093c'}}
                >
                  <div>
                    <Checkbox
                      style={{paddingRight:'10px', paddingTop:'10px'}}
                      checked={sendToWr}
                      onChange={() => setsendToWR(!sendToWr)}
                    />
                    Send this project to the Work Request board
                  </div>
                </Col>
              }
              <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                style={{color: '#11093c', paddingLeft:'none'}}
              >
                <button
                  className="btn-borde"
                  onClick={handleCancel}
                  style={{width: '95%'}}
                >
                  Cancel
                </button>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                style={{color: '#11093c', textAlign:'end', paddingLeft:'none'}}
              >
                <button
                  className="btn-purple"
                  style={{width: '95%'}}
                  onClick={handleOk}
                >
                    <span>
                      {labels.actionText}
                    </span>
                </button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  );
};
