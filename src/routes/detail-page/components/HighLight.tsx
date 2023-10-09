import { getToken, putData } from 'Config/datasets';
import { UPDATE_SHORT_NOTE_BY_PROJECT_ID } from 'Config/endpoints/project';
import { Button, Input } from 'antd'
import { ADMIN, STAFF } from 'constants/constants';
import { useDetailedDispatch } from 'hook/detailedHook';
import React, { useEffect, useState } from 'react'

const TextArea = Input.TextArea;

export const HighLight = ({
  appUser,
  currentValue,
  project_id,
}: {
  appUser: any;
  currentValue: string;
  project_id: any;
}) => {
  const { updateShortProjectNote } = useDetailedDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('');

  const boldText="Project Highlight:" 

  const save = async () => {
    let data;
    try {
      data = await putData(
        UPDATE_SHORT_NOTE_BY_PROJECT_ID(project_id),
        { short_project_note: inputValue },
        getToken()
      )
      updateShortProjectNote(inputValue);
      setIsEditing(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  return (
    <div className='highlight-detail'>
      {
        isEditing ? <TextArea
          rows={4}
          value={inputValue}
          placeholder="Project Highlight"
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onClick={(e) => e.stopPropagation()}
        /> : (
          <>
            <b>{boldText}</b>&nbsp;
            <span dangerouslySetInnerHTML={{__html: currentValue?.replaceAll('\n','<br/>')}}></span>
          </>
        )
      }
      <br/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          !isEditing && (appUser.designation === ADMIN || appUser.designation === STAFF) && 
          <Button style={{borderRadius: '8px', marginTop: 10}} onClick={() => setIsEditing(true)}>
            <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
            Edit Highlight
          </Button>
        }
        {
          isEditing && (appUser.designation === ADMIN || appUser.designation === STAFF) && 
          <Button style={{borderRadius: '8px', marginTop: 10}} onClick={() => {
            save();
          }}>
            Save
          </Button>
        }
      </div>
    </div>
  )
}
