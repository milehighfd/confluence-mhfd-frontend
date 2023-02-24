import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";

const TeamModal = () => {
  const [openChat, setOpenChat] = useState(true);
  const [data, setData] = useState<any>([]);
  const { detailed } = useDetailedState();
  useEffect(() => {
    setData(getTeam(detailed?.project_staffs || []));    
  }, [detailed]);
  return <>
    {data.map((item: any)=>(
      <Row key={item.key}>
        <Col span={4}>
          <img src="/picture/user-default.svg" alt="" height="35px" />
        </Col>
        <Col span={13}>
          <h6 style={{ fontWeight:500 }}>{item.fullName}</h6>
          <p>{item.roleType}</p>
        </Col>
        <Col span={6} style={{ textAlign: 'left' }}>
          <span>{item.organization}</span>
        </Col>
      </Row>
    ))}
  </>
};

export default TeamModal;
