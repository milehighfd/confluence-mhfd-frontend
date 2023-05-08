import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Menu, MenuProps, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { SERVER } from 'Config/Server.config';
import { COMPONENT_LAYERS, MENU_OPTIONS, MHFD_PROJECTS } from 'constants/constants';
import { useMapDispatch } from 'hook/mapHook';
import DetailModal from 'routes/detail-page/components/DetailModal';
import { getTotalEstimatedCost } from 'utils/parsers';
import * as datasets from 'Config/datasets';
import { useProfileState } from 'hook/profileHook';

const CardInformationView = ({
  data,
  type,
  selectedOnMap,
  setZoomProjectOrProblem,
  deleteCallback,
  isProfile
}: {
  data: any,
  type: string,
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
  const { userInformation: user } = useProfileState();
 
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
    
    data.isFavorite ?  deleteFunction(user.email, (data.project_id || data.problemid), type) : addFavorite(user.email, (data.project_id || data.problemid), type === 'Problems' );
  }

  useEffect(() => {
    const bcbbox = bboxComponents.bbox;
    if (setZoomProjectOrProblem) {
      if (bcbbox?.length && bcbbox[0] != null) {
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
        label: <span className="menu-item-text" /* style={{ cursor: 'auto', opacity: 0.5 }} */>{data.isFavorite ? 'Unfavorite Card':'Favorite Card'}</span>
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

  const deleteFunction = (email: string, id: number, type: string) => {
    const suffix = type === 'Problems' ? '?isProblem=1' : '';
    datasets.deleteDataWithBody(`${SERVER.DELETE_FAVORITE}${suffix}`, { email: email, id: id }, datasets.getToken()).then(favorite => {
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
      {visible && <DetailModal
        visible={visible}
        setVisible={setVisible}
        data={data}
        type={type}
        deleteCallback={deleteCallback}
        addFavorite={addFavorite}
      />}
      
       <Col xs={xs} lg={lg} md={md} style={style}>
       <div className="border-line-green" style={{ width: '100%'}}>
        <Card
          style={{border: (selectedOnMap?.id === data.cartodb_id && selectedOnMap?.tab.toLocaleLowerCase().includes(type.toLocaleLowerCase())) ? 'solid 2px #28c499' : '', width: '100%', padding:'0px'}}
          onClick={() => setVisible(true)}
          onMouseEnter={(e) =>  {
            let typeInData:any 
            let valueInData:any  
            if(data.project_id){
              typeInData = MHFD_PROJECTS;
              valueInData = data.project_id;
            } else if(data.problemid){
              typeInData = data.type;
              valueInData = data.cartodb_id;
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

                  data.isFavorite ?  deleteFunction(user.email, (data.project_id || data.problemid), type) : addFavorite(user.email, (data.project_id || data.problemid), type === 'Problems' );
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
              <h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6>
            : 
            <h6>{data.sponsor ? data.sponsor : 'No Sponsor'}</h6>
          }
            <h5>{
              (getTotalEstimatedCost(data?.project_costs || []) != null ?(new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(getTotalEstimatedCost(data?.project_costs || [])) === '0' ? 'No Cost Data' : ('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(getTotalEstimatedCost(data?.project_costs || [])))): 'No Cost Data')
              } 
                <span style={{ float: 'right' }}><b>{data.totalComponents ?? 0} Actions</b></span>
            </h5>
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
                 <p style={{ color: ' #11093c', width: '70%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype}</p>
                  <span style={{ textAlign: 'right', width: '30%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
              </div>
            )}
        </Card>
      </div>
      </Col>
    </>
  );
};

export default CardInformationView;
