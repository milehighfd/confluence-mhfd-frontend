import { Button } from "antd"
import { useProfileState } from "hook/profileHook";
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import moment from "moment";
import React, { useEffect, useState } from "react"

interface DiscussionCreateProjectProps {
  project_id: number;
  sponsor: string;
}

export const DiscussionCreateProject = (
  { 
    project_id ,
    sponsor
  }: DiscussionCreateProjectProps
) => {
  const [openChat, setOpenChat] = useState(true);
  const [projectChat, setProjectChat] = useState<any>([]);
  const { setProjectDiscussion, addDiscussionMessage, deleteDiscussionMessage } = useProjectDispatch();
  const { discussion } = useProjectState();
  const [message, setMessage] = useState('');
  const {userInformation} = useProfileState();
  const appUser = useProfileState();
  const isLocalGovernment = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');
  const localGovernment = userInformation?.business_associate_contact?.business_address?.business_associate.business_name
  const isAdminOrStaff = userInformation?.designation === 'admin' || userInformation?.designation === 'staff'
  const canAddDiscussion = (isLocalGovernment && (sponsor === localGovernment)) || isAdminOrStaff

  function convertTimestampWithMoment(timestamp: string): string {
    return moment.utc(timestamp).format('MMM D, YYYY [at] h:mm A');
  }  

  function handleAddMessage(message: any) {
    if (message === '') return;
    addDiscussionMessage(project_id, 'create', message);
    setMessage('');
  }

  function deleteMessage(message_id: number) {
    setProjectChat(projectChat.filter((item: any) => item.project_discussion_thread_id !== message_id));
    deleteDiscussionMessage(project_id, 'create', message_id);
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
        {
          canAddDiscussion &&
          <div className='discussion-input'>
            {
              userInformation?.photo
                ? <img className='user-img' src={userInformation?.photo} alt="User" />
                : <div className="user-item">{(userInformation?.firstName?.charAt(0) || '') + (userInformation?.lastName?.charAt(0) || '')}</div>
            }
            <div className="input-discussion-sec">
              <input value={message} placeholder="Write a comment..." onChange={(e) => setMessage(e.target.value)} />
              <Button className="btn-purple" onClick={(e) => handleAddMessage(message)}>
                <img src='/Icons/ic-send-white.svg' alt='' className='icon-send' /> Send
              </Button>
            </div>
          </div>
        }
        {
          projectChat?.map((item: any, index: number) => {
            return (
              <div className='discution-body' key={item?.project_discussion_thread_id}>
                <div className='discution-user'>
                  {
                    item?.user?.photo
                      ? <img className='user-img' src={item.user.photo} alt="User" />
                      : <div className="user-item">{(item?.user?.firstName?.charAt(0) || '') + (item?.user?.lastName?.charAt(0) || '')}</div>
                  }
                  <div style={{width: '100%'}}>
                    <div className='user-information'>
                      {`${item?.user?.firstName} ${item?.user?.lastName}`} <span className="user-date">{convertTimestampWithMoment(item?.created_date)}</span>
                    </div>
                    <div className='discution'>
                      <p>{item?.message}</p>
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