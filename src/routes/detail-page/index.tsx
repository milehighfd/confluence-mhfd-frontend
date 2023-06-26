import React, { useEffect, useState } from "react";
import { Button, Layout } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";

const DetailPage = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [actionOpen, setActionlOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);


  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden', zIndex:1}} className="map-00 profile-00">
          {}
          {}
          {}
          {}
          <Button className="btn-purple" onClick={()=>(setDetailOpen(true))}>detail-page</Button>
          <br />
          <Button className="btn-purple">photos</Button>
          <br />
          <Button className="btn-purple">Action Item</Button>
          <br />
          <Button className="btn-purple">Notes</Button>
          <br />
          <Button className="btn-purple">Team</Button>
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default DetailPage;