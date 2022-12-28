import React, { useEffect, useState } from "react";
import { Col, Card, Popover, Menu, Button, MenuProps } from "antd";
import DetailedModal from "../Modals/DetailedModal";

import { numberWithCommas } from '../../../utils/utils';
import { Detailed } from "../../../store/types/detailedTypes";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";

import { useSelector } from "react-redux";

import store from "../../../store";
import { COMPONENT_LAYERS, MENU_OPTIONS } from "../../../constants/constants";


const content = (<div className="popoveer-00">Project Sponsor</div>);
const status = (<div className="popoveer-00">Status</div>);
const cost = (<div className="popoveer-00">Project Cost</div>);
const total = (<div className="popoveer-00">Number Project</div>);


const CardInformationView = ({ data, type, detailed, setHighlighted, selectedOnMap, setZoomProjectOrProblem }:
                { data: any, type: string, getDetailedPageProblem: Function, getDetailedPageProject: Function, detailed: Detailed, loaderDetailedPage: boolean,
                setHighlighted: Function, getComponentsByProblemId: Function, componentsOfProblems: any, loaderTableCompoents: boolean, selectedOnMap: any, componentCounter: number,
                getComponentCounter: Function, setZoomProjectOrProblem: Function }) => {
  const [visible, setVisible] = useState(false);
  const { getBBOXComponents, updateSelectedLayers, addFavorite, deleteFavorite, favoriteList } = useMapDispatch();
  const { favorites } = useMapState();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const showComponents = () => {
    console.log('data in show components', data);
    const id = data.type === MENU_OPTIONS.PROBLEMS_BOUNDARY ? data.problemid : data.id;
    getBBOXComponents(data.type, id);
  }
  const user = store.getState().profile.userInformation;

  useEffect(() => {
    favoriteList(user.email);
  },
  []);
  const isActive = (table: string, id: number): boolean => {
    if (favorites) {
      for (const favorite of favorites) {
        if (favorite.table === table && favorite.id === id) {
          return true;
        }
      }
    }
    return false;
  }
  const [activeCard, setActiveCard] = useState(isActive(data.type, data.id));
  useEffect(() => {
    const status = isActive(data.type, data.problemid || data.id);
    setActiveCard(status);
  }, [favorites, deleteFavorite, addFavorite]);

  const { bboxComponents, selectedLayers } = useSelector((state: any) => ({
    spinMapLoaded: state.map.spinMapLoaded,
    autcomplete: state.map.autocomplete,
    bboxComponents: state.map.bboxComponents,
    selectedLayers: state.map.selectedLayers
  }));
  const changeCenter = () => {
    setZoomProjectOrProblem(data.coordinates);
  }

  const changeFavorite = () => {
    addFavorite(user.email, (data.id || data.problemid), data.type);
  }

  useEffect(() => {
    const bcbbox = bboxComponents.bbox;
    if (bcbbox.length && bcbbox[0] != null) {
      updateSelectedLayers([...selectedLayers, COMPONENT_LAYERS]);
      setZoomProjectOrProblem(bcbbox[0]);
    }
  }, [bboxComponents]);
  const stopModal = (e: any) => {
    e.domEvent.stopPropagation();
    e.domEvent.nativeEvent.stopImmediatePropagation();
  }

  const menu = () => {
    const onClickPopupCard = (e: any) => {
      stopModal(e);
      switch (e.key) {
        case 'popup-show-components':
          showComponents();
          break;
        case 'popup-zoom':
          changeCenter();
          return;
        case 'popup-favorite':
          changeFavorite();
          setDropdownIsOpen(false);
          return;
        default:
          break;
      }
    };
    let menuPopupItem: MenuProps['items'] = [
      {
        key: 'popup-title',
        style: {cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)', background: 'rgba(61, 46, 138, 0.07)'},
        label: <label style={{ cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)' }}>
          LIST ACTIONS
        </label>
      },
      {
        key: 'popup-show-components',
        label: <span className="menu-item-text" >Show Components</span>
      },
      {
        key: 'popup-zoom',
        label: <span className="menu-item-text">Zoom to Feature</span>
      },
      {
        key: 'popup-favorite',
        label: <span className="menu-item-text" /* style={{ cursor: 'auto', opacity: 0.5 }} */>Favorite Card</span>
      },
      {
        key: 'popup-comment',
        label: <span className="menu-item-text" style={{ cursor: 'auto', opacity: 0.5 }}>Comment</span>
      },
      {
        key: 'popup-add-team',
        label: <span className="menu-item-text" style={{ cursor: 'auto', opacity: 0.5 }}>Add Team Member</span>
      }
    ];
    // if (!data.totalComponents) {
    //   menuPopupItem.splice(1, 1);
    // }
    return <Menu
      className="menu-dropdown-map"
      style={{ backgroundColor: 'white', border: 0, paddingTop: '0px' }}
      items={menuPopupItem}
      onClick={onClickPopupCard}
    >
    </Menu>
  };

  const setValuesMap = (type: string, value: string) => {
    console.log('type ', type,  'value', value);
    setHighlighted({type: type, value: value});
  }
  return (
    <>
      {visible && <DetailedModal
        detailed={detailed}
        type={type}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />}

      <Col xs={24} lg={12} md={12} style={{display: 'inline-flex', alignSelf: 'stretch', width: '100%', paddingLeft: '0px'}}>
      <div className="border-line-green" style={{border: (selectedOnMap.id === data.cartodb_id && selectedOnMap.tab.includes(type.toLocaleLowerCase())) ? 'solid 4px #28c499' : '', width: '100%'}}>
        <Card
          // hoverable
          style={{ width: '100%', padding: '0px' }}
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

                  activeCard ?  deleteFavorite(user.email, (data.id || data.problemid), data.type) : addFavorite(user.email, (data.id || data.problemid), data.type);
                }
               }
                >
                 <div className={activeCard ? "like-img-on" : "like-img"}></div>
                </Button>
             </div>: <></>}
           </div>
         }
        >

          <Popover overlayClassName="pop-card-map" content={menu} placement="bottomLeft" trigger="click" visible={dropdownIsOpen} onVisibleChange={()=>(setDropdownIsOpen(!dropdownIsOpen))}>
            <Button className="btn-card" onClick={(e: any) => e.stopPropagation()}><label>...</label></Button>
          </Popover>
          <div className="card-title-s">
            <h4>{data.requestName}</h4>
          </div>
          {
            type === 'Problems' 
            ? 
            <Popover placement="topLeft" content={content}><h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6></Popover> 
            : 
            <h6>{data.sponsor ? data.sponsor : 'No Sponsor'}</h6>
          }
          {/* <Popover placement="topLeft" content={cost}> */}
            <h5>{
              data.estimatedCost ? ('$'+numberWithCommas(Math.round(data.estimatedCost))) : (data.componentCost?('$'+numberWithCommas(Math.round(data.componentCost))):'No Cost Data')  
              } 
              {/* <Popover content={total}> */}
                <span style={{ float: 'right' }}><b>{data.totalComponents ?? 0} Components</b></span>
              {/* </Popover>  */}
            </h5>
          {/* </Popover> */}
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
              <span style={{ textAlign: 'right', width: '42%', fontSize: '13px' }}> {data.percentage}% Solved</span>
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
};

export default CardInformationView;
