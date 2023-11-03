import { Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useDetailedState } from 'hook/detailedHook'
import { useProfileState } from 'hook/profileHook'
import { useProjectDispatch } from 'hook/projectHook'
import React, { useState } from 'react'

export default function DiscussionTextBox(props: any) {
  const { message, id, deleteMessage, isAdminOrStaff, origin, project_id, user } = props
  const [isEdit, setIsEdit] = useState(false)
  const [newMessage, setNewMessage] = useState(message)  
  const { userInformation } = useProfileState();
  const enableEdit = userInformation?.user_id === user?.user_id
  const { 
    editDiscussionMessage 
  } = useProjectDispatch();
  const handleEditMessage = () => {
    setIsEdit(false)
    editDiscussionMessage(id, newMessage, project_id, origin)
  }
  const handleDiscardChanges = () => {
    setIsEdit(false)
    setNewMessage(message)
  }
  return (
    <div>
      <div className={isEdit ? 'discution discution-on-edit' : 'discution'}>
        <TextArea
          readOnly={!isEdit}
          value={newMessage}
          autoSize
          onChange={(e) => setNewMessage(e.target.value)}
        ></TextArea>
      </div>
      {isAdminOrStaff && (!isEdit ?
        <div style={{ display: 'flex' }} >
          <p className='delete-edit-comment'
            onClick={() => {
              if (enableEdit) {
                setIsEdit(true)
              }
            }}
          >
            Edit
          </p>
          <p
            className='delete-edit-comment'
            onClick={() => deleteMessage(id)}
          >
            Delete
          </p>
        </div>
        :
        <div className='button-discussion-on-edit'>
          <Button className="btn-purple" onClick={() => handleEditMessage()}>
            <span className="text-color-disable">Save</span>
          </Button>
          <Button className="btn-borde" onClick={() => handleDiscardChanges()}>
            Discard Changes
          </Button>
        </div>
      )}
    </div>
  )
}
