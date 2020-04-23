import React from 'react';
import { Col, Button, Table } from 'antd';
import { User } from '../../../Classes/TypeList';

const columns01 = [
  {
    title: '',
    dataIndex: 'Comp',
    key: 'Comp',
    ellipsis: true,
  },
  {
    title: 'Teams',
    dataIndex: 'Teams',
    key: 'Teams',
    ellipsis: true,
  },
  {
    title: 'Favorited',
    dataIndex: 'Favorited',
    key: 'Favorited',
    ellipsis: true,
  },

  {
    title: 'Jurisdiction',
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    ellipsis: true,
  },
  {
    title: 'Drafts',
    dataIndex: 'Drafts',
    key: 'Drafts',
    ellipsis: true,
  },
];

const data01 = [
  {
    key: '1',
    Comp: 'Capital',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '2',
    Comp: 'Maintenance',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
    className: 'meh',
  },
  {
    key: '3',
    Comp: 'Study',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '4',
    Comp: 'Acquisition',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '5',
    Comp: 'Special',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
];

export default ({user} : {user: User}) => {
  return <> <Col span={13} className="profile-info">
    <div style={{ position: 'relative' }}><img className="profile-img" src="/Icons/icon-28.svg" alt="" />
      <div className="profile-change"><Button type="default" shape="circle" className="btn-edit-00"><img src="/Icons/icon-66.svg" alt="" /></Button></div>
    </div>
    <div className="profile-dat">
      <div className="profile-name">
        <h3>{user.name}</h3>
        <span>District Manager</span>
      </div>
      <div className="profile-contact">
        <Button type="default" shape="circle">
          <img src="/Icons/icon-65.svg" alt="" height="15px" />
        </Button>
        <Button type="default" shape="circle">
          <img src="/Icons/icon-64.svg" alt="" height="15px" />
        </Button>
        <Button type="default" shape="circle">
          <img src="/Icons/icon-67.svg" alt="" height="15px" />
        </Button>
      </div>
    </div>
    <div className="profile-prot">
      <Button>Aurora</Button>
      <Button>Westminster</Button>
    </div>
    <div>

    </div>
  </Col>
    <Col span={11}>
      <div className="profile-table">
        <Table size={"small"} columns={columns01} dataSource={data01} pagination={false} />
      </div>
    </Col>
  </>
}