import React, { useState, useEffect } from 'react';
import { Input, Row, Dropdown, Button, Menu, MenuProps } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
// import CardsView from "./CardsView";
import { SORTED_PROBLEMS, SORTED_PROJECTS } from '../../../constants/constants';
import store from '../../../store';
import { useMapDispatch } from '../../../hook/mapHook';
import { useDetailedState } from '../../../hook/detailedHook';
import CardsView from 'routes/profile-view/components/CardsView';
import CardsViewProfile from './CardViewProfile';
import CardInformationView from 'Components/Shared/CardInformation/CardInformationView';
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';

const { Search } = Input;

const CardsList = ({
  type,
  getCount,
}: {
  type: string,
  getCount: Function,
}) => {
  const { detailed } = useDetailedState();
  const [data, setData] = useState<Array<Object>>([]);

  const updateFavoritesAndCount = (id: number) => {
    if (type === 'Projects') {
      getCount();
      setData((data: Array<Object>) => {
        return data.filter((d: any) => d.project_id !== id)
      })
    }
  }

  const getProjectCards = () =>{
    if (type === 'Projects') {
      datasets.getData(SERVER.FAVORITE_PROJECTS, datasets.getToken()).then(result => {
        setData(result.map((project: any) => {
          const projectType = project?.project_status?.code_phase_type?.code_project_type?.project_type_name;
          const x = {
            cartodb_id: project.project_id,
            project_id: project.project_id,
            // TODO: MISSING IMAGES
            // FEMA Grant Management
            // Letter of Map Change
            // FHAD to PMR (PMR)
            // Development Improvement Project (DIP)
            // General Maintenance
            // Permitting
            // Maintenance Eligibiity Project (MEP)
            // Research and Development (RD)
            image: (
              projectType === 'Capital (CIP)' ? '/projectImages/capital.png' :
                projectType === 'Planning Study (Study)' ? '/projectImages/study.png' :
                  projectType === 'Special' ? '/projectImages/special.png' :
                    projectType === 'Vegetation Management' ? '/projectImages/vegetation-management.png' :
                      projectType === 'Sediment Removal' ? '/projectImages/sediment-removal.png' :
                        projectType === 'Maintenance Restoration' ? '/projectImages/restoration.png' :
                          projectType === 'Minor Repairs' ? '/projectImages/minor-repairs.png' :
                            projectType === 'Routine Trash and Debris' ? '/projectImages/debris-management.png' : '/projectImages/watershed-change.png'
            ),
            requestName: project.project_name,
            sponsor: project.sponsor,
            estimatedCost: project.estimatedcost ? project.estimatedcost : project.finalcost,
            componentCost: project.component_cost ? project.component_cost : 0,
            status: project?.project_status?.code_phase_type?.code_status_type?.status_name,
            projecttype: projectType,
            objectid: project.objectid,
            type: project.type,
            value: project.cartodb_id,
            id: project.projectId,
            totalComponents: project.totalComponents,
            isFavorite: true
            // coordinates: project.coordinates[0]
          }
          return x;
        }));
      });
    } else {
      console.log("NADA")
    }

  }
  useEffect(() => {
    getProjectCards();
  }, []);

  const {
    favoriteCards: search,
  } = useMapDispatch();
  let totalElement = data.length;
  const size = 8;
  let sw = false;
  if (totalElement) {
    sw = true;
  }
  const valueDropdown = type === 'Problems' ? SORTED_PROBLEMS : SORTED_PROJECTS;
  const user = store.getState().profile.userInformation;
  const [options, setOptions] = useState({ keyword: "", column: type === 'Problems' ? 'problemname' : 'projectname', order: "asc"});

  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });

  const { deleteFavorite } = useMapDispatch();
  useEffect(() => {
    const auxState = { ...state };
    auxState.hasMore = true;
    setState(auxState);
  }, [totalElement])


  
  const fetchMoreData = () => {
    if (state.items.length >= totalElement - size) {
      const auxState = { ...state };
      if (state.items.length !== data.length) {
        auxState.items = state.items.concat(Array.from({ length: totalElement - state.items.length }));
      }
      auxState.hasMore = false;
      setState(auxState);
      return;
    }
    setTimeout(() => {
      const auxState = { ...state };
      auxState.items = state.items.concat(Array.from({ length: size }));
      setState(auxState);
    }, 500);
  };
  return(
    <Row style={{ background: '#fff', marginTop: '-4px', marginRight: '-2px', marginLeft: '-20px' }} className="card-map profile-mobile" gutter={[16, 16]}>
      {/* <div style={{ width: '100%', marginBottom: '-38px' }}></div> */}
      <div style={{ width: '100%', marginBottom: '-38px' }}>
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData}
          hasMore={state.hasMore}
          height={window.innerHeight - 245}
          className="scroll-infinite-mobile"
          endMessage={''}
          loader={undefined}>
          {sw ? state.items.map((i, index: number) => {
            return data[index] && <CardInformationView
              key={index}
              data={data[index]}
              detailed={detailed}
              type={type}
              deleteCallback={updateFavoritesAndCount}
            />
          }) : ''}
        </InfiniteScroll>
      </div>
    </Row>
  )
};

export default CardsList;

