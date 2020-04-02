import React from "react";
import { Button } from "antd";

export default ({ buttons, setNameProject, setRedirect, nameProject, setRoute, setArrow, setCreate, setTitle }: any) => {
  return <> {buttons.buttonExtra ? (<div ><Button  onClick={() => {
    setArrow(true);
    setCreate(buttons.buttonExtra);
    setTitle(buttons.title);
  }}>
    <img className="img-h" src={buttons.icon1} alt="" />
    <img className="img-a" src={buttons.icon2} alt="" />
    <span>{buttons.title}</span></Button></div>)
    :
    (<div><Button onClick={() => {
      setNameProject(nameProject.trim());
      if (nameProject.trim().length > 0) {
        setRedirect(true);
        setRoute(buttons.redirectRoute)
      }
    }}>
      <img className="img-h" src={buttons.icon1} alt="" />
      <img className="img-a" src={buttons.icon2} alt="" />
      <span>{buttons.title}</span></Button></div>)} </>
}