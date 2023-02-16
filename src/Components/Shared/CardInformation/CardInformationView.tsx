import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Card, Popover, Menu, Button, MenuProps } from 'antd';
import DetailedModal from 'Components/Shared/Modals/DetailedModal';
import { numberWithCommas } from 'utils/utils';
import { Detailed } from 'store/types/detailedTypes';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import store from 'store';
import { COMPONENT_LAYERS, MENU_OPTIONS, MHFD_PROJECTS } from 'constants/constants';
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';
import DetailModal from 'routes/detail-page/components/DetailModal';

const content = (<div className="popoveer-00">Project Sponsor</div>);
const status = (<div className="popoveer-00">Status</div>);
const cost = (<div className="popoveer-00">Project Cost</div>);
const total = (<div className="popoveer-00">Number Project</div>);
const PROJECT_TABLE = 'mhfd_projects'

const CardInformationView = ({
  data,
  type,
  detailed,
  selectedOnMap,
  setZoomProjectOrProblem,
  deleteCallback,
  isProfile
}: {
  data: any,
  type: string,
  detailed: Detailed,
  selectedOnMap?: any,
  setZoomProjectOrProblem?: Function,
  deleteCallback?: Function,
  isProfile?: boolean
}) => {
  const [visible, setVisible] = useState(false);
  const [itHasComponents, setItHasComponents] = useState(false);
  const {
    getBBOXComponents,
    updateSelectedLayers,
    addFavorite,
    deleteFavorite,
    setHighlighted
  } = useMapDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  useEffect(() => {
    if(dropdownIsOpen){
      if (data.totalComponents === 0){
        setItHasComponents(false)
      } else{
        setItHasComponents(true)
      }
    }
  }, [dropdownIsOpen]);
  const showComponents = () => {
    console.log('data',data)
    const id = data.type === MENU_OPTIONS.PROBLEMS_BOUNDARY ? data.problemid : data.project_id;
    getBBOXComponents(data.type === MENU_OPTIONS.PROBLEMS_BOUNDARY ? MENU_OPTIONS.PROBLEMS_BOUNDARY : MHFD_PROJECTS, id);
  }
  const user = store.getState().profile.userInformation;
 
  const { bboxComponents, selectedLayers } = useSelector((state: any) => ({
    spinMapLoaded: state.map.spinMapLoaded,
    autcomplete: state.map.autocomplete,
    bboxComponents: state.map.bboxComponents,
    selectedLayers: state.map.selectedLayers
  }));
  const changeCenter = () => {
    const project_id = data?.project_id;
    if(setZoomProjectOrProblem){
    if (project_id) {      
      datasets.getData(SERVER.GET_BBOX_BY_PROJECT_ID(project_id)).then((coordinates: any) => {
        if( coordinates.length ) {
          setZoomProjectOrProblem(coordinates);
        }
      });
    } else {
      setZoomProjectOrProblem(data.coordinates);
    }}
    
  }

  const changeFavorite = () => {
    addFavorite(user.email, (data.id || data.problemid), data.type);
  }

  useEffect(() => {
    const bcbbox = bboxComponents.bbox;
    if (setZoomProjectOrProblem) {
      if (bcbbox.length && bcbbox[0] != null) {
        updateSelectedLayers([...selectedLayers, COMPONENT_LAYERS]);
        setZoomProjectOrProblem(bcbbox[0]);
      }
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
          if(itHasComponents){
            showComponents();
          }
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
        style: {cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)', background: 'rgba(61, 46, 138, 0.07)', margin:'0px'},
        label: <label style={{ cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)' }}>
          LIST ACTIONS
        </label>
      },
      {
        key: 'popup-show-components',
        label: <span className="menu-item-text" style={{ opacity: itHasComponents?1:0.5 }} >Show Actions</span>
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
    setHighlighted({type: type, value: value});
  }

  const deleteFunction = (email: string, id: number, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {
      if (deleteCallback) {
        deleteCallback(id);
      }
   });    
  }
  const xs: any = isProfile ? { span: 24 } : 24
  const lg: any = isProfile ? { span: 8 } : 12
  const md: any = isProfile ? null : 12
  const style : any = isProfile ? { width: '100%', display: 'inline-flex', alignSelf: 'stretch', paddingBottom: '15px', paddingLeft:'0px', paddingRight:'0px' } : {display: 'inline-flex', alignSelf: 'stretch', width: '100%', paddingLeft: '0px'}
  return (
    <>
      {/* {visible && <DetailedModal
        detailed={detailed}
        type={type}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />} */}
      {visible && <DetailModal
        visible={visible}
        setVisible={setVisible}
        data={data}
        type={type}
      />}
      
       <Col xs={xs} lg={lg} md={md} style={style}>
      <div className="border-line-green" style={{border: (selectedOnMap?.id === data.cartodb_id && selectedOnMap?.tab.includes(type.toLocaleLowerCase())) ? 'solid 4px #28c499' : '', width: '100%'}}>
        <Card
          // hoverable
          style={{ width: '100%', padding: '0px' }}
          onClick={() => setVisible(true)}
          onMouseEnter={(e) =>  {
          let typeInData:any 
          let valueInData:any  
          if(data.project_id){
              typeInData = 'mhfd_projects_dev';
              valueInData = data.project_id;
            }
            e.stopPropagation()
            return setValuesMap(typeInData, valueInData)}}
          onMouseLeave={(e)=> {setValuesMap('',''); e.stopPropagation()}}
          className="card-information"
          cover={
            <div>
              <div className="card-button-hover">
                {data.image ? <img className="" alt="example" src={data.image} /> : <img alt="example" src="/Icons/default.png" />}
                <div className="middle">
                  <Button>See Details</Button>
                </div>
             </div>

             {user?.designation?.toLocaleLowerCase() !== 'guest' ? <div className="like-btn">
               <Button onClick={(event) => {
                  event.stopPropagation();

                  data.isFavorite ?  deleteFunction(user.email, (data.project_id || data.problemid), (data.type || PROJECT_TABLE)) : addFavorite(user.email, (data.project_id || data.problemid), (data.type || PROJECT_TABLE));
                }
               }
                >
                 <div className={data.isFavorite ? "like-img-on" : "like-img"}></div>
                </Button>
             </div>: <></>}
           </div>
         }
        >

          {!isProfile && 
          <Popover overlayClassName="pop-card-map" content={menu} placement="bottomLeft" trigger="click" visible={dropdownIsOpen} onVisibleChange={()=>(setDropdownIsOpen(!dropdownIsOpen))}>
            <Button className="btn-card" onClick={(e: any) => e.stopPropagation()}><label>...</label></Button>
          </Popover>
        }
          <div className="card-title-s">
            <h4>{data.requestName}</h4>
          </div>
          {
            type === 'Problems' 
            ? 
            // <Popover placement="topLeft" content={content}>
              <h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6>
            // </Popover> 
            : 
            <h6>{data.sponsor ? data.sponsor : 'No Sponsor'}</h6>
          }
          {/* <Popover placement="topLeft" content={cost}> */}
            <h5>{
              data.estimatedCost ? ('$'+numberWithCommas(Math.round(data.estimatedCost))) : (data.componentCost?('$'+numberWithCommas(Math.round(data.componentCost))):'No Cost Data')  
              } 
              {/* <Popover content={total}> */}
                <span style={{ float: 'right' }}><b>{data.totalComponents ?? 0} Actions</b></span>
              {/* </Popover>  */}
            </h5>
          {/* </Popover> */}
          <hr />
          {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
              {data.priority === 'High' ? <p style={{ color: 'red', width: '88%', fontSize: '13px' }}>{data.priority} Priority</p> :
              data.priority === 'Low' ? <p style={{ color: '#28c499', width: '80%', fontSize: '13px' }}>{data.priority} Priority</p> :
              <p style={{ color: '#FFD300', width: '80%', fontSize: '13px' }}>{data.priority} Priority</p>
              }
              <span style={{ textAlign: 'right', width: '50%', fontSize: '13px' }}> {data.percentage}% Solved</span>
            </div>
          ) : (
              <div style={{ display: 'flex', width: '100%' }}>
                 <p style={{ color: ' #11093c', width: '80%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype}</p>
                  <span style={{ textAlign: 'right', width: '20%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
              </div>
            )}
        </Card>
      </div>
      </Col>
    </>
  );
};

export default CardInformationView;
