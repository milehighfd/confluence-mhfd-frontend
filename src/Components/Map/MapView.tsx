import * as React from "react";
import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";


export default () => {
  return <>
          <NavbarView></NavbarView>
          <SidebarView></SidebarView>
          <div> Map up</div>
        </>
}