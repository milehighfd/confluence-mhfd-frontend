import { Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { useProfileState } from 'hook/profileHook';
import { TabPane } from 'rc-tabs';
import CardsList from './CardsList';

const ProfileMobile = ({
  counterProjects,
  counterProblems,
  getCount,
}: {
  counterProjects: number;
  counterProblems: number;
  getCount: Function;
}) => {
  const { userInformation: user } = useProfileState();
  const [tabKey, setTabKey] = useState<any>();
  const tabKeys = [`Projects`, 'Problems', 'Teams', 'Account Settings'];
  let displayedTabKey = tabKeys;
  function isNull(text: string) {
    if (!text) {
      return '-';
    } else {
      return text;
    }
  }
  return (
    <div className="profile-myprofile-mobile">
      <div className="profile-myprofile-mobile-header">
        <img
          src={!user.photo ? '/picture/AvatarUser.svg' : user.photo}
          height={90}
          width="90"
          className='profile-myprofile-mobile-image'
        />
        <div className='profile-myprofile-mobile-header-text'>
          <h1>{isNull(user.firstName) + '  ' + isNull(user.lastName)}</h1>
          <p className="color-sub sub-title">
            {isNull(user.title)}
          </p>
        </div>
      </div>
      <div className="searches-myprofile-mobile">
        <Tabs
          defaultActiveKey={displayedTabKey[0]}
          destroyInactiveTabPane={true}
          activeKey={tabKey}
          onChange={key => setTabKey(key)}
          className="tabs-map"
        >
          <TabPane
            style={{ marginBottom: '0px', overflowY: 'auto', height: 'calc(100vh - 140px)', overflow: 'hidden' }}
            tab={<span>{`Projects ${counterProjects}`} </span>}
            key={`Projects`}
          >
            <div className="user-management-body">
              <div style={{ marginTop: '10px', padding: '0px 12px 0px 12px' }}>
                <Row gutter={16}>
                  <CardsList type="Projects" getCount={getCount} />
                </Row>
              </div>
            </div>
          </TabPane>
          <TabPane
            style={{ marginBottom: '0px', overflowY: 'auto', height: 'calc(100vh - 140px)', overflow: 'hidden' }}
            tab={<span>{`Problems ${counterProblems}`} </span>}
            key={'Problems'}
          >
            <div className="user-management-body">
              <div style={{ marginTop: '10px', padding: '0px 12px 0px 12px' }}>
                <Row gutter={16}>
                  <CardsList type="Problems" getCount={getCount} />
                </Row>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileMobile;
