import React from "react";
import { Button, Modal } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

const ModalTutorial = (
  {
    visibleTutorial,
    setVisibleTutorial,
    locationPage,
    sliderIndex,
    tabActive,
    setSliderIndex,
  }:{
    visibleTutorial: boolean,
    setVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>,
    locationPage: any,
    sliderIndex: number,
    tabActive: any,
    setSliderIndex: React.Dispatch<React.SetStateAction<number>>,
  }
) => {
  return (
    <Modal
      visible={visibleTutorial}
      onOk={() => {setVisibleTutorial(false)}}
      onCancel={() => {setVisibleTutorial(false)}}
      width="100vw"
      className="tutorial-carousel tutorial"
      maskStyle={{
        backgroundColor: "#0000008f"
      }}
    >
      {
        locationPage.pathname === '/map' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-17">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View more than 20 curated layers for additional project context.</i></p>
              </div>
              <div className="tuto-18">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Explore Confluence and learn more about your streams and watersheds. Please use this button to make suggestions, ask questions and provide overall feedback.</i></p>
              </div>
              <div className="tuto-19">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>This is the hybrid map view. Click on the chevron arrows to expand into full map view.</i></p>
              </div>
              <div className="tuto-20">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Access project and problem profiles, detailing associated actions, financial information, team members, and other attributes.</i></p>
              </div>
            </div>}

            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-21">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View different modules within Confluence by clicking the icons in the sidebar.</i></p>
              </div>
              <div className="tuto-22">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create and organize your own map notes.</i></p>
              </div>
              <div className="tuto-23">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Return to your previous map location.</i></p>
              </div>
              <div className="tuto-24">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Confluence uses the latest satellite imagery from Nearmap. Zoom closer to get a peek.</i></p>
              </div>
              <div className="tuto-25">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Measure distances and calculate areas.</i></p>
              </div>
              <div className="tuto-26">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Favorite a project or problem and see it in your MyConfluence profile at any time.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/profile-view' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-27">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View your favorited projects and problems.</i></p>
              </div>
              <div className="tuto-28">
                <p><i>Edit your profile and apply your default map area.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/work-request' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-29">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View all projects in your current board view (to the right)</i></p>
              </div>
              <div className="tuto-47">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create as many 'draft' projects as you want for your Local Government to possibly submit to MHFD for funding.</i></p>
              </div>
              <div className="tuto-31">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Change between Work Plan years, Submit a "Board", View Analytics, Apply a Filter, Share a URL, or Export to CSV</i></p>
              </div>
              <div className="tuto-32">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Move project cards between columns and add requested yearly amounts to develop a plan</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-33">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Change the project type for the current Work Request view.</i></p>
              </div>
              <div className="tuto-34">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Click on the three dots to Zoom to the Project, Edit the Project, and Edit Yearly Amounts.</i></p>
              </div>
              <div className="tuto-35">
                <p><i>Expand the Total Cost for the Work Request board. View a breakdown by County, and Add Target Costs.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/work-plan' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-29">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View all projects in your current board view (to the right).</i></p>
              </div>
              <div className="tuto-30">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create a project on behalf of a Local Government or to go directly onto the Work Plan.</i></p>
              </div>
              <div className="tuto-31">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Change between Work Request years, Submit a Request, View Analytics, Share a URL, or Export to CSV.</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-33">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Change the project type for the Work Plan and year selected above.</i></p>
              </div>
              <div className="tuto-34">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Click on the three dots to Zoom to the Project, Edit the Project, and Edit Yearly Amounts.</i></p>
              </div>
              <div className="tuto-35">
                <p><i>Expand the Total Cost for the Work Plan board. View a breakdown by Local Government, and Add Target Costs.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/pm-tools' && tabActive === 'List' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-48">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Apply a quick filter by county, local government, service area, manager, consultant and other dimensions.</i></p>
              </div>
              <div className="tuto-37">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Toggle across various views to see your projects in a table, progress view, or calendar display.</i></p>
              </div>
              <div className="tuto-38">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View only projects where you are a team member.</i></p>
              </div>
              <div className="tuto-39">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Group your selection by various dimensions including by project phase, manager, and contractor.</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-40">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>View notifications for projects whose current phase end date is less than 14 days away.</i></p>
              </div>
              <div className="tuto-41">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Click on a project title to open it's Detail Page.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/pm-tools' && tabActive === 'Phase' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-40">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>View project notifications where a it's current phase end date is less than 14 days away.</i></p>
              </div>
              <div className="tuto-45">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Click on a circle to open that project's phase sidebar. Leave notes, View dates, and Complete the Action checklist.</i></p>
              </div>
              <div className="tuto-42">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Projects consist of distinct phases, grouped into a smaller number of project statuses (i.e. Active) that are the same for all project types.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
          locationPage.pathname === '/pm-tools' && tabActive === 'Schedule' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-43">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>If data is available, a timeline of distinct phases for the project willl appear. Otherwise, if no data is available, users can initiate a project's timeline by clicking on 'Add Dates' and then assigning a current phase and start date.</i></p>
              </div>
              <div className="tuto-44">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Left click and drag to scroll left or right or select a daily or monthly view above.</i></p>
              </div>
            </div>}
          </>
        )
      }
      <div className="footer-next">
        <h4>How to Use the&nbsp;
          {locationPage.pathname === '/map' && 'Map'}
          {locationPage.pathname === '/profile-view' && 'MyConfluence Page'}
          {locationPage.pathname === '/work-plan' && 'Work Plan'}
          {locationPage.pathname === '/work-request' &&  'Work Request Board'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'List' && 'PM Tools List View'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'Phase' && 'PM Tools Phase View'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'Schedule' && 'PM Tools Schedule View'}

        </h4>
        <Button onClick={() => {
          setSliderIndex(sliderIndex => sliderIndex + 1);
          if (sliderIndex === 1 || tabActive === 'Schedule' || tabActive === 'Phase') {
            setVisibleTutorial(false);
          }else{
            if(locationPage.pathname === '/profile-view'){
              setVisibleTutorial(false);
            }
          }
        }} className="btn-green">{sliderIndex === 1 || tabActive === 'Schedule' || tabActive === 'Phase' ? 'Close': (locationPage.pathname === '/profile-view' ? 'Close':<>Next <DoubleRightOutlined /> </>)}</Button>
      </div>
    </Modal>
  );
};

export default ModalTutorial;