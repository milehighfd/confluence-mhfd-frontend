import { Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'

export default function DiscussionTextBox(props:any) {
    const {message, id, deleteMessage, isAdminOrStaff}=props
    const [isEdit, setIsEdit] = useState(false)
  return (
    <div>
        <div className={isEdit? 'discution discution-on-edit': 'discution'}>
            <TextArea readOnly={!isEdit} value={message} autoSize></TextArea>
        </div>
        {isAdminOrStaff && (!isEdit?
        <div style={{display: 'flex'}} >
            <p className='delete-edit-comment'
                onClick={() => setIsEdit(true)}
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
            <Button className="btn-purple" onClick={() => setIsEdit(false)}>
                <span className="text-color-disable">Save</span>
            </Button>
            <Button className="btn-borde" onClick={() => setIsEdit(false)}>
                Discard Changes
            </Button>
        </div>    
        )}
    </div>
  )
}
