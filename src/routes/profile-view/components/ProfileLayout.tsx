import React, { useEffect } from "react";
import { Layout } from 'antd';
import Navbar from '../../../Components/Shared/Navbar/NavbarContainer';
import SidebarView from '../../../Components/Shared/Sidebar/SidebarView';
import ProfileBody from './ProfileBody';

import { useMapDispatch } from '../../../hook/mapHook';
import { useProfileState } from '../../../hook/profileHook';
import { useAppUserDispatch } from '../../../hook/useAppUser';

const ProfileView = () => {
  const { userInformation: user } = useProfileState();
  const {
    getUserInformation
  } = useAppUserDispatch();
  const { favoriteCards } = useMapDispatch();
  useEffect(() => {
    favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc"});
  }, [user]);

  useEffect(() => {
    getUserInformation();
  }, []);

  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="map-00 profile-00">
          <ProfileBody />
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default ProfileView;
