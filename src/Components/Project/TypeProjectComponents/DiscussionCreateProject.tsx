import { Button } from "antd"
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import moment from "moment";
import React, { useEffect, useState } from "react"

interface DiscussionCreateProjectProps {
  project_id: number;
}

export const DiscussionCreateProject = (
  { 
    project_id 
  }: DiscussionCreateProjectProps
) => {
  const [openChat, setOpenChat] = useState(true);
  const [projectChat, setProjectChat] = useState<any>([]);
  const { setProjectDiscussion, addDiscussionMessage } = useProjectDispatch();
  const { discussion } = useProjectState();
  const [message, setMessage] = useState('');

  function convertTimestampWithMoment(timestamp: string): string {
    return moment.utc(timestamp).format('MMM D, YYYY [at] h:mm A');
  }  

  function handleAddMessage(message: any) {
    addDiscussionMessage(project_id, 'create', message);
  }

  useEffect(() => {
    setProjectDiscussion(project_id, 'create');
  }, [project_id]);

  useEffect(() => {   
    if (discussion && discussion?.project_discussion_threads?.length > 0) {
      setProjectChat(discussion?.project_discussion_threads);
    }
  }, [discussion]);

  return (
    <div className="body-project">
      <div className="discussion-content">
        <div className='discussion-input'>
          <div className="user-item">
            RS
          </div>
          <div className="input-discussion-sec">
            <input placeholder="Write a comment..." onChange={(e) => setMessage(e.target.value)}/>
            <Button className="btn-purple" onClick={(e) => handleAddMessage(message)}>
            <img src='/Icons/ic-send-white.svg' alt='' className='icon-send'/> Send
            </Button>
          </div>
        </div>
        {
          projectChat?.map((item: any, index: number) => {
            return (
              <div className='discution-body'>
                <div className='discution-user'>
                  {
                    item?.user?.photo
                      ? <img className='user-img' src={item.user.photo} alt="User" />
                      : <div className="user-item">(item?.user?.firstName?.charAt(0) || '') + (item?.user?.lastName?.charAt(0) || '')</div>
                  }
                  <div>
                    <div className='user-information'>
                      {`${item?.user?.firstName} ${item?.user?.lastName}`} <span className="user-date">{convertTimestampWithMoment(item?.created_date)}</span>
                    </div>
                    <div className='discution'>
                      <p>{item?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}