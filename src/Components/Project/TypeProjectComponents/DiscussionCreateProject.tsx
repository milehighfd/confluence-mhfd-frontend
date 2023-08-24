import { Button } from "antd"
import React from "react"

export const DiscussionCreateProject = () => {
  return (
    <div className="body-project">
      <div className="discussion-content">
        <div className='discussion-input'>
          <div className="user-item">
            RS
          </div>
          <input placeholder="Write a comment..."/>
        </div>
        <div className='discution-body'>
          <div className='discution-user'>
            <div className="user-item">
              RS
            </div>
            <div>
              <div className='user-information'>
                Ricardo Saavedra <span className="user-date"> Oct 6, 2022 at 1:12 AM</span>
              </div>
              <div className='discution'>
                <span className="tag-name-user">@katieevers2</span>
                <span className="tag-name-user">@jonvillines</span>
                <p>Don't see the outline. the source code also needs to be updated.re: aligned to one source. we need to make sure whether this is appropriate. consider that we have the organization in sign-up/profile, mask, and work request boards. On Thursday will provide the the source tables requested</p>
              </div>
            </div>
          </div>
        </div>
        <div className='discution-body'>
          <div className='discution-user'>
            <div className="user-item" style={{background:'#23CBA1'}}>
             KE
            </div>
            <div>
              <div className='user-information'>
               Katie Evers <span className="user-date"> Oct 5, 2022 at 11:51 PM</span>
              </div>
              <div className='discution'>
                <span className="tag-name-user">@jonvillines</span>
                <p>The zoom to areas table sources the main mapview drop down list which only has for example, "Adams County" and not "Unincorporated Adams County". Do we want both options?
                <span className="tag-ref-user">@ricardosaavedra2</span>
                what is the source table of the mask layers? and also what is the source layer for work request drop down? Earlier this week when I was trying to add highlands ranch geom you said 'jurisdictions'. I added it but still don't see the outline. All this should be aligned to one source with data restructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}