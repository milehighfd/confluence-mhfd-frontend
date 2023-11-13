import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import TeamModal from './TeamModal';
import CommentsModal from './CommentsModal';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';

const TeamCollaborator = () => {
  const [selected, setSelected] = useState(true);
  const {userInformation, openDiscussion} = useProfileState();
  const { openDiscussionTab } = useProfileDispatch();
  const isOther = userInformation?.designation === 'other'
  useEffect(() => {
    if (openDiscussion) {
      setSelected(false)
      openDiscussionTab(false)
    }
  }, [openDiscussion])
  return (
    <div className="chat-r">
      <Row style={{paddingBottom: '15px'}}>
        <Col span={7}>
          <div
            className="chart-title"
            onClick={() => {setSelected(true)}}
            role="button"
            tabIndex={0}
          >
            <h5 className={selected ? 'active-title': ''}>Partners</h5>
          </div>
        </Col>
        <Col span={16}>
          <div
            className="chart-title"
            onClick={() => {setSelected(false)}}
            role="button"
            tabIndex={1}
          >
            {!isOther && <h5 className={!selected ? 'active-title': ''}>DISCUSSION</h5>}
          </div>
        </Col>
        <Col span={3} style={{textAlign:'end'}}>
          {/*<PlusOutlined />*/}
        </Col>
      </Row>
      {selected && <TeamModal />}
      {!selected && <CommentsModal />}
    </div>
  )
};

export default TeamCollaborator;
