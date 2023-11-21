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
  
  return <>
    <div className='body-team-comment'>
      {data.map((item: any) => (
        <div className='team-item' key={item.key}>
          <img src="/Icons/AvatarUser.svg" alt="" />
          <div className='text-team-item'>
            <h6 style={{ fontWeight: 500 }}>
              {item.fullName}
            </h6>
            <p>{item.roleType}</p>
          </div>
          <div className='organization'>
            {item?.organization ? 
              (item?.user?.user_id ? (
                  <p className={`user-status active`}>
                    {item.organization}
                  </p>
                ):(
                  <>
                    <p className={`user-status active`} style={{paddingTop: '14px'}}>
                      {item.organization}
                    </p>
                      <span className={`user-status-inactive-min`}>
                        No User
                      </span>
                  </>
                ))
              :(item?.user?.user_id ? (
                <></>
              ):(
                <>
                  <span className={`user-status inactive`}>
                    No User
                  </span>
                </>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  </>
};

export default TeamModal;
