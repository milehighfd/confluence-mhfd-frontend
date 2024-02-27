import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';

const TeamModal = () => {
  const [openChat, setOpenChat] = useState(true);
  const [data, setData] = useState<any>([]);
  const { detailed } = useDetailedState();
  useEffect(() => {
    if (detailed.problemid) {
      datasets.postData(SERVER.TEAMS_BY_ENTITYID, {id:detailed.problemid}, datasets.getToken()).then(data => {       
        const flattenedStaff = data.flatMap((item:any) => item.project_staffs);
        setData(getTeam(flattenedStaff));
      })
    } else {
      setData(getTeam(detailed?.project_staffs || []));
    }
  }, [detailed]);
  function isUnicorporated(organization: string) {
    const [first, ...second] = organization.split(" ")
    if(first==='Unincorporated'){
          const county = second.join(" ")
      return (
        <span>
          {first} <br/>
          {county}
        </span>
      )
    }
    return organization
  }

  return <>
    <div className='body-team-comment'>
      {data.map((item: any) => (
        <div className='team-item' key={item.key}>
          <img src="/Icons/AvatarUser.svg" alt="" />
          <div className='text-team-item'>
            <h6 style={{ fontWeight: 500 }}>
              {item.fullName}
            </h6>
            <p>{item.organization}</p>
          </div>
          <div className='organization'>
            {
              item?.roleType ? (
                <p className={`${item.organization.split(' ')[0] === 'Unincorporated' && item?.user?.user_id ? 'user-status active no-wrap' : 'user-status active'}`} style={!item?.user?.user_id ? {paddingTop: '14px'} : {}}>
                  {item.roleType}
                </p>
              ) : null
            }
            {
              !item?.user?.user_id ? (
                <span className={`user-status inactive`}>
                  No User
                </span>
              ) : null
            }
          </div>
        </div>
      ))}
    </div>
  </>
};

export default TeamModal;
