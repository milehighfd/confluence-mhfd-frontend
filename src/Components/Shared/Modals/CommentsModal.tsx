import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import moment from 'moment';
import { useProfileState } from 'hook/profileHook';
import TextArea from 'antd/lib/input/TextArea';
import DiscussionTextBox from 'Components/Project/TypeProjectComponents/DiscussionTextBox';

const CommentsModal = () => {
  const [projectChat, setProjectChat] = useState<any>([]);
  const { detailed } = useDetailedState();
  const [inputFocus, setInputFocus] = useState<boolean>(false);

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
    if (!message) return;    
    addDiscussionMessage(detailed.project_id, 'details', message);
    setMessage('');
  }

  useEffect(() => {
    if (detailed?.project_id){
      setProjectDiscussion(detailed.project_id, 'details');
    }    
  }, [detailed]);

  useEffect(() => {
    if (discussion && discussion?.project_discussion_threads?.length > 0){  
      setProjectChat(discussion?.project_discussion_threads);      
    }    
  }, [discussion]);

  function deleteMessage(message_id: number) {
    setProjectChat(projectChat.filter((item: any) => item.project_discussion_thread_id !== message_id));
    deleteDiscussionMessage(detailed.project_id, 'details', message_id);
  }
  return <>
    <div className='body-team-comment'>
      {canAddDiscussion && <div className="input-comment-sec">
        <TextArea
          placeholder="Write a comment..."
          className={inputFocus ? "input-comment input-comment-focus":"input-comment"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoSize
          onMouseEnter={()=> setInputFocus(true)}
        />
        <Button
          className="btn-purple"
          onClick={(e) => {
            handleAddMessage(message);
            setTimeout(() => {
            setInputFocus(false);
            }, 1000);
          }}
        >
          <img src='/Icons/ic-send-white.svg' alt='' className='icon-send' /> Send
        </Button>
      </div>}
      {
        projectChat?.map((item: any, index: number) => {
          return (
            <div className='comment' key={index} onMouseEnter={()=>setInputFocus(false)}>
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
              <DiscussionTextBox
                id={item?.project_discussion_thread_id}
                message={item?.message}
                deleteMessage={deleteMessage}
                isAdminOrStaff={isAdminOrStaff}
                user={item?.user}
                origin='details'
                project_id={detailed.project_id}
              />
            </div>)
        })
      }
    </div>
  </>
};

export default CommentsModal;
