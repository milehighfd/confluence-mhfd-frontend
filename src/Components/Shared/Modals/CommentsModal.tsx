import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import moment from 'moment';

const CommentsModal = () => {
  const [projectChat, setProjectChat] = useState<any>([]);
  const { detailed } = useDetailedState();
  const { setProjectDiscussion, addDiscussionMessage } = useProjectDispatch();
  const { discussion } = useProjectState();
  const [message, setMessage] = useState('');

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
    console.log(discussion?.project_discussion_threads, 'discussion')
    if (discussion && discussion?.project_discussion_threads?.length > 0){  
      setProjectChat(discussion?.project_discussion_threads);      
    }    
  }, [discussion]);

  return <>
    <div className='body-team-comment'>
      <div className="input-comment-sec">
        <input
          type="text"
          placeholder="Write a comment..."
          className="input-comment"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="btn-purple" onClick={(e) => handleAddMessage(message)} >
          <img src='/Icons/ic-send-white.svg' alt='' className='icon-send' /> Send
        </Button>
      </div>
      {
        projectChat?.map((item: any, index: number) => {
          return (
            <div className='comment' key={index}>
              <div className='header-comment'>
                <div className='user-item-comment'>
                  {
                    item?.user?.photo                    
                      ? <img className='user-item-comment-img' src={item.user.photo} alt=''/>
                      : (item?.user?.firstName?.charAt(0) || '') + (item?.user?.lastName?.charAt(0) || '')
                  }
                </div>
                <div>
                  <p>{`${item?.user?.firstName} ${item?.user?.lastName}`}</p>
                  <p className='comment-date'>{convertTimestampWithMoment(item?.created_date)}</p>
                </div>
              </div >
              <div className='content-comment'>
                <p className='text-comment'>{item?.message}</p>
              </div>
            </div>)
        })
      }
    </div>
  </>
};

export default CommentsModal;
