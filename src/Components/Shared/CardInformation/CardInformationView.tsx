import React, { useEffect, useState } from "react";
import { Col, Card, Popover, Menu, Dropdown, Button, Icon } from "antd";
import { ComponentType } from "../../../Classes/MapTypes";
import DetailedModal from "../Modals/DetailedModal";

import { numberWithCommas } from '../../../utils/utils';
import { Detailed } from "../../../store/types/detailedTypes";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import { useProfileDispatch } from "../../../hook/profileHook";

import { useSelector } from "react-redux";


import bbox from "@turf/bbox";
import store from "../../../store";
import { COMPONENT_LAYERS } from "../../../constants/constants";
import { stat } from "fs";

const content = (<div className="popoveer-00">Project Sponsor</div>);
const status = (<div className="popoveer-00">Status</div>);
const cost = (<div className="popoveer-00">Project Cost</div>);
const total = (<div className="popoveer-00">Number Project</div>);


export default ({ data, type, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId, componentsOfProblems, loaderTableCompoents, selectedOnMap, componentCounter,
  getComponentCounter, setZoomProjectOrProblem }:
                { data: any, type: string, getDetailedPageProblem: Function, getDetailedPageProject: Function, detailed: Detailed, loaderDetailedPage: boolean,
                setHighlighted: Function, getComponentsByProblemId: Function, componentsOfProblems: any, loaderTableCompoents: boolean, selectedOnMap: any, componentCounter: number,
                getComponentCounter: Function, setZoomProjectOrProblem: Function }) => {
  const [visible, setVisible] = useState(false);
  const { getBBOXComponents, updateSelectedLayers, addFavorite, deleteFavorite, favoriteList } = useMapDispatch();
  const { favorites, favoriteProblemCards, favoriteProjectCards } = useMapState();
  const { saveUserInformation } = useProfileDispatch();
  const showComponents = () => {
    console.log(data);
    const id = data.type === 'problems' ? data.problemid : data.id;
    getBBOXComponents(data.type, id);
  }
  const user = store.getState().profile.userInformation;
  
  useEffect(() => {
    console.log(user.designation);
    favoriteList(user.email);
  }, 
  []);
  const isActive = (table: string, cartodb_id: number): boolean => {
    if (favorites) {
      for (const favorite of favorites) {
        if (favorite.table === table && favorite.cartodb_id === cartodb_id) {
          return true;
        }
      }
    }
    return false;
  }
  const [activeCard, setActiveCard] = useState(isActive(data.type, data.cartodb_id));
  useEffect(() => {
    const status = isActive(data.type, data.cartodb_id);
    setActiveCard(status);
  }, [favorites, deleteFavorite, addFavorite]);
  
  
  const { autcomplete, spinMapLoaded, bboxComponents, selectedLayers } = useSelector((state: any) => ({
    spinMapLoaded: state.map.spinMapLoaded,
    autcomplete: state.map.autocomplete,
    bboxComponents: state.map.bboxComponents,
    selectedLayers: state.map.selectedLayers
  }));
  const changeCenter = () => {
    console.log(data.coordinates);
    console.log(data.coordinates);
    setZoomProjectOrProblem(data.coordinates);

  }

  useEffect(() => {
    const bcbbox = bboxComponents.bbox;
    if (bcbbox.length && bcbbox[0] != null) {
      updateSelectedLayers([...selectedLayers, COMPONENT_LAYERS]);
      setZoomProjectOrProblem(bcbbox[0]);
      // saveUserInformation(user);
    }
  }, [bboxComponents]);
  const { setOpacityLayer } = useMapDispatch();
  const stopModal = (e: any) => {
    e.domEvent.stopPropagation();
    e.domEvent.nativeEvent.stopImmediatePropagation();
  }
  const menu = (
    <Menu>
      <Menu.Item className="drop-head" style={{cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)', background: 'rgba(61, 46, 138, 0.07)'}}  onClick={(e: any) => stopModal(e)}>
        LIST ACTIONS
      </Menu.Item>

      {data.totalComponents ? <Menu.Item onClick={(e: any) => {
         e.domEvent.stopPropagation();
         e.domEvent.nativeEvent.stopImmediatePropagation();
         showComponents();
      }}>
        <span className="menu-item-text">Show Components</span>
      </Menu.Item> : <></>
      }
      <Menu.Item onClick={(e: any) => {
         e.domEvent.stopPropagation();
         e.domEvent.nativeEvent.stopImmediatePropagation();
        changeCenter();
      }}>
        <span className="menu-item-text">Zoom to Feature</span>
      </Menu.Item>
      <Menu.Item onClick={(e: any) => stopModal(e)}>
        <span className="menu-item-text" style={{opacity: 0.5}}>Favorite Card</span>
      </Menu.Item>
      <Menu.Item onClick={(e: any) => stopModal(e)}>
        <span className="menu-item-text" style={{opacity: 0.5}}>Comment</span>
      </Menu.Item>
      <Menu.Item onClick={(e: any) => stopModal(e)}>
        <span className="menu-item-text" style={{opacity: 0.5}}>Add Team Member</span>
      </Menu.Item>
    </Menu>
  );

  const setValuesMap = (type: string, value: string) => {
    setHighlighted({type: type, value: value});
    // setOpacityLayer(false);
  }
  
  return (
    <>
      {visible && <DetailedModal
        detailed={detailed}
        getDetailedPageProblem={getDetailedPageProblem}
        getDetailedPageProject={getDetailedPageProject}
        loaderDetailedPage={loaderDetailedPage}
        getComponentsByProblemId={getComponentsByProblemId}
        type={type}
        data={data}
        visible={visible}
        setVisible={setVisible}
        componentsOfProblems={componentsOfProblems}
        loaderTableCompoents={loaderTableCompoents}
        componentCounter={componentCounter}
        getComponentCounter={getComponentCounter}
      />}

      <Col span={12}>
      <div className="border-line-green" style={{border: (selectedOnMap.id === data.cartodb_id && selectedOnMap.tab.includes(type.toLocaleLowerCase())) ? 'solid 4px #28c499' : ''}}>
        <Card
          hoverable
          style={{ width: '100%'}}
          onClick={() => setVisible(true)}
          onMouseEnter={() =>  setValuesMap(data.type, data.value)}
          onMouseLeave={()=> setValuesMap('','')}
          className="card-information"
          cover={
            <div>
              <div className="card-button-hover">
                {data.image ? <img className="" alt="example" src={data.image} /> : <img alt="example" src="/Icons/default.png" />}
                <div className="middle">
                  <Button>See Details</Button>
                </div>
             </div>
             {user.designation !== 'guest' ? <div className="like-btn">
               <Button onClick={(event) => {
                  event.stopPropagation();
                  activeCard ?  deleteFavorite(user.email, data.cartodb_id, data.type) : addFavorite(user.email, data.cartodb_id, data.type);
                  //favoriteList(user.email);
                }
               }
                >
                 <div className={activeCard ? "like-img-on" : "like-img"}></div>
                </Button>
             </div>: <></>}
           </div>
         }
        >

          <Popover overlayClassName="pop-card-map" content={menu} placement="bottomLeft" trigger="click">
            <Button className="btn-card" onClick={(e: any) => e.stopPropagation()}><label>...</label></Button>
          </Popover>
          <div className="card-title-s">
            <h4>{data.requestName}</h4>
          </div>
          {type === 'Problems' ? <Popover placement="topLeft" content={content}><h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6></Popover> : <h6>{data.sponsor ? data.sponsor : 'No Sponsor'}</h6>}
          <Popover placement="topLeft" content={cost}>
           <h5>${numberWithCommas(data.finalCost ? data.finalCost : data.estimatedCost)} <Popover content={total}><span style={{ float: 'right' }}><b>{data.totalComponents} Components</b></span></Popover> </h5>
          </Popover>
          <hr />
          {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
            <Popover placement="topLeft" content={type}>
              {data.priority === 'High' ? <p style={{ color: 'red', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p> :
              data.priority === 'Low' ? <p style={{ color: '#28c499', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p> :
              <p style={{ color: '#FFD300', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p>
              }
            </Popover>
            <Popover content={status}>
              <span style={{ textAlign: 'right', width: '42%', fontSize: '13px' }}>Solved {data.percentage}%</span>
            </Popover>
            </div>
          ) : (
              <div style={{ display: 'flex', width: '100%' }}>
               <Popover placement="topLeft" content={type}>
                 <p style={{ color: ' #11093c', width: '58%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype}</p>
               </Popover>
               <Popover content={status}>
                  <span style={{ textAlign: 'right', width: '42%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
                </Popover>
              </div>
            )}
        </Card>
      </div>
      </Col>
    </>
  );
}
