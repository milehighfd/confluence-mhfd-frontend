import { getToken, putData } from 'Config/datasets';
import { UPDATE_SHORT_NOTE_BY_PROJECT_ID } from 'Config/endpoints/project';
import { Input } from 'antd'
import { ADMIN, STAFF } from 'constants/constants';
import { useDetailedDispatch } from 'hook/detailedHook';
import React, { useEffect, useState } from 'react'

const TextArea = Input.TextArea;

const useRowsCount = (
  value: string
) => {
  const [rows, setRows] = useState<number>(1);
  useEffect(() => {
    setRows(Math.max(2, value?.split('\n').length));
  }, [value]);
  return rows;
};

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

  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
    } catch (error) {
      console.log(error)
    }
  }

  const rows = useRowsCount(inputValue);

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  return (
    <div className='highlight-detail'>
      <>
        <b>{boldText}</b>&nbsp;
      {
        appUser.designation === ADMIN || appUser.designation === STAFF ? <TextArea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          rows={rows}
          value={inputValue}
          placeholder="Project Highlight"
          style={{
            border: (isFocused || isHovered) ? '1px solid black' : 'none'
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onClick={(e) => e.stopPropagation()}
        /> : (
          <span dangerouslySetInnerHTML={{__html: currentValue?.replaceAll('\n','<br/>')}}></span>
        )
      }
      </>
    </div>
  )
}
