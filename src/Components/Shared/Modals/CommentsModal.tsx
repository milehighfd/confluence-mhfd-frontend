import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";

const CommentsModal = () => {
  const [openChat, setOpenChat] = useState(true);  
  return <>
    <div className='body-team-comment'>
      <div className="input-comment-sec">
        <input
          type="text"
          placeholder="Write a comment..."
          className="input-comment"
        />
        <Button className="btn-purple" >
          <img src='/Icons/ic-send-white.svg' alt='' className='icon-send'/> Send
        </Button>
      </div>
      <div className='comment'>
        <div className='header-comment'>
          <div className='user-item-comment'>RS</div>
          <div>
            <p>Ricardo Saavedra</p>
            <p className='comment-date'>Oct 6, 2022 at 1:12 AM</p>
          </div>
        </div >
        <div className='content-comment'>
          <p><span className='tag-name-user'>@katieevers2</span><span className='tag-name-user'>@jonvillines</span></p>
          <p className='text-comment'>Don't see the outline. the source code also needs to be updated.re: aligned to one source. we need to make sure whether this is appropriate. consider that we have the organization in sign-up/profile, mask, and work request boards. On Thursday will provide the the source tables requested</p>
        </div>
      </div>
      <div className='comment'>
        <div className='header-comment'>
          <div className='user-item-comment' style={{background: '#23CBA1'}}>RS</div>
          <div>
            <p>Katie Evers</p>
            <p className='comment-date'>Oct 5, 2022 at 11:51 PM</p>
          </div>
        </div>
        <div className='content-comment'>
          <p><span className='tag-name-user'>@jonvillines</span></p>
          <p className='text-comment'>The zoom to areas table sources the main mapview drop down list which only has for example, "Adams County" and not "Unincorporated Adams County". Do we want both options?
          <span className='tag-user'>@ricardosaavedra2</span>
          what is the source table of the mask layers? and also what is the source layer for work request drop down? Earlier this week when I was trying to add highlands ranch geom you said 'jurisdictions'. I added it but still don't see the outline. All this should be aligned to one source with data restructure</p>
        </div>
      </div>
    </div>
  </>
};

export default CommentsModal;
