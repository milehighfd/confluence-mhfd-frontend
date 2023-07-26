import { Button, Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

const IntroducionModal = ({
  visibleIntroduction,
  setVisibleIntroduction,
}: {
  visibleIntroduction: boolean;
  setVisibleIntroduction:React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { TabPane } = Tabs;
  const [key, setKey] = useState('1');
  
  const handleOk = () => {
    setVisibleIntroduction(false);
  };
  const handleCancel = () => {
    setVisibleIntroduction(false);
  };
  return (
    <Modal
      centered
      visible={visibleIntroduction}
      onOk={handleOk}
      onCancel={handleCancel}
      className="tutorial tutorial-000"
      width="750px"
    >
      <Tabs
        activeKey={key}
        tabPosition="left"
        onChange={e => {
          setKey('' + e);
        }}
      >
        <div className="logo-00">
          <img src="/Icons/Confluence-Color-Tagline.svg" alt="" />
        </div>
        <TabPane tab="Welcome!" key="1">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              Welcome to Confluence! Confluence is your one-stop Mile High Flood District data portal. MHFD has
              developed Confluence from the ground up to meet the unique data needs of a regional flood control and
              stream management district. The system is in an early state of development and will evolve over the coming
              years to include more data and features.
            </p>
          </div>
        </TabPane>
        <TabPane tab="Confluence Overview" key="2">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              Confluence introduces a new way to interact with MHFD data. The focus of the system is on “Problems,”
              which are issues that have been identified through Master Plans or other means, and “Projects,” which can
              be any type of work intended to solve the Problems. Problems are a new data set for MHFD, and they will be
              developed over time as new Master Plans and Stream Assessments are conducted. The purpose of putting
              Problems at the forefront of Confluence is to focus on the “why” behind our projects and remind users that
              there can be many ways to solve a Problem.
            </p>
          </div>
        </TabPane>
        <TabPane tab="Navigating Confluence" key="3">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              Navigating Confluence is simple. The top-right corner shows the user who is currently logged-in and allows
              you to log out or access the Confluence help system (this document). The bar on the left displays icons
              that let you navigate through the different pages in Confluence. You can click the arrow on the bottom of
              the left navigation bar to expand the bar and show text next to the icons. For now, the navigation options
              are: My Confluence, Map View, Uploader (for some users), and Settings (for some users). Each of these
              options is described in the following sections of this help system.
            </p>
          </div>
        </TabPane>
        <TabPane tab="My Confluence" key="4">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              “My Confluence” (the House icon) is your personal Confluence homepage. It displays your user details at
              the top, along with a Profile Picture that can be changed by clicking the green pencil icon and selecting
              a file from your computer. You can click the “Edit Profile” button in the upper right to edit your
              profile. This lets you change your contact information, your Areas of Interest, and the default zoom area
              for the Confluence map.
            </p>
            <p>
              The bottom part of the My Confluence page shows “cards” for Problems and Projects that are in your Area of
              Interest, which will typically be either a municipality or the entire District, depending on your user
              type. Click the words “Problems” or “Projects” above the cards to switch between the two. You can also
              search for a specific Problem or Project in your Area of Interest using the search bar labeled “Search by
              Name,” and you can sort cards using the dropdown on the upper right that says “By Status.” Clicking on a
              Problem or Project card will bring up the Detail Page for that Problem or Project. Clicking outside of the
              Detail Page popup will bring you back to My Confluence.
            </p>
            <p>
              The right side of the My Confluence page is currently under construction and will be updated with new
              features as Confluence continues to be developed
            </p>
          </div>
        </TabPane>
        <TabPane tab="Map View" key="5">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              The Map View (the Folding Map icon) is the main data view in Confluence. While My Confluence is a page
              that shows data within the Area of Interest selected in your User Profile, the Map View allows you to
              access data throughout the entire District and also to see it on a map.
            </p>
            <p>
              At any time you can click the chevrons in the middle and expand the map to fill the entire screen. The map
              will zoom to the default zoom level you have set in your User Profile. You can temporarily change this
              zoom level any time by selecting from the dropdown at the top of the page, using your mousewheel, or the
              zoom buttons on the map.
            </p>
            <p>
              There is only one basemap in Confluence, and it transitions to aerial imagery as you zoom closer. You can
              search for features or addresses using the search bar in the upper left, and you can toggle data layers on
              and off using the green layer icon next to the search bar. Click on a feature on the map to view a popup
              of attributes for that feature.
            </p>
            <p>
              The layout of Problem and Project cards on the right side is the same as on the My Confluence page, and
              you can Search, Sort, and Filter data as well as switch between Problem and Project cards. The cards you
              see on the right side will always reflect what is in the current boundary of your map view, along with any
              filters or search results you have applied. Hovering over a feature on the map will highlight its
              associated card on the right, and vice-versa.
            </p>
            <p>
              Clicking on a card will bring up the Detail Page for that item. The Detail Page shows additional
              information about the item you have selected, including location, staff, status, and cost, as well as
              related Problems, Projects, and Components. The Detail Page is a “cut sheet” of feature information that
              you can export or share by clicking on the icons on the upper right of the page. Clicking the “X” in the
              upper right or just clicking outside of the popup window will close the Detail Page and bring you back to
              the Map View
            </p>
          </div>
        </TabPane>
        <TabPane tab="Uploader" key="6">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              The Document Uploader (Up Arrow icon) is only available to system administrators, and allows photos and
              other files to be uploaded and associated with features in the system.
            </p>
          </div>
        </TabPane>
        <TabPane tab="Settings" key="7">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              The Settings page (Gear icon) is only available to system administrators, and it is where pending user
              requests can be reviewed and approved and other administrative actions can be taken.
            </p>
          </div>
        </TabPane>
        <TabPane tab="Future Modules" key="8">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              There is a development roadmap for Confluence that will add a number of enhancements over time. These
              include:
            </p>
            <p>
              A “Project Request” module that will allow users to create their own Projects, associate them with
              Problems, and submit those Projects to MHFD for funding. This module will also allow local government and
              MHFD staff to view draft and approved Work Plans and to make changes to those Work Plans.
            </p>
            <p>
              A “Project Management” module that will allow local government and MHFD staff to view and update key
              project information during the life of a project including costs, permits, agreements, etc.
            </p>
            <p>
              A “Watershed Story” module that will bring together all the latest information about a watershed including
              Master Plan and Stream Assessment data along with Problems, Projects, Development Activity, Routine
              Maintenance, and more, all in one convenient location.
            </p>
          </div>
        </TabPane>
      </Tabs>
      <div>
        <Button
          className="btn-purple"
          onClick={() => {
            const auxKey = +key + 1;
            if (auxKey === 9) {
              setKey('1');
            } else {
              setKey('' + auxKey);
            }
          }}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
export default IntroducionModal;
