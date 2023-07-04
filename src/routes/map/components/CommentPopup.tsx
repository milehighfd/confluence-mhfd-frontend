import React from 'react';
import { Button, Dropdown } from 'antd';
import { divListOfColors, divDelete } from 'Components/Map/commetsFunctions';
import { MoreOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

export const CommentPopupDiv = ({note, handleClick, handleDelete, handleComments}: any) => (
  <div className="popup-comment">
    <div className="headmap">
      <Button
        // id="color-list"
        className="testheader"
      >
        <span id="color-text">{note ? note.note_text : 'Map Note'}</span>
        <div className="dr">
          <div className="legend-selected">
            <Dropdown
              overlay={() => {
                return divListOfColors(handleClick);
              }}
              trigger={['click']}
            >
              <i
                id="colorable"
                className="mdi mdi-circle-medium"
                style={{ color: note?.color ? note.color.color : '#ffe121', width: '40px' }}
              ></i>
            </Dropdown>
            <Dropdown
              overlay={() => {
                return divDelete(handleDelete);
              }}
              trigger={['click']}
            >
              <MoreOutlined className="test" />
            </Dropdown>
          </div>
        </div>
      </Button>
    </div>
    <div className="bodymap containerComment">
      <TextArea
        style={{ resize: 'none' }}
        id="textarea"
        rows={2}
        placeholder={'These are my notes…'}
        defaultValue={note ? note.note_text : ''}
        onChange={e => handleComments(e, note)}
      />
    </div>
  </div>
);
