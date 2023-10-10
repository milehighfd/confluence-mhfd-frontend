import { getToken, putData } from 'Config/datasets';
import { UPDATE_SHORT_NOTE_BY_PROJECT_ID } from 'Config/endpoints/project';
import { Input } from 'antd'
import { ADMIN, STAFF } from 'constants/constants';
import { useDetailedDispatch } from 'hook/detailedHook';
import React, { useEffect, useRef, useState } from 'react'

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
  const MAX_LENGTH_TEXTAREA = 200;
  const textAreaPlaceholder = `There is ${MAX_LENGTH_TEXTAREA} characters limit`;
  const { updateShortProjectNote } = useDetailedDispatch();

  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const projectIdRef = useRef(project_id);
  const boldText="Project Highlight:" 

  useEffect(() => {
    projectIdRef.current = project_id;
  }, [project_id]);

  const save = async (value: string) => {
    let data;
    try {
      data = await putData(
        UPDATE_SHORT_NOTE_BY_PROJECT_ID(projectIdRef.current),
        { short_project_note: value },
        getToken()
      )
      updateShortProjectNote(value);
    } catch (error) {
      console.log(error)
    }
  };

  const saveRef = useRef<typeof save>(save);

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;  
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleInputChangeRef = React.useRef<(value: string) => void>(save);
  type HandleInputChangeArgs = [string];

  const debouncedHandleInputChange = React.useMemo(
    () => debounce((...args: HandleInputChangeArgs) => handleInputChangeRef.current(...args), 500),
    []
  );

  const rows = useRowsCount(inputValue);

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  return (
    <div className='highlight-detail'>
      <>
        <b>{boldText}</b>&nbsp;
      {
        appUser.designation === ADMIN || appUser.designation === STAFF ? <><TextArea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          maxLength={MAX_LENGTH_TEXTAREA}
          rows={rows}
          value={inputValue }
          placeholder={textAreaPlaceholder}
          //showCount={true}
          style={{
            borderBottom: (isFocused) ? '1px solid black' : 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            resize: 'none',
          }}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            debouncedHandleInputChange(value);
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
        />{isFocused && (
          <div style={{ textAlign: 'right', marginTop: '5px' }}>
            {inputValue.length}/{MAX_LENGTH_TEXTAREA}
          </div>
        )}</> : (
          <span dangerouslySetInnerHTML={{__html: currentValue?.replaceAll('\n','<br/>')}}></span>
        )
      }
      </>
    </div>
  )
}