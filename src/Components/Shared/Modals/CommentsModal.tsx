import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import moment from 'moment';
import { useProfileState } from 'hook/profileHook';

const CommentsModal = () => {
  const [projectChat, setProjectChat] = useState<any>([]);
  const { detailed } = useDetailedState();
  const { 
    setProjectDiscussion, 
    addDiscussionMessage,
    deleteDiscussionMessage,  
  } = useProjectDispatch();
  const { discussion } = useProjectState();
  const [message, setMessage] = useState('');
  const {userInformation} = useProfileState();
  const sponsorProject = detailed?.project_staffs?.map((item: any) => item?.business_associate_contact_id);
  const businessAssociateId = userInformation?.business_associate_contact?.business_address?.business_associate_id;
  const isAdminOrStaff = userInformation?.designation === 'admin' || userInformation?.designation === 'staff'
  const canAddDiscussion = ((sponsorProject?.includes(businessAssociateId))) || isAdminOrStaff    

  function convertTimestampWithMoment(timestamp: string): string {
    return moment.utc(timestamp).format('MMM D, YYYY [at] h:mm A');
  }

  function handleAddMessage(message: any) {
    addDiscussionMessage(detailed.project_id, 'details', message);
  }

  useEffect(() => {
    setProjectDiscussion(detailed.project_id, 'details');
  }, [detailed]);

  useEffect(() => {
    if (discussion && discussion?.project_discussion_threads?.length > 0){  
      setProjectChat(discussion?.project_discussion_threads);      
    }    
  }, [discussion]);

  function deleteMessage(message_id: number) {
    setProjectChat(projectChat.filter((item: any) => item.project_discussion_thread_id !== message_id));
    deleteDiscussionMessage(detailed.project_id, 'create', message_id);
  }

  return <>
    <div className='body-team-comment'>
      {canAddDiscussion && <div className="input-comment-sec">
        <input
          type="text"
          placeholder="Write a comment..."
          className="input-comment"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="btn-purple" onClick={(e) => handleAddMessage(message)} >
          <img src='/Icons/ic-send-white.svg' alt='' className='icon-send' /> Send
        </Button>
      </div>}
      {
        projectChat?.map((item: any, index: number) => {
          return (
            <div className='comment' key={index}>
              <div className='header-comment'>
                {
                  item?.user?.photo                    
                    ? <img className='user-item-comment-img' src={item.user.photo} alt=''/>
                    : <div className='user-item-comment'>{(item?.user?.firstName?.charAt(0) || '') + (item?.user?.lastName?.charAt(0) || '')}</div>
                }
                <div style={{width: '100%'}}>
                  <p>{`${item?.user?.firstName} ${item?.user?.lastName}`}</p>
                  <p className='comment-date'>{convertTimestampWithMoment(item?.created_date)}</p>
                </div>
              </div >
              <div className='content-comment'>
                <p className='text-comment'>{item?.message}</p>
              </div>
              {isAdminOrStaff && 
                <div style={{display: 'flex'}} >
                  <p
                    className='delete-edit-comment'
                  >
                    Edit
                  </p>
                  <p
                    className='delete-edit-comment'
                    onClick={(e) => deleteMessage(item?.project_discussion_thread_id)}
                  >
                    Delete
                  </p>
              </div>
                }
            </div>)
        })
      }
    </div>
  </>
};

export default CommentsModal;
